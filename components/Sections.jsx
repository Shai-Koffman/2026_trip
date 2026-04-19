/* global React, NJ_DAYS, NYC_DAYS, ROAD_RULES, Tape, Star, Coaster, Palm, Stamp */

// ============ NJ SECTION ============
function NJSection() {
  return (
    <section id="nj">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: 'var(--ocean)' }}>חלק ראשון</div>
        <h2 className="display" style={{ fontSize: 48 }}>בסיס האם · ניו ג׳רזי</h2>
        <span className="handwritten" style={{ fontSize: 28, color: 'var(--tomato)' }}>אקשן + שופינג ללא מע"מ</span>
      </div>

      <p style={{ maxWidth: 700, color: 'var(--ink-soft)', marginBottom: 32 }}>
        מתארחים אצל המשפחה. מנצלים את הפארקים הגדולים באמצע השבוע (פחות תורים), ואת חוקי הפטור ממס על ביגוד.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 40 }}>
        {NJ_DAYS.map((day, idx) => (
          <div key={day.title} className="paper" style={{
            transform: `rotate(${idx === 0 ? -0.8 : 0.8}deg)`,
            padding: '28px 26px',
          }}>
            <Tape color={idx === 0 ? 'var(--tape-blue)' : 'var(--tape-pink)'} rotate={idx === 0 ? -4 : 5} />

            <div style={{ marginBottom: 18 }}>
              <div className="label" style={{ color: day.color }}>יום {idx + 1}</div>
              <h3 className="display" style={{ fontSize: 32, marginTop: 6 }}>{day.title}</h3>
              <div className="en" style={{ fontSize: 15, color: 'var(--ink-faded)', marginTop: 2 }}>{day.subtitle}</div>
            </div>

            <div style={{ borderInlineStart: `3px solid ${day.color}`, paddingInlineStart: 16 }}>
              {day.blocks.map((b, bi) => (
                <div key={bi} style={{ marginBottom: 18, position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    right: -22, top: 4,
                    width: 12, height: 12,
                    borderRadius: '50%',
                    background: day.color,
                    border: '2px solid var(--cream)',
                  }} />
                  <div className="label" style={{ color: day.color, fontSize: 11 }}>{b.time}</div>
                  <div style={{ fontWeight: 600, fontSize: 18, marginTop: 2 }}>{b.title}</div>
                  {b.en && <div className="en" style={{ fontSize: 13, color: 'var(--ink-faded)' }}>{b.en}</div>}
                  {b.note && <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>{b.note}</div>}
                </div>
              ))}
            </div>

            {idx === 0 && (
              <div style={{ position: 'absolute', bottom: -14, left: -10, transform: 'rotate(-8deg)' }}>
                <Stamp color="var(--forest)">TAX · FREE</Stamp>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ NYC SECTION ============
function NYCSection() {
  return (
    <section id="nyc">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: 'var(--tomato)' }}>חלק שני</div>
        <h2 className="display" style={{ fontSize: 48 }}>ימי השיא · ניו יורק</h2>
        <span className="handwritten" style={{ fontSize: 28, color: 'var(--ocean)' }}>Mega-Days · בלי סיורים מייגעים</span>
      </div>

      <p style={{ maxWidth: 700, color: 'var(--ink-soft)', marginBottom: 32 }}>
        ימים ממוקדים למתבגרים ולמבוגרים שרוצים חוויות טרנדיות, אינטראקטיביות ופוטוגניות.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {NYC_DAYS.map((day, idx) => {
          const rot = [-1.5, 0.8, -0.5][idx];
          return (
            <div key={day.theme} style={{
              position: 'relative',
              background: 'white',
              padding: '12px 12px 26px',
              boxShadow: 'var(--shadow-paper)',
              transform: `rotate(${rot}deg)`,
            }}>
              <Tape color={['var(--tape)', 'var(--tape-blue)', 'var(--tape-pink)'][idx]} rotate={[-5, 4, -3][idx]} />

              {/* Photo block - colored placeholder with landmark emoji */}
              <div style={{
                width: '100%',
                aspectRatio: '4/3',
                background: `linear-gradient(160deg, ${day.color}, ${day.color}dd)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  fontSize: 100,
                  filter: 'drop-shadow(2px 4px 0 rgba(0,0,0,0.2))',
                }}>
                  {['🔦', '🦋', '🌉'][idx]}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 10, right: 10,
                  background: 'rgba(255,255,255,0.95)',
                  padding: '4px 10px',
                  fontFamily: "'Assistant', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  color: 'var(--ink)',
                }}>ניו יורק · יום {idx + 1}</div>
              </div>

              <div style={{ padding: '18px 14px 0' }}>
                <h3 className="display" style={{ fontSize: 24 }}>{day.theme}</h3>
                <div style={{ marginTop: 14 }}>
                  {day.stops.map((stop, si) => (
                    <div key={si} style={{
                      display: 'flex',
                      gap: 10,
                      padding: '10px 0',
                      borderTop: si > 0 ? '1px dashed var(--ink-faded)' : 'none',
                      alignItems: 'flex-start',
                    }}>
                      <div style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: 24,
                        fontWeight: 700,
                        color: day.color,
                        lineHeight: 1,
                        minWidth: 24,
                      }} dir="ltr">{si + 1}.</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 16 }} className="en">{stop.title}</div>
                        <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 2 }}>{stop.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============ ROAD RULES ============
function RoadRules() {
  return (
    <section id="rules">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: 'var(--forest)' }}>חוקי זהב</div>
        <h2 className="display" style={{ fontSize: 48 }}>חוקי הדרך</h2>
        <span className="handwritten" style={{ fontSize: 28, color: 'var(--tomato)' }}>4 חוקי זהב לרוד-טריפ</span>
      </div>

      <p style={{ maxWidth: 700, color: 'var(--ink-soft)', marginBottom: 32 }}>
        כדי שהנסיעות הארוכות לגיחות המורחבות יהיו כיפיות ולא מעייפות.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {ROAD_RULES.map((rule, idx) => {
          const rot = [-1.5, 1, -0.8, 1.5][idx];
          const tapeC = ['var(--tape)', 'var(--tape-blue)', 'var(--tape-pink)', 'var(--tape)'][idx];
          return (
            <div key={rule.title} style={{
              background: 'var(--cream)',
              padding: '26px 22px',
              boxShadow: 'var(--shadow-paper)',
              transform: `rotate(${rot}deg)`,
              position: 'relative',
              border: '1px solid rgba(42,36,32,0.08)',
            }}>
              <Tape color={tapeC} rotate={[-6, 4, -3, 5][idx]} />
              <div style={{
                fontSize: 56,
                lineHeight: 1,
                marginBottom: 10,
                filter: 'drop-shadow(1px 2px 0 rgba(0,0,0,0.1))',
              }}>{rule.icon}</div>
              <div style={{
                position: 'absolute',
                top: 18, left: 18,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 48,
                color: 'var(--ink)',
                opacity: 0.12,
                lineHeight: 1,
              }} dir="ltr">0{idx + 1}</div>
              <h3 className="display" style={{ fontSize: 22, marginBottom: 8 }}>{rule.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>{rule.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

Object.assign(window, { NJSection, NYCSection, RoadRules });
