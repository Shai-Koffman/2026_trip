/* global React, OPTIONS, FAMILY, Tape, Stamp, Star, Heart */
const { useState, useEffect } = React;

const VOTE_KEY = 'koffman-votes-v1';
const EXPAND_KEY = 'koffman-expanded-v1';

function loadVotes() {
  try { return JSON.parse(localStorage.getItem(VOTE_KEY)) || {}; } catch (e) { return {}; }
}
function saveVotes(v) { localStorage.setItem(VOTE_KEY, JSON.stringify(v)); }

// Vote: votes[optionId][personId] = 'up' | 'down' | undefined
function VoteStrip({ optionId, votes, setVotes, accent }) {
  const optVotes = votes[optionId] || {};

  const handle = (personId, dir) => {
    const next = { ...votes };
    const cur = { ...(next[optionId] || {}) };
    if (cur[personId] === dir) {
      delete cur[personId];
    } else {
      cur[personId] = dir;
    }
    next[optionId] = cur;
    setVotes(next);
    saveVotes(next);
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.6)',
      padding: '14px 16px',
      border: '1.5px dashed var(--ink-faded)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div className="label" style={{ fontSize: 11 }}>
        <span>ההצבעות של המשפחה</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FAMILY.map(p => {
          const v = optVotes[p.id];
          return (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: p.color, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}>{p.emoji}</div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{p.name}</div>
              <button
                onClick={() => handle(p.id, 'up')}
                aria-label={`${p.name} אוהב`}
                style={{
                  width: 36, height: 36,
                  border: '1.5px solid var(--ink)',
                  background: v === 'up' ? '#3f6b3a' : 'white',
                  color: v === 'up' ? 'white' : 'var(--ink)',
                  cursor: 'pointer',
                  fontSize: 16,
                  borderRadius: '50%',
                  transition: 'all 0.15s',
                  transform: v === 'up' ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: v === 'up' ? '2px 2px 0 var(--ink)' : 'none',
                }}
              >👍</button>
              <button
                onClick={() => handle(p.id, 'down')}
                aria-label={`${p.name} פחות מתלהב`}
                style={{
                  width: 36, height: 36,
                  border: '1.5px solid var(--ink)',
                  background: v === 'down' ? '#c14050' : 'white',
                  color: v === 'down' ? 'white' : 'var(--ink)',
                  cursor: 'pointer',
                  fontSize: 16,
                  borderRadius: '50%',
                  transition: 'all 0.15s',
                  transform: v === 'down' ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: v === 'down' ? '2px 2px 0 var(--ink)' : 'none',
                }}
              >👎</button>
            </div>
          );
        })}
      </div>

      {/* Score bar */}
      <VoteScore optVotes={optVotes} accent={accent} />
    </div>
  );
}

function VoteScore({ optVotes, accent }) {
  const ups = Object.values(optVotes).filter(v => v === 'up').length;
  const downs = Object.values(optVotes).filter(v => v === 'down').length;
  const voted = ups + downs;
  const score = ups - downs;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingTop: 8,
      borderTop: '1px dashed var(--ink-faded)',
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: accent }} dir="ltr">
        {score > 0 ? '+' : ''}{score}
      
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-faded)' }}>
        {voted === 0 ? 'עוד לא הצביעו' : `${ups} בעד · ${downs} נגד`}
      </div>
    </div>
  );
}

