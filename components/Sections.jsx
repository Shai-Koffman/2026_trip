/* global React, L, LEGS, PLACES, RESTAURANTS, VOTERS, ALPERT_FAMILIES, Tape, Stamp, WhoIsIn, useVotes, countIn, voteMode, setMe, useMe */
const { useState } = React;

// ============ EXTENDED FAMILY (ALPERTS) ============
function ExtendedFamilySection() {
  return (
    <section id="alperts">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: 'var(--ocean)' }}>החבורה המורחבת</div>
        <h2 className="display" style={{ fontSize: 40 }}>משפחת אלפרט</h2>
        <span className="handwritten" style={{ fontSize: 24, color: 'var(--tomato)' }}>משני הצדדים של אמריקה</span>
      </div>
      <p style={{ maxWidth: 760, color: 'var(--ink-soft)', marginBottom: 24, lineHeight: 1.55, fontSize: 15 }}>
        יעיר ועינת מארחים אותנו בניו ג׳רזי · בועז וליבי מארחים באטלנטה עד סוף הטיול. <span style={{ fontWeight: 600 }}>זאת הסיבה שבאנו</span>.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {ALPERT_FAMILIES.map((fam) => (
          <div key={fam.id} style={{
            position: 'relative',
            padding: '18px 22px 22px',
            background: 'var(--cream)',
            boxShadow: 'var(--shadow-paper)',
            borderInlineStart: `5px solid ${fam.color}`,
          }}>
            <Tape color={fam.tape} rotate={fam.tapeRotate} width={90} />

            <div style={{ marginBottom: 14 }}>
              <div className="label" style={{ color: fam.color, fontSize: 11, marginBottom: 2 }}>{fam.location}</div>
              <h3 className="display" style={{ fontSize: 22, lineHeight: 1.15 }}>{fam.label}</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '6px 0 0', lineHeight: 1.5 }}>{fam.note}</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {fam.members.map(m => (
                <div key={m.name} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  width: 60,
                }}>
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: '50%',
                    background: m.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                    color: 'white',
                    position: 'relative',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.22)',
                  }}>
                    <span>{m.emoji}</span>
                    {m.age != null && (
                      <div style={{
                        position: 'absolute',
                        bottom: -4, insetInlineEnd: -4,
                        background: 'var(--cream)',
                        color: 'var(--ink)',
                        width: 22, height: 22,
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700,
                        border: '1.5px solid var(--ink)',
                      }}>{m.age}</div>
                    )}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8, textAlign: 'center', lineHeight: 1.1 }}>{m.name}</div>
                  <div className="en" style={{ fontSize: 10, color: 'var(--ink-faded)', lineHeight: 1.1, fontStyle: 'normal' }}>{m.nameEn}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ HOW VOTING WORKS (one-time band) ============
function HowVoting() {
  const shared = (typeof voteMode === 'function') && voteMode() === 'firebase';
  return (
    <div style={{
      position: 'relative',
      margin: '0 0 8px',
      padding: '16px 20px',
      background: 'linear-gradient(155deg, #fff8ec 0%, #fdeee0 100%)',
      border: '2px solid var(--ink)',
      boxShadow: '4px 4px 0 var(--ink)',
      transform: 'rotate(-0.3deg)',
      display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
    }}>
      <Tape color="var(--tape-blue)" rotate={-5} width={110} />
      <span style={{ fontSize: 30, lineHeight: 1 }}>👍</span>
      <div style={{ flex: 1, minWidth: 240 }}>
        <div className="display" style={{ fontSize: 20, lineHeight: 1.15 }}>ככה בוחרים יחד</div>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '4px 0 0', lineHeight: 1.5 }}>
          כל יום הוא <strong>תפריט</strong> של אטרקציות, ולכל אחת יש <strong>משך זמן משוער</strong> (🕒 כמה זמן זה לוקח) — אז אפשר לשלב כמה ביום אחד, לא רק לבחור אחת. קודם בוחרים מי אתם (למטה ⬇️), ואז פותחים יום ולכל אופציה לוחצים <strong>"אני בעניין"</strong> — וזהו. האופציה עם הכי הרבה מצביעים מקבלת תג <strong>מוביל/ה</strong>. בימים עם תג <strong>🔀 אפשר להתפצל</strong> תת-קבוצות יכולות לעשות דברים שונים לפי גיל ורצון, ולהיפגש אחר כך.
        </p>
        <div style={{
          marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12.5, fontWeight: 600,
          color: shared ? 'var(--forest)' : 'var(--ink-faded)',
        }}>
          <span>{shared ? '🟢' : '📱'}</span>
          {shared
            ? 'הצבעות משותפות — מסונכרן בין כל המכשירים בזמן אמת.'
            : 'ההצבעות נשמרות במכשיר הזה בלבד — כדי לראות את ההצבעות של כולם, הצביעו יחד על מסך אחד.'}
        </div>
      </div>
    </div>
  );
}

