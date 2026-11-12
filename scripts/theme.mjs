// Shared visual system for the profile assets.
// Credits and design references: see CREDITS.md.
export const P = {
  stone: '#141009',
  stoneHi: '#1c160d',
  parchment: '#e8dcc0',
  parchmentDim: '#b8ab8d',
  gold: '#c9a24b',
  goldHi: '#f2d68c',
  goldDim: '#7d6530',
  ember: '#a13a26',
  ash: '#8d8472',
  line: '#4a3d22',
};

export const FONT_SERIF = `'Palatino Linotype','Book Antiqua',Palatino,Georgia,'Noto Serif CJK SC','Source Han Serif SC','Noto Serif SC','Songti SC','SimSun','Microsoft YaHei',serif`;
export const FONT_MONO = `'JetBrains Mono','Cascadia Code','SFMono-Regular',Consolas,'Sarasa Mono SC','Noto Sans Mono CJK SC','Liberation Mono',monospace`;

export function esc(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  })[char]);
}

const css = `
  text { font-family: ${FONT_SERIF}; fill: ${P.parchment}; }
  .mono { font-family: ${FONT_MONO}; }
  .dim { fill: ${P.parchmentDim}; }
  .ash { fill: ${P.ash}; }
  .gold { fill: url(#gold); }
  .ember { fill: ${P.ember}; }
  .spin { animation: spin 110s linear infinite; }
  .breathe { animation: breathe 7s ease-in-out infinite; }
  .dust { animation: rise 9s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes breathe { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }
  @keyframes rise {
    0% { transform: translateY(0); opacity: 0; }
    18% { opacity: .85; }
    100% { transform: translateY(-96px); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .spin, .breathe, .dust { animation: none !important; }
  }
`;

function defs() {
  return `<defs>
    <style>${css}</style>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8a6c31"/>
      <stop offset=".32" stop-color="#f2d68c"/>
      <stop offset=".58" stop-color="#c9a24b"/>
      <stop offset="1" stop-color="#f7e7b4"/>
    </linearGradient>
    <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1b160e"/>
      <stop offset="1" stop-color="#0c0a06"/>
    </linearGradient>
    <filter id="glow" x="-70%" y="-70%" width="240%" height="240%">
      <feGaussianBlur stdDeviation="3.4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <pattern id="grain" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="9" cy="9" r=".7" fill="#c9a24b" opacity=".16"/>
    </pattern>
  </defs>`;
}

export function document(w, h, title, desc, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc" lang="zh-CN">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(desc)}</desc>
  ${defs()}
  ${body}
</svg>
`;
}

export function slab(w, h) {
  const d = `M22 5Q${w / 2} 1 ${w - 22} 5Q${w - 5} 5 ${w - 5} 22L${w - 4} ${h - 24}Q${w - 5} ${h - 5} ${w - 22} ${h - 5}Q${w / 2} ${h - 1} 22 ${h - 5}Q5 ${h - 6} 5 ${h - 23}L6 22Q5 5 22 5Z`;
  return `<path d="${d}" fill="url(#stone)" stroke="${P.goldDim}" stroke-width="1.4"/>
  <path d="${d}" fill="url(#grain)"/>
  <rect x="14" y="14" width="${w - 28}" height="${h - 28}" rx="10" fill="none" stroke="${P.line}" stroke-width="1"/>`;
}

export function corners(w, h, inset = 26, size = 22) {
  const c = (x, y, sx, sy) => `<path d="M${x} ${y + sy * size}V${y + 6}Q${x} ${y} ${x + 6} ${y}H${x + sx * size}" fill="none" stroke="url(#gold)" stroke-width="1.1" stroke-linecap="round"/>`;
  const d = (x, y) => `<path d="M${x} ${y - 4}l4 4-4 4-4-4Z" fill="${P.goldDim}"/>`;
  return [
    c(inset, inset, 1, 1), c(w - inset, inset, -1, 1),
    c(inset, h - inset, 1, -1), c(w - inset, h - inset, -1, -1),
    d(inset, inset), d(w - inset, inset), d(inset, h - inset), d(w - inset, h - inset),
  ].join('\n  ');
}

export function rule(x1, x2, y) {
  const mid = (x1 + x2) / 2;
  return `<path d="M${x1} ${y}H${mid - 12}M${mid + 12} ${y}H${x2}" stroke="${P.gold}" stroke-width=".8" opacity=".7"/>
  <path d="M${mid} ${y - 5}l5 5-5 5-5-5Z" fill="${P.goldDim}"/>`;
}

export function ring(cx, cy, r, opacity = 1) {
  const ticks = [];
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    const r1 = r + 9;
    const r2 = r + (i % 4 === 0 ? 19 : 14);
    ticks.push(`<path d="M${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)}L${(cx + Math.cos(a) * r2).toFixed(1)} ${(cy + Math.sin(a) * r2).toFixed(1)}"/>`);
  }
  return `<g opacity="${opacity}" fill="none" stroke="url(#gold)" stroke-linecap="round">
    <g class="spin" style="transform-origin:${cx}px ${cy}px">
      <circle cx="${cx}" cy="${cy}" r="${r}" stroke-width="1.3" stroke-dasharray="210 34 96 40 64 22"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 9}" stroke-width=".55" stroke-dasharray="1.5 7" opacity=".8"/>
      ${ticks.join('')}
    </g>
    <circle cx="${cx}" cy="${cy}" r="${r - 22}" stroke-width=".5" opacity=".55"/>
    <path d="M${cx - r + 4} ${cy + r * .58}Q${cx} ${cy + r * .84} ${cx + r - 4} ${cy + r * .58}" stroke-width="1.1"/>
    <path d="M${cx} ${cy - r - 18}L${cx} ${cy + r + 20}" stroke-width=".8" opacity=".7"/>
    <path d="M${cx} ${cy + r + 20}l-7 10 7 9 7-9Z" fill="url(#gold)" stroke="none" opacity=".9"/>
    <circle cx="${cx}" cy="${cy}" r="7" fill="url(#gold)" stroke="none" filter="url(#glow)"/>
  </g>`;
}

export function embers(cx, cy, spread, count = 8) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + .7;
    const distance = (.35 + ((i * 37) % 100) / 100 * .65) * spread;
    const x = cx + Math.cos(angle) * distance;
    const y = cy + Math.sin(angle) * distance * .6;
    const delay = ((i * 13) % 90) / 10;
    const size = (1 + (i % 3) * .5).toFixed(1);
    out += `<circle class="dust" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size}" fill="${i % 3 === 0 ? P.ember : P.goldHi}" opacity="0" style="animation-delay:${delay}s;animation-duration:${7 + (i % 5)}s"/>`;
  }
  return out;
}