// ============ OPTION CARD ============
function OptionCard({ option, idx, isExpanded, onToggle, votes, setVotes, rank }) {
  const rot = [-1.2, 0.8, -0.6, 1, -0.9][idx % 5];

  return (
    <div style={{
      position: 'relative',
      background: 'var(--cream)',
      boxShadow: isExpanded ? 'var(--shadow-lifted)' : 'var(--shadow-paper)',
      transform: isExpanded ? 'rotate(0deg)' : `rotate(${rot}deg)`,
      transition: 'transform 0.3s, box-shadow 0.3s',
      overflow: 'hidden',
    }}>
      <Tape
        color={['var(--tape)', 'var(--tape-blue)', 'var(--tape-pink)', 'var(--tape)', 'var(--tape-blue)'][idx]}
        rotate={[-6, 5, -4, 5, -5][idx]}
        width={130}
      />

      {/* Rank badge */}
      {rank && (
        <div style={{
          position: 'absolute',
          top: 16, right: 16,
          zIndex: 3,
          background: rank === 1 ? '#f4b940' : 'var(--cream)',
          border: '2px solid var(--ink)',
          borderRadius: '50%',
          width: 54, height: 54,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transform: 'rotate(-8deg)',
          boxShadow: '2px 2px 0 var(--ink)',
        }}>
          <div style={{ fontFamily: "'Assistant', sans-serif", fontWeight: 600, fontSize: 10, lineHeight: 1, letterSpacing: '0.05em' }}>מקום</div>
          <div className="display" style={{ fontSize: 22, lineHeight: 1, marginTop: 2 }} dir="ltr">#{rank}</div>
        </div>
      )}

      {/* Header button */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: 0,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          textAlign: 'inherit',
          color: 'inherit',
          fontFamily: 'inherit',
          display: 'block',
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(180px, 280px) 1fr',
          gap: 0,
          alignItems: 'stretch',
          minHeight: 180,
        }}>
          {/* Photo block */}
          <div style={{
            position: 'relative',
            background: `linear-gradient(155deg, ${option.color}, ${option.accent})`,
            minHeight: 180,
            overflow: 'hidden',
          }}>
            <img
              src={option.photo}
              alt={option.nameEn}
              loading="lazy"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.85,
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 12, left: 12,
              background: 'rgba(254,249,237,0.95)',
              padding: '4px 10px',
              fontFamily: "'Assistant', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              color: 'var(--ink)',
            }}>אופציה {idx + 1}</div>
          </div>

          {/* Text block */}
          <div style={{ padding: '26px 28px 22px', position: 'relative' }}>
            <div className="label" style={{ color: option.color }}>
              <span>{option.region}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{option.days}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{option.travel.mode === 'flight' ? '✈️' : '🚗'} {option.travel.duration}</span>
            </div>
            <h3 className="display" style={{ fontSize: 36, marginTop: 6, lineHeight: 1.05 }}>{option.name}</h3>
            <div className="en" style={{ fontSize: 16, color: 'var(--ink-faded)', marginTop: 4 }}>{option.nameEn}</div>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 12, marginBottom: 0 }}>
              {option.vibe}
            </p>

            <div style={{
              marginTop: 18,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: "'Caveat', cursive",
              fontSize: 22,
              color: option.color,
              fontWeight: 700,
            }}>
              {isExpanded ? '↑ לסגור' : '↓ לפתוח לפרטים'}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{
          borderTop: '2px dashed var(--ink-faded)',
          padding: '28px 28px 32px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: 30,
          animation: 'float-in 0.4s ease-out',
        }} className="expanded-grid">
          <div>
            <div className="label" style={{ marginBottom: 8 }}>הווייב</div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)', marginTop: 0 }}>
              {option.detail}
            </p>

            <div className="label" style={{ marginTop: 24, marginBottom: 14 }}>נקודות שיא</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {option.highlights.map((h, hi) => (
                <a key={hi}
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'white',
                    padding: '14px 16px',
                    border: `1.5px solid ${option.color}33`,
                    position: 'relative',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = option.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `3px 3px 0 ${option.color}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${option.color}33`;
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{h.icon}</div>
                  <div className="en" style={{ fontSize: 15, fontWeight: 600, fontStyle: 'normal' }}>
                    {h.title}
                    <span style={{ marginInlineStart: 6, fontSize: 11, opacity: 0.6 }}>↗</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{h.text}</div>
                </a>
              ))}
            </div>

            {option.food && option.food.length > 0 && (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 32, marginBottom: 14 }}>
                  <div className="label">מסעדות נחשבות</div>
                  <span className="handwritten" style={{ fontSize: 22, color: option.color }}>foodie picks 🍽️</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {option.food.map((r, ri) => (
                    <a key={ri}
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gap: 14,
                        alignItems: 'start',
                        padding: '14px 16px',
                        background: 'var(--cream)',
                        border: `1.5px solid ${option.color}33`,
                        borderInlineStart: `4px solid ${option.color}`,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = option.color;
                        e.currentTarget.style.borderInlineStartColor = option.color;
                        e.currentTarget.style.transform = 'translateX(-2px)';
                        e.currentTarget.style.boxShadow = `-3px 3px 0 ${option.color}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = `${option.color}33`;
                        e.currentTarget.style.borderInlineStartColor = option.color;
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        width: 36, height: 36,
                        background: option.color, color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 800, fontSize: 16,
                      }} dir="ltr">{ri + 1}</div>
                      <div>
                        <div className="en" style={{ fontSize: 16, fontWeight: 700, fontStyle: 'normal' }}>
                          {r.name}
                        </div>
                        <div style={{ fontSize: 12, color: option.color, fontWeight: 600, marginTop: 2 }}>{r.style}</div>
                        <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.45 }}>{r.note}</div>
                      </div>
                      <div style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        color: option.color,
                        opacity: 0.6,
                      }}>↗</div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Vote column */}
          <div>
            <VoteStrip optionId={option.id} votes={votes} setVotes={setVotes} accent={option.color} />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .expanded-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ============ VOTE SECTION ============
function VoteSection() {
  const [votes, setVotes] = useState(() => loadVotes());
  const [expanded, setExpanded] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(EXPAND_KEY)) || []); }
    catch (e) { return new Set(); }
  });
  const [sortBy, setSortBy] = useState('score'); // 'score' or 'order'

  const toggle = (id) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpanded(next);
    localStorage.setItem(EXPAND_KEY, JSON.stringify([...next]));
  };

  // Compute scores and ranks
  const scored = OPTIONS.map(o => {
    const v = votes[o.id] || {};
    const ups = Object.values(v).filter(x => x === 'up').length;
    const downs = Object.values(v).filter(x => x === 'down').length;
    return { ...o, score: ups - downs, total: ups + downs };
  });
  const sorted = sortBy === 'score'
    ? [...scored].sort((a, b) => b.score - a.score || b.total - a.total)
    : scored;

  // Rank map
  const ranks = {};
  [...scored].sort((a, b) => b.score - a.score || b.total - a.total).forEach((o, i) => {
    if (o.total > 0) ranks[o.id] = i + 1;
  });

  const totalVotesCast = scored.reduce((s, o) => s + o.total, 0);
  const leader = [...scored].sort((a, b) => b.score - a.score || b.total - a.total)[0];

  return (
    <section id="vote">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: 'var(--tomato)' }}>ההחלטה</div>
        <h2 className="display" style={{ fontSize: 52 }}>הגיחה הגדולה</h2>
      </div>
      <p style={{ fontSize: 18, color: 'var(--ink-soft)', maxWidth: 700, marginTop: 0 }}>
        חמש אופציות. שלוש-חמישה ימים. כולם מצביעים
        <span className="handwritten" style={{ fontSize: 26, color: 'var(--tomato)', marginInlineStart: 8, marginInlineEnd: 4 }}>👍 או 👎</span>
        וההצבעה נשמרת אוטומטית.
      </p>

      {/* Leaderboard strip */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        padding: '18px 20px',
        background: 'var(--ink)',
        color: 'var(--cream)',
        marginTop: 22,
        marginBottom: 36,
        position: 'relative',
        transform: 'rotate(-0.3deg)',
        boxShadow: 'var(--shadow-paper)',
      }}>
        <div>
          <div className="label" style={{ color: 'var(--tape)', fontSize: 12 }}>מוביל/ה כרגע</div>
          <div className="display" style={{ fontSize: 26, color: 'var(--cream)' }}>
            {leader && leader.total > 0 ? leader.name : '— עדיין אין —'}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 20 }} />
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          <div>
            <div className="label" style={{ color: 'var(--tape-blue)', fontSize: 12 }}>הצבעות</div>
            <div className="display" style={{ fontSize: 26, color: 'var(--cream)' }} dir="ltr">{totalVotesCast} / {FAMILY.length * OPTIONS.length}</div>
          </div>
          <div>
            <div className="label" style={{ color: 'var(--tape-pink)', fontSize: 12 }}>מיון</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              {[{ k: 'score', l: 'ציון' }, { k: 'order', l: 'סדר' }].map(s => (
                <button key={s.k} onClick={() => setSortBy(s.k)} style={{
                  padding: '4px 10px',
                  background: sortBy === s.k ? 'var(--tape)' : 'transparent',
                  color: sortBy === s.k ? 'var(--ink)' : 'var(--cream)',
                  border: '1px solid var(--cream)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 13,
                }}>{s.l}</button>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('למחוק את כל ההצבעות?')) {
                setVotes({});
                saveVotes({});
              }
            }}
            style={{
              padding: '8px 14px',
              background: 'transparent',
              color: 'var(--cream)',
              border: '1px dashed var(--cream)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 13,
              alignSelf: 'center',
            }}
          >לאפס</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {sorted.map((opt, i) => (
          <OptionCard
            key={opt.id}
            option={opt}
            idx={OPTIONS.findIndex(o => o.id === opt.id)}
            isExpanded={expanded.has(opt.id)}
            onToggle={() => toggle(opt.id)}
            votes={votes}
            setVotes={setVotes}
            rank={ranks[opt.id]}
          />
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { VoteSection, OptionCard });