// ============ IDENTITY PICKER ("who am I") ============
function IdentityPicker() {
  const me = useMe();
  const meVoter = VOTERS.find(v => v.id === me);
  const groups = Array.from(new Set(VOTERS.map(v => v.group)));
  return (
    <section id="identity" style={{ paddingTop: 18, paddingBottom: 0, scrollMarginTop: 16 }}>
      <div style={{
        position: 'relative', padding: '18px 22px 20px',
        background: 'var(--cream)', boxShadow: 'var(--shadow-paper)',
        border: '2px solid var(--ink)',
      }}>
        <Tape color="var(--tape-pink)" rotate={-4} width={120} />
        <div className="label" style={{ marginBottom: 2 }}>צעד 1 · מי אתם?</div>
        <h3 className="display" style={{ fontSize: 24, lineHeight: 1.1 }}>בחרו את עצמכם</h3>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '6px 0 14px', lineHeight: 1.5 }}>
          לוחצים פעם אחת על הפרצוף שלכם — ואז בכל יום פשוט מסמנים <strong>"אני בעניין"</strong>, וההצבעה נשמרת על שמכם.
        </p>
        {groups.map(g => (
          <div key={g} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faded)', letterSpacing: '0.06em', marginBottom: 6 }}>
              {g.startsWith('אלפרט') ? g : `משפחת ${g}`}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {VOTERS.filter(v => v.group === g).map(p => {
                const sel = p.id === me;
                return (
                  <button key={p.id} onClick={() => setMe(sel ? null : p.id)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '5px 13px 5px 6px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
                    border: sel ? '2px solid var(--ink)' : '1.5px solid var(--ink-faded)',
                    background: sel ? p.color : 'white',
                    color: sel ? 'white' : 'var(--ink)',
                    fontSize: 14, fontWeight: 600,
                    boxShadow: sel ? '2px 2px 0 var(--ink)' : 'none',
                    transition: 'all 0.15s',
                  }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: sel ? 'rgba(255,255,255,0.25)' : p.color, color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, overflow: 'hidden',
                    }}>
                      {p.image ? <img src={p.image} alt={p.nameEn} style={{ width: '78%', height: '78%', objectFit: 'contain' }} /> : p.emoji}
                    </span>
                    {p.name}{sel ? ' ✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {meVoter ? (
          <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600 }}>
            אתם מצביעים בתור <span style={{ color: meVoter.color }}>{meVoter.name}</span> — אפשר להחליף בכל רגע.
          </div>
        ) : (
          <div style={{ marginTop: 8, fontSize: 14, color: 'var(--tomato)', fontWeight: 600 }}>
            עדיין לא בחרתם — בחרו את עצמכם כדי שתוכלו להצביע 👆
          </div>
        )}
      </div>
    </section>
  );
}

