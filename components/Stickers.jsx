/* global React */

// Decorative SVG stickers used throughout the scrapbook

const Star = ({ size = 48, color = '#f4b940', stroke = '#2a2420' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" style={{ display: 'block' }}>
    <path d="M24 4 L29 18 L44 19 L32 28 L36 43 L24 34 L12 43 L16 28 L4 19 L19 18 Z"
      fill={color} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const Heart = ({ size = 40, color = '#e05a3e' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: 'block' }}>
    <path d="M20 35 C5 24, 2 14, 9 9 C14 5, 18 8, 20 12 C22 8, 26 5, 31 9 C38 14, 35 24, 20 35 Z"
      fill={color} stroke="#2a2420" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const Arrow = ({ size = 80, color = '#2a2420', rotate = 0 }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}>
    <path d="M4 20 Q 30 2, 50 20 T 74 20 M 68 14 L 74 20 L 68 26"
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Sun = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" style={{ display: 'block' }}>
    <circle cx="28" cy="28" r="10" fill="#f4b940" stroke="#2a2420" strokeWidth="1.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
      <line key={a} x1="28" y1="4" x2="28" y2="12"
        transform={`rotate(${a} 28 28)`}
        stroke="#2a2420" strokeWidth="2" strokeLinecap="round" />
    ))}
  </svg>
);

const Palm = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{ display: 'block' }}>
    <path d="M30 58 Q 28 40, 32 22" fill="none" stroke="#6b4a2a" strokeWidth="3" strokeLinecap="round" />
    <path d="M32 22 Q 10 18, 4 8 Q 20 14, 32 22" fill="#3f6b3a" stroke="#2a2420" strokeWidth="1" />
    <path d="M32 22 Q 52 10, 58 22 Q 48 20, 32 22" fill="#4a7b44" stroke="#2a2420" strokeWidth="1" />
    <path d="M32 22 Q 40 4, 52 4 Q 44 14, 32 22" fill="#3f6b3a" stroke="#2a2420" strokeWidth="1" />
    <path d="M32 22 Q 20 2, 10 6 Q 22 16, 32 22" fill="#4a7b44" stroke="#2a2420" strokeWidth="1" />
  </svg>
);

const Coaster = ({ size = 70 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 70 50" style={{ display: 'block' }}>
    <path d="M4 44 L 14 20 L 28 36 L 42 10 L 56 30 L 66 20"
      fill="none" stroke="#e05a3e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="14" cy="20" r="3" fill="#f4b940" stroke="#2a2420" strokeWidth="1" />
    <circle cx="42" cy="10" r="3" fill="#f4b940" stroke="#2a2420" strokeWidth="1" />
    <circle cx="66" cy="20" r="3" fill="#f4b940" stroke="#2a2420" strokeWidth="1" />
  </svg>
);

const Stamp = ({ children, rotate = -8, color = '#e05a3e' }) => (
  <div style={{
    display: 'inline-block',
    padding: '6px 12px',
    border: `2px solid ${color}`,
    color,
    fontFamily: "'Special Elite', monospace",
    fontSize: 12,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    transform: `rotate(${rotate}deg)`,
    opacity: 0.85,
    background: 'rgba(255,255,255,0.3)',
  }}>
    {children}
  </div>
);

const Tape = ({ color = 'var(--tape)', rotate = -3, top = -14, left = '50%', width = 110, translate = '-50%, 0' }) => (
  <div style={{
    position: 'absolute',
    top, left,
    transform: `translate(${translate}) rotate(${rotate}deg)`,
    width, height: 28,
    background: color,
    opacity: 0.85,
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.25) 6px, rgba(255,255,255,0.25) 12px)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    clipPath: 'polygon(2% 15%, 6% 5%, 12% 20%, 20% 2%, 30% 15%, 42% 5%, 55% 18%, 68% 3%, 82% 18%, 92% 6%, 98% 20%, 98% 85%, 92% 95%, 82% 82%, 68% 97%, 55% 82%, 42% 95%, 30% 85%, 20% 98%, 12% 80%, 6% 95%, 2% 85%)',
  }} />
);

const PaperClip = ({ size = 40, rotate = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}>
    <path d="M12 6 Q 6 6, 6 14 L 6 30 Q 6 36, 14 36 Q 22 36, 22 30 L 22 10 Q 22 4, 28 4 Q 34 4, 34 10 L 34 28"
      fill="none" stroke="#8a8a8a" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

Object.assign(window, { Star, Heart, Arrow, Sun, Palm, Coaster, Stamp, Tape, PaperClip });
