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
  const inIt = !!(_votes[optionId] && _votes[optionId][personId]);
  if (_mode === 'firebase' && _db) {
    const ref = _db.ref('votes/' + optionId + '/' + personId);
    if (inIt) ref.remove(); else ref.set(true);
    // The 'value' subscription updates _votes and re-renders everyone.
    return;
  }
  const next = { ..._votes };
  const cur = { ...(next[optionId] || {}) };
  if (cur[personId]) delete cur[personId];
  else cur[personId] = true;
  if (Object.keys(cur).length) next[optionId] = cur;
  else delete next[optionId];
  _votes = next;
  _saveLocal();
  _emit();
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

// ============ WHO'S IN — compact avatar row ============
function WhoIsIn({ optionId, color }) {
  const votes = useVotes();
  const optVotes = votes[optionId] || {};
  const n = Object.keys(optVotes).length;

  return (
    <div style={{
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px dashed var(--ink-faded)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        <span className="label" style={{ fontSize: 11 }}>מי בעניין?</span>
        <span style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 16,
          color: n > 0 ? color : 'var(--ink-faded)',
        }} dir="ltr">{n > 0 ? `${n} 👍` : '—'}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {VOTERS.map(p => {
          const inIt = !!optVotes[p.id];
          return (
            <button
              key={p.id}
              onClick={() => toggleVote(optionId, p.id)}
              title={p.name}
              aria-label={`${p.name}${inIt ? ' — בעניין' : ''}`}
              aria-pressed={inIt}
              style={{
                width: 30, height: 30, borderRadius: '50%',
                border: inIt ? `2px solid var(--ink)` : '1.5px dashed var(--ink-faded)',
                background: inIt ? p.color : 'transparent',
                color: inIt ? 'white' : 'var(--ink-faded)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, cursor: 'pointer', padding: 0,
                overflow: 'hidden',
                opacity: inIt ? 1 : 0.55,
                transform: inIt ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.15s',
                boxShadow: inIt ? '1px 1px 0 var(--ink)' : 'none',
              }}
            >
              {p.image ? (
                <img src={p.image} alt={p.nameEn} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              ) : p.emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { useVotes, toggleVote, resetVotes, countIn, voteMode, WhoIsIn });