// ============ OPTION ROW (with who's-in voting) ============
function OptionRow({ option, color, isLeader }) {
  const meta = (typeof PLACES !== 'undefined' && PLACES[option.id]) || {};
  const mapsUrl = meta.q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(meta.q)}` : null;
  const website = option.link;
  const rating = meta.r;

  const linkStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    fontSize: 12.5, fontWeight: 600, color,
    textDecoration: 'none', borderBottom: `1px solid ${color}55`,
  };

  return (
    <div style={{
      position: 'relative',
      padding: '14px 16px',
      background: 'white',
      borderTop: `1.5px solid ${isLeader ? color : color + '33'}`,
      borderBottom: `1.5px solid ${isLeader ? color : color + '33'}`,
      borderInlineEnd: `1.5px solid ${isLeader ? color : color + '33'}`,
      borderInlineStart: `4px solid ${color}`,
      boxShadow: isLeader ? `-3px 3px 0 ${color}` : 'none',
      transition: 'box-shadow 0.2s, border-color 0.2s',
    }}>
      {isLeader && (
        <div style={{
          position: 'absolute', top: -11, insetInlineEnd: 12,
          background: '#f4b940', color: 'var(--ink)',
          border: '1.5px solid var(--ink)',
          padding: '1px 10px', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.04em', transform: 'rotate(-2deg)',
          boxShadow: '1px 1px 0 var(--ink)',
        }}>★ מוביל/ה</div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {option.icon && (
          <div style={{
            width: 44, height: 44, flexShrink: 0,
            background: color, color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>{option.icon}</div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {option.duration && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: color, color: 'white',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.02em',
              padding: '2px 9px', borderRadius: 999, marginBottom: 6,
            }}>
              <span style={{ fontSize: 11 }}>🕒</span>{option.duration}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.25 }}>{option.title}</span>
            {option.tag && (
              <span style={{
                fontSize: 11, fontWeight: 700, color,
                background: `${color}1a`, border: `1px solid ${color}55`,
                padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap',
              }}>{option.tag}</span>
            )}
            {rating != null && (
              <span dir="ltr" style={{
                fontSize: 12, fontWeight: 700, color: '#7a5d00',
                background: '#f4b94022', border: '1px solid #f4b94099',
                padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap',
              }}>⭐ {rating}</span>
            )}
          </div>
          {option.en && (
            <div className="en" style={{ fontSize: 13, color: 'var(--ink-faded)', marginTop: 2, fontStyle: 'normal' }}>
              {option.en}
            </div>
          )}
          {option.note && (
            <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>{option.note}</div>
          )}
          {(mapsUrl || website) && (
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
              {mapsUrl && (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>🗺️ Google Maps ↗</a>
              )}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" style={linkStyle}>🌐 אתר רשמי ↗</a>
              )}
            </div>
          )}
        </div>
      </div>

      <WhoIsIn optionId={option.id} color={color} />
    </div>
  );
}

// ============ LEG MAP (Leaflet — all places + restaurants of a leg on one map) ============
const FOOD_COLOR = '#e67e22';
function LegMap({ leg }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (typeof L === 'undefined' || !ref.current || typeof PLACES === 'undefined') return;
    const pts = [];
    leg.days.forEach(d => d.options.forEach(o => {
      const m = PLACES[o.id];
      if (m && m.lat != null && m.lng != null) {
        pts.push({ title: `${o.icon || ''} ${o.title}`, q: m.q, r: m.r, lat: m.lat, lng: m.lng, color: leg.color });
      }
    }));
    const food = (typeof RESTAURANTS !== 'undefined' && RESTAURANTS[leg.id]) || [];
    food.forEach(r => {
      if (r.lat != null && r.lng != null) {
        pts.push({ title: `🍽️ ${r.name}`, q: r.q, r: r.r, lat: r.lat, lng: r.lng, color: FOOD_COLOR });
      }
    });
    if (!pts.length) return;

    const map = L.map(ref.current, { scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap', maxZoom: 19,
    }).addTo(map);

    const latlngs = [];
    pts.forEach(p => {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.q)}`;
      const popup = `<div style="min-width:150px;font-family:Assistant,sans-serif;direction:rtl">
        <strong style="font-size:14px">${p.title}</strong>
        ${p.r != null ? `<div style="margin-top:2px">⭐ ${p.r}</div>` : ''}
        <a href="${mapsUrl}" target="_blank" rel="noopener" style="display:inline-block;margin-top:6px;color:${p.color};font-weight:600">Google Maps ↗</a>
      </div>`;
      L.circleMarker([p.lat, p.lng], {
        radius: 8, color: '#ffffff', weight: 2, fillColor: p.color, fillOpacity: 0.95,
      }).addTo(map).bindPopup(popup);
      latlngs.push([p.lat, p.lng]);
    });
    map.fitBounds(latlngs, { padding: [34, 34] });
    if (latlngs.length === 1) map.setZoom(13);

    return () => map.remove();
  }, []);

  const dot = (c) => ({
    display: 'inline-block', width: 11, height: 11, borderRadius: '50%', background: c,
    border: '1.5px solid #fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.25)', marginInlineEnd: 5, verticalAlign: 'middle',
  });

  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8, flexWrap: 'wrap' }}>
        <div className="label">🗺️ כל המקומות של {leg.name} על המפה</div>
        <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}><span style={dot(leg.color)} />מקומות ביקור</span>
        <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}><span style={dot(FOOD_COLOR)} />מסעדות 4.6★+</span>
      </div>
      <div ref={ref} style={{
        height: 340, width: '100%',
        border: '2px solid var(--ink)', boxShadow: 'var(--shadow-paper)',
        background: '#dfe7ea',
      }} />
    </div>
  );
}

