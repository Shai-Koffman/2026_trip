/* global React, NJ_DAYS, NYC_DAYS, ROAD_RULES, ALPERT_FAMILIES, Tape, Star, Coaster, Palm, Stamp */
const { useState } = React;

// ============ EXTENDED FAMILY (ALPERTS) ============
function ExtendedFamilySection() {
  return (
    <section id="alperts">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: 'var(--ocean)' }}>החבורה המורחבת</div>
        <h2 className="display" style={{ fontSize: 48 }}>משפחת אלפרט</h2>
        <span className="handwritten" style={{ fontSize: 28, color: 'var(--tomato)' }}>משני הצדדים של אמריקה</span>
      </div>
      <p style={{ maxWidth: 720, color: 'var(--ink-soft)', marginBottom: 32 }}>
        בסופו של דבר, בשביל זה אנחנו טסים. יאיר ועינת מארחים אותנו בניו ג׳רזי. בועז וליבי טסים מאטלנטה להצטרף אלינו בגיחה הגדולה — ועם הילדים שלהם, הקבוצה מגיעה ל-10 איש בטיפוסים מכל הגילאים.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {ALPERT_FAMILIES.map((fam) => (
          <div key={fam.id} style={{
            position: 'relative',
            padding: '28px 28px 30px',
            background: 'var(--cream)',
            boxShadow: 'var(--shadow-paper)',
            borderInlineStart: `6px solid ${fam.color}`,
          }}>
            <Tape color={fam.tape} rotate={fam.tapeRotate} width={130} />

            <div style={{ marginBottom: 22 }}>
              <div className="label" style={{ color: fam.color, fontSize: 12 }}>{fam.location}</div>
              <h3 className="display" style={{ fontSize: 30, marginTop: 4 }}>{fam.label}</h3>
              <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '8px 0 0', lineHeight: 1.55 }}>{fam.note}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
              {fam.members.map((m, i) => {
                const rot = [-2, 1.5, -1, 2, -1.5][i % 5];
                return (
                  <div key={m.name} style={{
                    background: 'white',
                    padding: '12px 12px 14px',
                    boxShadow: 'var(--shadow-paper)',
                    transform: `rotate(${rot}deg)`,
                    transition: 'transform 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = `rotate(${rot}deg)`}
                  >
                    <div style={{
                      width: '100%',
                      aspectRatio: '1',
                      background: m.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 58,
                      color: 'white',
                      position: 'relative',
                    }}>
                      <span style={{ filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.2))' }}>{m.emoji}</span>
                      {m.age != null && (
                        <div style={{
                          position: 'absolute',
                          bottom: 6, left: 6,
                          background: 'var(--cream)',
                          color: 'var(--ink)',
                          fontWeight: 600,
                          fontSize: 11,
                          padding: '2px 6px',
                        }}>גיל {m.age}</div>
                      )}
                    </div>
                    <div style={{ marginTop: 10, textAlign: 'center' }}>
                      <div className="display" style={{ fontSize: 22, lineHeight: 1 }}>{m.name}</div>
                      <div className="en" style={{ fontSize: 12, color: 'var(--ink-faded)', marginTop: 2 }}>{m.nameEn}</div>
                      {m.role && (
                        <div style={{ fontSize: 12, color: fam.color, fontWeight: 600, marginTop: 4 }}>{m.role}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============ Shared: a linked or plain stop row ============
function StopRow({ item, color }) {
  const content = (
    <>
      {item.icon && (
        <div style={{
          width: 44, height: 44,
          background: color,
          color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
          flexShrink: 0,
        }}>{item.icon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {item.time && (
          <div className="label" style={{ color, fontSize: 11, marginBottom: 2 }}>{item.time}</div>
        )}
        <div style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.25 }}>
          {item.title}
          {item.link && <span style={{ marginInlineStart: 6, fontSize: 13, opacity: 0.55 }}>↗</span>}
        </div>
        {item.en && (
          <div className="en" style={{ fontSize: 13, color: 'var(--ink-faded)', marginTop: 2, fontStyle: 'normal' }}>
            {item.en}
          </div>
        )}
        {item.note && (
          <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.5 }}>{item.note}</div>
        )}
      </div>
    </>
  );

  const baseStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
    padding: '14px 16px',
    background: 'white',
    border: `1.5px solid ${color}33`,
    borderInlineStart: `4px solid ${color}`,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.15s, border-color 0.15s, box-shadow 0.15s',
  };

  if (!item.link) {
    return <div style={baseStyle}>{content}</div>;
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      style={baseStyle}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.borderInlineStartColor = color;
        e.currentTarget.style.transform = 'translateX(-2px)';
        e.currentTarget.style.boxShadow = `-3px 3px 0 ${color}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${color}33`;
        e.currentTarget.style.borderInlineStartColor = color;
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {content}
    </a>
  );
}

// ============ Shared: expandable day card ============
function DayCard({
  cover, coverLabel, color, title, subtitle, extraStamp,
  isExpanded, onToggle, items, tapeColor, tapeRotate, rotation,
}) {
  return (
    <div style={{
      position: 'relative',
      background: 'var(--cream)',
      boxShadow: isExpanded ? 'var(--shadow-lifted)' : 'var(--shadow-paper)',
      transform: isExpanded ? 'rotate(0deg)' : `rotate(${rotation}deg)`,
      transition: 'transform 0.3s, box-shadow 0.3s',
      overflow: 'visible',
    }}>
      <Tape color={tapeColor} rotate={tapeRotate} width={130} />

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
        {/* Cover */}
        <div style={{
          width: '100%',
          aspectRatio: '16/7',
          background: `linear-gradient(155deg, ${color}, ${color}cc)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            fontSize: 110,
            lineHeight: 1,
            filter: 'drop-shadow(2px 4px 0 rgba(0,0,0,0.22))',
          }}>{cover}</div>
          {coverLabel && (
            <div style={{
              position: 'absolute',
              bottom: 12, right: 12,
              background: 'rgba(255,255,255,0.95)',
              padding: '4px 10px',
              fontFamily: "'Assistant', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              color: 'var(--ink)',
            }}>{coverLabel}</div>
          )}
        </div>

        {/* Title block */}
        <div style={{ padding: '22px 26px 20px' }}>
          <h3 className="display" style={{ fontSize: 28, lineHeight: 1.1 }}>{title}</h3>
          {subtitle && (
            <div className="en" style={{ fontSize: 15, color: 'var(--ink-faded)', marginTop: 4 }}>{subtitle}</div>
          )}
          <div style={{
            marginTop: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'Caveat', cursive",
            fontSize: 22,
            color,
            fontWeight: 700,
          }}>
            {isExpanded ? '↑ לסגור' : '↓ לפתוח לפרטים'}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{
          borderTop: '2px dashed var(--ink-faded)',
          padding: '22px 26px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          animation: 'float-in 0.4s ease-out',
        }}>
          {items.map((item, i) => (
            <StopRow key={i} item={item} color={color} />
          ))}
        </div>
      )}

      {extraStamp}
    </div>
  );
}

// ============ NJ SECTION ============
function NJSection() {
  const [expanded, setExpanded] = useState(new Set());
  const toggle = (idx) => {
    const next = new Set(expanded);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setExpanded(next);
  };

  return (
    <section id="nj">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: 'var(--ocean)' }}>חלק ראשון</div>
        <h2 className="display" style={{ fontSize: 48 }}>בסיס האם · ניו ג׳רזי</h2>
        <span className="handwritten" style={{ fontSize: 28, color: 'var(--tomato)' }}>אקשן + שופינג ללא מע"מ</span>
      </div>

      <p style={{ maxWidth: 700, color: 'var(--ink-soft)', marginBottom: 32 }}>
        מתארחים אצל יאיר, עינת, רום ונור. מנצלים את הפארקים הגדולים באמצע השבוע (פחות תורים), ואת חוקי הפטור ממס על ביגוד.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 40 }}>
        {NJ_DAYS.map((day, idx) => (
          <DayCard
            key={day.title}
            cover={day.icon}
            coverLabel={`יום ${idx + 1}`}
            color={day.color}
            title={day.title}
            subtitle={day.subtitle}
            items={day.blocks}
            isExpanded={expanded.has(idx)}
            onToggle={() => toggle(idx)}
            tapeColor={idx === 0 ? 'var(--tape-blue)' : 'var(--tape-pink)'}
            tapeRotate={idx === 0 ? -4 : 5}
            rotation={idx === 0 ? -0.8 : 0.8}
            extraStamp={idx === 0 ? (
              <div style={{ position: 'absolute', bottom: -14, left: -10, transform: 'rotate(-8deg)', zIndex: 5 }}>
                <Stamp color="var(--forest)">TAX · FREE</Stamp>
              </div>
            ) : null}
          />
        ))}
      </div>
    </section>
  );
}

// ============ NYC SECTION ============
function NYCSection() {
  const [expanded, setExpanded] = useState(new Set());
  const toggle = (idx) => {
    const next = new Set(expanded);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setExpanded(next);
  };

  const tapeColors = ['var(--tape)', 'var(--tape-blue)', 'var(--tape-pink)'];
  const tapeRotates = [-5, 4, -3];
  const rotations = [-1.5, 0.8, -0.5];

  return (
    <section id="nyc">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
        <div className="section-label" style={{ background: 'var(--tomato)' }}>חלק שני</div>
        <h2 className="display" style={{ fontSize: 48 }}>ימי השיא · ניו יורק</h2>
        <span className="handwritten" style={{ fontSize: 28, color: 'var(--ocean)' }}>Mega-Days</span>
      </div>

      <p style={{ maxWidth: 700, color: 'var(--ink-soft)', marginBottom: 32 }}>
        ימים ממוקדים למתבגרים ולמבוגרים שרוצים חוויות טרנדיות, אינטראקטיביות ופוטוגניות.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
        {NYC_DAYS.map((day, idx) => (
          <DayCard
            key={day.theme}
            cover={day.icon}
            coverLabel={`ניו יורק · יום ${idx + 1}`}
            color={day.color}
            title={day.theme}
            items={day.stops}
            isExpanded={expanded.has(idx)}
            onToggle={() => toggle(idx)}
            tapeColor={tapeColors[idx]}
            tapeRotate={tapeRotates[idx]}
            rotation={rotations[idx]}
          />
        ))}
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

Object.assign(window, { NJSection, NYCSection, RoadRules, ExtendedFamilySection });
