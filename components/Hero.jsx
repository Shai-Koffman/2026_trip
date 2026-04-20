/* global React, FAMILY, Tape, Star, Heart, Sun, PaperClip */
const { useState, useEffect } = React;

// ============ COUNTDOWN ============
function useCountdown(targetDate) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, targetDate - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

function Countdown() {
  const target = new Date('2026-07-14T10:00:00').getTime();
  const { days, hours, mins, secs } = useCountdown(target);

  const boxStyle = {
    background: 'var(--cream)',
    padding: '18px 12px 14px',
    minWidth: 92,
    textAlign: 'center',
    boxShadow: 'var(--shadow-paper)',
    position: 'relative',
  };
  const numStyle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 800,
    fontSize: 54,
    lineHeight: 1,
    color: 'var(--ink)',
    fontVariantNumeric: 'tabular-nums',
  };
  const lblStyle = {
    fontFamily: "'Assistant', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.05em',
    color: 'var(--ink-faded)',
    marginTop: 8,
  };

  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
      {[
        { n: days, l: 'ימים' },
        { n: hours, l: 'שעות' },
        { n: mins, l: 'דקות' },
        { n: secs, l: 'שניות' },
      ].map((b, i) => (
        <div key={b.l} style={{ ...boxStyle, transform: `rotate(${[-1.5, 1, -0.5, 1.5][i]}deg)` }}>
          <Tape color={['var(--tape)', 'var(--tape-blue)', 'var(--tape-pink)', 'var(--tape)'][i]} rotate={[-6, 4, -3, 5][i]} />
          <div style={numStyle}>{String(b.n).padStart(2, '0')}</div>
          <div style={lblStyle}>{b.l}</div>
        </div>
      ))}
    </div>
  );
}