// ============ LEG RESTAURANTS ("where to eat" — 4.6★+ shortlist) ============
function LegRestaurants({ leg }) {
  const list = (typeof RESTAURANTS !== 'undefined' && RESTAURANTS[leg.id]) || [];
  if (!list.length) return null;
  return (
    <div style={{ marginTop: 46 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
        <h3 className="display" style={{ fontSize: 30 }}>איפה אוכלים</h3>
        <span className="handwritten" style={{ fontSize: 24, color: leg.color }}>מדורגות 4.6★ ומעלה 🍽️</span>
      </div>
      <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 0, marginBottom: 16, maxWidth: 720 }}>
        מבחר קצר של מסעדות מובחרות לקבוצה גדולה — רק דירוג גבוה. כדאי להזמין מקום מראש לקבוצה.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(258px, 1fr))', gap: 16 }}>
        {list.map((r, i) => {
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.q)}`;
          const linkStyle = {
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 12.5, fontWeight: 600, color: leg.color,
            textDecoration: 'none', borderBottom: `1px solid ${leg.color}55`,
          };
          return (
            <div key={i} style={{
              position: 'relative', background: 'white', padding: '14px 16px',
              borderTop: `4px solid ${leg.color}`,
              borderBottom: `1.5px solid ${leg.color}33`,
              borderInlineStart: `1.5px solid ${leg.color}33`,
              borderInlineEnd: `1.5px solid ${leg.color}33`,
              boxShadow: 'var(--shadow-paper)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span className="en" style={{ fontSize: 16, fontWeight: 700, fontStyle: 'normal' }}>{r.name}</span>
                <span dir="ltr" style={{
                  fontSize: 12, fontWeight: 700, color: '#7a5d00',
                  background: '#f4b94022', border: '1px solid #f4b94099',
                  padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap',
                }}>⭐ {r.r}</span>
              </div>
              <div style={{ fontSize: 12, color: leg.color, fontWeight: 600, marginTop: 2 }}>{r.cuisine}</div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.45 }}>{r.note}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>🗺️ Google Maps ↗</a>
                {r.link && <a href={r.link} target="_blank" rel="noopener noreferrer" style={linkStyle}>🌐 אתר ↗</a>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ DAY CARD (expandable) ============
function DayCard({ day, color, tapeColor, tapeRotate, rotation }) {
  const [open, setOpen] = useState(false);
  const votes = useVotes();

  // Leader = option(s) with the highest (>0) "in" count within this day.
  let max = 0;
  day.options.forEach(o => { const c = countIn(votes, o.id); if (c > max) max = c; });
  const leaders = new Set(max > 0 ? day.options.filter(o => countIn(votes, o.id) === max).map(o => o.id) : []);

  return (
    <div style={{
      position: 'relative',
      background: 'var(--cream)',
      boxShadow: open ? 'var(--shadow-lifted)' : 'var(--shadow-paper)',
      transform: open ? 'rotate(0deg)' : `rotate(${rotation}deg)`,
      transition: 'transform 0.3s, box-shadow 0.3s',
      overflow: 'visible',
    }}>
      <Tape color={tapeColor} rotate={tapeRotate} width={130} />

      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: 0, border: 'none', background: 'transparent',
          cursor: 'pointer', textAlign: 'inherit', color: 'inherit',
          fontFamily: 'inherit', display: 'block',
        }}
      >
        {/* Cover */}
        <div style={{
          width: '100%', aspectRatio: '16/7',
          background: `linear-gradient(155deg, ${color}, ${color}cc)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 100, lineHeight: 1, filter: 'drop-shadow(2px 4px 0 rgba(0,0,0,0.22))' }}>{day.icon}</div>
          <div style={{
            position: 'absolute', bottom: 12, insetInlineEnd: 12,
            background: 'rgba(255,255,255,0.95)', padding: '4px 10px',
            fontFamily: "'Assistant', sans-serif", fontWeight: 600, fontSize: 12, color: 'var(--ink)',
          }}>{day.dow} · {day.date}</div>
        </div>

        {/* Title block */}
        <div style={{ padding: '20px 24px 18px' }}>
          <h3 className="display" style={{ fontSize: 26, lineHeight: 1.1 }}>{day.title}</h3>
          {day.subtitle && (
            <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.45 }}>{day.subtitle}</div>
          )}
          {day.split && (
            <div style={{
              marginTop: 10,
              display: 'flex', alignItems: 'flex-start', gap: 7,
              padding: '7px 11px',
              background: `${color}12`,
              border: `1.5px dashed ${color}`,
              borderRadius: 4,
              fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.4,
            }}>
              <span style={{ fontSize: 15, lineHeight: 1.2 }}>🔀</span>
              <span><strong style={{ color }}>יום שאפשר להתפצל בו:</strong> {day.split.replace(/^אפשר להתפצל — ?/, '')}</span>
            </div>
          )}
          <div style={{
            marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: "'Caveat', cursive", fontSize: 22, color, fontWeight: 700,
          }}>
            {open ? '↑ לסגור' : `↓ ${day.options.length} אופציות · לתכנן את היום`}
          </div>
        </div>
      </button>

      {open && (
        <div style={{
          borderTop: '2px dashed var(--ink-faded)',
          padding: '20px 24px 26px',
          display: 'flex', flexDirection: 'column', gap: 14,
          animation: 'float-in 0.4s ease-out',
        }}>
          {day.options.map(o => (
            <OptionRow key={o.id} option={o} color={color} isLeader={leaders.has(o.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ============ LEG SECTION ============
const TAPES = ['var(--tape)', 'var(--tape-blue)', 'var(--tape-pink)'];
const TAPE_ROT = [-5, 4, -3, 5, -4, 3];
const ROTS = [-0.8, 0.7, -0.6, 0.8, -0.7, 0.6];

function LegSection({ leg, index }) {
  const labelBg = ['var(--ocean)', 'var(--tomato)', 'var(--forest)'][index] || 'var(--ink)';
  return (
    <section id={leg.id}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: labelBg }}>{leg.part}</div>
        <h2 className="display" style={{ fontSize: 46 }}>{leg.name}</h2>
        <span className="handwritten" style={{ fontSize: 26, color: leg.color }}>{leg.dates}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
        <div className="en" style={{ fontSize: 16, color: 'var(--ink-faded)', fontStyle: 'normal' }}>{leg.nameEn}</div>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: 0, fontWeight: 600 }}>{leg.hostLine}</p>
      </div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 14px', background: leg.color, color: 'white',
        fontSize: 14, fontWeight: 600, marginBottom: 30,
        transform: 'rotate(-0.5deg)', boxShadow: '3px 3px 0 var(--ink)',
      }}>{leg.travel}</div>

      <LegMap leg={leg} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 36 }}>
        {leg.days.map((day, i) => (
          <DayCard
            key={day.id}
            day={day}
            color={leg.color}
            tapeColor={TAPES[i % 3]}
            tapeRotate={TAPE_ROT[i % TAPE_ROT.length]}
            rotation={ROTS[i % ROTS.length]}
          />
        ))}
      </div>

      <LegRestaurants leg={leg} />
    </section>
  );
}

Object.assign(window, { ExtendedFamilySection, LegSection, HowVoting, IdentityPicker });
