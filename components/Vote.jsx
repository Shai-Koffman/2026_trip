/* global React, VOTERS, firebase */
const { useState, useEffect } = React;

// ============ VOTE STORE ============
// Model: votes[optionId][personId] = true  (a person is "in" for that option)
// "Who's in" — positive only. Score = how many people want it.
//
// Two modes, chosen automatically at load:
//   • "firebase" — if window.FIREBASE_CONFIG is set: votes are SHARED & LIVE,
//     synced across everyone's devices via Realtime Database.
//   • "local"    — otherwise: votes are saved per-device in localStorage.
const VOTE_KEY = 'koffman-votes-v2';

let _votes = {};
let _mode = 'local';
let _db = null;
const _listeners = new Set();
function _emit() { _listeners.forEach(fn => fn()); }

function _loadLocal() {
  try { return JSON.parse(localStorage.getItem(VOTE_KEY)) || {}; } catch (e) { return {}; }
}
function _saveLocal() { try { localStorage.setItem(VOTE_KEY, JSON.stringify(_votes)); } catch (e) {} }

(function initVoteStore() {
  const cfg = window.FIREBASE_CONFIG;
  if (cfg && typeof firebase !== 'undefined') {
    try {
      firebase.initializeApp(cfg);
      _db = firebase.database();
      _mode = 'firebase';
      _db.ref('votes').on('value', snap => {
        _votes = snap.val() || {};
        _emit();
      });
      return;
    } catch (e) {
      console.warn('Firebase init failed — falling back to per-device voting.', e);
      _mode = 'local';
      _db = null;
    }
  }
  _votes = _loadLocal();
})();

function voteMode() { return _mode; }

function toggleVote(optionId, personId) {
  // Optimistic local update for instant feedback (both modes).
  const next = { ..._votes };
  const cur = { ...(next[optionId] || {}) };
  const wasIn = !!cur[personId];
  if (wasIn) delete cur[personId];
  else cur[personId] = true;
  if (Object.keys(cur).length) next[optionId] = cur;
  else delete next[optionId];
  _votes = next;
  _emit();

  if (_mode === 'firebase' && _db) {
    // Persist to the shared DB; the 'value' subscription reconciles everyone.
    const ref = _db.ref('votes/' + optionId + '/' + personId);
    if (wasIn) ref.remove(); else ref.set(true);
  } else {
    _saveLocal();
  }
}

function resetVotes() {
  if (_mode === 'firebase' && _db) {
    _db.ref('votes').remove();
    return;
  }
  _votes = {};
  _saveLocal();
  _emit();
}

// ============ IDENTITY ("who am I") — per device ============
const ME_KEY = 'koffman-me-v1';
let _me = null;
try { _me = localStorage.getItem(ME_KEY) || null; } catch (e) {}
const _meListeners = new Set();

function setMe(id) {
  _me = id || null;
  try { if (id) localStorage.setItem(ME_KEY, id); else localStorage.removeItem(ME_KEY); } catch (e) {}
  _meListeners.forEach(fn => fn());
}
function getMe() { return _me; }
function useMe() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force(x => x + 1);
    _meListeners.add(fn);
    return () => _meListeners.delete(fn);
  }, []);
  return _me;
}

// Subscribe to the shared vote store; re-renders the caller on any change.
function useVotes() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force(x => x + 1);
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  }, []);
  return _votes;
}

function countIn(votes, optionId) {
  return Object.keys(votes[optionId] || {}).length;
}

// ============ WHO'S IN — one button for "me" + a read-only tally ============
function WhoIsIn({ optionId, color }) {
  const votes = useVotes();
  const me = useMe();
  const optVotes = votes[optionId] || {};
  const voterIds = Object.keys(optVotes);
  const n = voterIds.length;
  const iAmIn = me ? !!optVotes[me] : false;

  return (
    <div style={{
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px dashed var(--ink-faded)',
      display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
    }}>
      {me ? (
        <button
          onClick={() => toggleVote(optionId, me)}
          aria-pressed={iAmIn}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
            border: `2px solid ${color}`,
            background: iAmIn ? color : 'white',
            color: iAmIn ? 'white' : color,
            boxShadow: iAmIn ? '2px 2px 0 var(--ink)' : 'none',
            transition: 'all 0.15s',
          }}
        >{iAmIn ? '✓ אני בעניין' : 'אני בעניין 👍'}</button>
      ) : (
        <button
          onClick={() => { const el = document.getElementById('identity'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
          style={{
            padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
            border: '1.5px dashed var(--ink-faded)', background: 'transparent',
            color: 'var(--ink-faded)',
          }}
        >👆 בחרו מי אתם כדי להצביע</button>
      )}

      <span style={{ fontSize: 13, fontWeight: 600, color: n > 0 ? 'var(--ink-soft)' : 'var(--ink-faded)' }}>
        {n > 0 ? `${n} בעניין` : 'עוד אף אחד'}
      </span>

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {voterIds.map(id => {
          const p = VOTERS.find(v => v.id === id);
          if (!p) return null;
          return (
            <div key={id} title={p.name} style={{
              width: 26, height: 26, borderRadius: '50%',
              background: p.color, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, overflow: 'hidden',
              border: id === me ? '2px solid var(--ink)' : '1px solid rgba(0,0,0,0.15)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}>
              {p.image ? <img src={p.image} alt={p.nameEn} style={{ width: '78%', height: '78%', objectFit: 'contain' }} /> : p.emoji}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { useVotes, toggleVote, resetVotes, countIn, voteMode, setMe, getMe, useMe, WhoIsIn });