// ============ HERO ============
function Hero() {
  // Re-render on tweak changes via a tiny subscription
  const [, force] = useState(0);
  useEffect(() => {
    const h = () => force(x => x + 1);
    window.addEventListener('tweaks-changed', h);
    return () => window.removeEventListener('tweaks-changed', h);
  }, []);
  const TWEAKS = window.__tweaks || {
    familyName: 'הפחמרגוזים · קיץ 2026',
    heroTitle: 'החוף המזרחי',
    heroSubtitle: 'קיץ 2026',
  };
  return (
    <section id="hero" style={{ paddingTop: 40, paddingBottom: 60 }}>
      {/* Decorative corner stickers */}
      <div style={{ position: 'absolute', top: 10, left: 40, transform: 'rotate(-15deg)' }}>
        <Sun size={72} />
      </div>
      <div style={{ position: 'absolute', top: 80, right: 20 }}>
        <Star size={36} color="var(--tomato)" />
      </div>
      <div style={{ position: 'absolute', top: 40, right: 80, transform: 'rotate(12deg)' }}>
        <Star size={24} color="var(--ocean)" />
      </div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-block',
          position: 'relative',
          marginBottom: 24,
          padding: 10,
          background: 'white',
          boxShadow: 'var(--shadow-lifted)',
          transform: 'rotate(-1.5deg)',
        }}>
          <Tape color="var(--tape)" rotate={-6} />
          <img
            src="assets/logo.jpg"
            alt={TWEAKS.familyName}
            style={{
              display: 'block',
              width: 'min(420px, 80vw)',
              height: 'auto',
            }}
          />
        </div>

        <h1 className="display" style={{ fontSize: 'clamp(56px, 9vw, 120px)', color: 'var(--ink)', marginBottom: 8 }}>
          {TWEAKS.heroTitle}
        </h1>

        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 18 }}>
          <span className="handwritten" style={{ fontSize: 56, color: 'var(--tomato)', display: 'inline-block', transform: 'rotate(-2deg)' }}>
            {TWEAKS.heroSubtitle}
          </span>
          <div style={{ position: 'absolute', top: -12, right: -44, transform: 'rotate(18deg)' }}>
            <Heart size={36} color="#e89ba8" />
          </div>
        </div>

        <p style={{ fontSize: 19, maxWidth: 680, margin: '0 auto 28px', color: 'var(--ink-soft)' }}>
          16 ימים · משפחת אלפרט משני הצדדים של אמריקה · בסיס אצל יאיר ועינת בניו ג׳רזי · גיחה לבחירה (אולי עם בועז וליבי).
        </p>

        {/* Dates stamp */}
        <div style={{ display: 'inline-flex', gap: 22, alignItems: 'center', marginBottom: 40 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="label">מתאריך</div>
            <div className="display" style={{ fontSize: 36 }}>14 ביולי</div>
          </div>
          <div style={{ width: 60, borderTop: '2px dashed var(--ink-faded)' }} />
          <div style={{ textAlign: 'center' }}>
            <div className="label">עד</div>
            <div className="display" style={{ fontSize: 36 }}>30 ביולי</div>
          </div>
        </div>

        {/* Countdown */}
        <div style={{ marginBottom: 32 }}>
          <div className="handwritten" style={{ fontSize: 28, color: 'var(--ink-soft)', marginBottom: 14 }}>
            עוד בדיוק...
          </div>
          <Countdown />
        </div>

        {/* Nav chips */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 720, margin: '0 auto' }}>
          {[
            { href: '#family', label: 'המשפחה' },
            { href: '#alperts', label: 'משפחת אלפרט' },
            { href: '#nj', label: 'ניו ג׳רזי' },
            { href: '#nyc', label: 'ניו יורק' },
            { href: '#vote', label: '★ הגיחה הגדולה' },
          ].map((l, i) => (
            <a key={l.href} href={l.href} style={{
              padding: '10px 16px',
              background: 'var(--cream)',
              color: 'var(--ink)',
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 500,
              border: '1.5px solid var(--ink)',
              transform: `rotate(${[-1, 1.5, -1, 1, -1.5, 1.2][i]}deg)`,
              boxShadow: '2px 2px 0 var(--ink)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0) translate(-1px, -1px)'; e.currentTarget.style.boxShadow = '3px 3px 0 var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${[-1, 1.5, -1, 1, -1.5, 1.2][i]}deg)`; e.currentTarget.style.boxShadow = '2px 2px 0 var(--ink)'; }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FAMILY SECTION ============
function FamilySection() {
  return (
    <section id="family">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
        <div className="section-label">החבורה</div>
        <h2 className="display" style={{ fontSize: 48 }}>מי בטיול</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
        {FAMILY.map((p, i) => {
          const rot = [-2, 1.5, -1, 2, -1.5][i];
          return (
            <div key={p.id} style={{
              background: 'white',
              padding: '14px 14px 18px',
              boxShadow: 'var(--shadow-paper)',
              transform: `rotate(${rot}deg)`,
              position: 'relative',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = `rotate(0deg) scale(1.03)`}
              onMouseLeave={e => e.currentTarget.style.transform = `rotate(${rot}deg)`}
            >
              <Tape color={['var(--tape)', 'var(--tape-blue)', 'var(--tape-pink)', 'var(--tape)', 'var(--tape-blue)'][i]} />
              {/* Avatar block */}
              <div style={{
                width: '100%',
                aspectRatio: '1',
                background: p.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 72,
                color: 'white',
                position: 'relative',
              }}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.nameEn}
                    style={{ width: '80%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.2))' }}
                  />
                ) : (
                  <span style={{ filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.2))' }}>{p.emoji}</span>
                )}
                <div style={{
                  position: 'absolute',
                  bottom: 8, left: 8,
                  background: 'var(--cream)',
                  color: 'var(--ink)',
                  fontFamily: "'Assistant', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  padding: '2px 8px',
                }}>גיל {p.age}</div>
              </div>
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <div className="display" style={{ fontSize: 28, lineHeight: 1 }}>{p.name}</div>
                <div className="en" style={{ fontSize: 13, color: 'var(--ink-faded)', marginTop: 2 }}>{p.nameEn}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

Object.assign(window, { Hero, FamilySection, Countdown });
