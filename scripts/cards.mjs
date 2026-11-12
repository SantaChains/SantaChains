import { document, slab, corners, rule, ring, embers, esc, P } from './theme.mjs';

const MAIN = [
  { name: 'Rust', role: '系统 · TUI · 工具链' },
  { name: 'Modern C++', role: '图形 · 性能 · 原生' },
  { name: 'Lua', role: '配置 · 插件' },
];

const COMMON = ['GPUI', 'Vite', 'Vulkan', 'Godot', 'TypeScript', 'React'];

const HEAT = ['#241f14', '#4a3b1c', '#7d6530', '#c9a24b', '#f2d68c'];

const bullet = (x, y) => `<path d="M${x} ${y - 4}l4 4-4 4-4-4Z" fill="${P.goldDim}"/>`;

export function heroDesktop() {
  const w = 880;
  const h = 300;
  const body = `
  ${slab(w, h)}
  ${corners(w, h)}
  ${embers(690, 150, 148, 6)}
  ${ring(690, 150, 92, .95)}
  <text x="64" y="54" class="mono dim" font-size="10" letter-spacing="4">TARNISHED ARCHIVE · 0521</text>
  <text x="64" y="136" class="gold" font-size="70" font-weight="700" letter-spacing="10">PUREEY</text>
  <text x="66" y="174" class="mono dim" font-size="14" letter-spacing="7">SANTA—CHAINS</text>
  ${rule(64, 452, 198)}
  <text x="64" y="232" font-size="18" letter-spacing="1">在安静处造工具。</text>
  <text x="64" y="256" class="mono dim" font-size="11" letter-spacing="1.5">BUILD QUIET TOOLS FOR LOUD SYSTEMS.</text>
  <text x="64" y="282" class="mono ash" font-size="9" letter-spacing="2">RUST / MODERN C++ / LUA</text>`;
  return document(w, h, 'pureey · SantaChains',
    'pureey / SantaChains：在安静处造工具。主力 Rust、Modern C++、Lua。',
    body);
}

export function heroMobile() {
  const w = 428;
  const h = 340;
  const body = `
  ${slab(w, h)}
  ${corners(w, h, 22, 18)}
  ${embers(338, 100, 82, 5)}
  ${ring(338, 100, 50, .8)}
  <text x="32" y="42" class="mono dim" font-size="8.5" letter-spacing="3">TARNISHED ARCHIVE · 0521</text>
  <text x="32" y="104" class="gold" font-size="44" font-weight="700" letter-spacing="7">PUREEY</text>
  <text x="34" y="132" class="mono dim" font-size="10" letter-spacing="5">SANTA—CHAINS</text>
  ${rule(32, 246, 156)}
  <text x="32" y="190" font-size="16">在安静处造工具。</text>
  <text x="32" y="214" font-size="16">Build quiet tools.</text>
  <text x="32" y="238" class="mono dim" font-size="9" letter-spacing="1.2">FOR LOUD SYSTEMS.</text>
  <text x="32" y="292" class="mono ash" font-size="8.5" letter-spacing="1.8">RUST / MODERN C++ / LUA</text>`;
  return document(w, h, 'pureey · SantaChains',
    'pureey / SantaChains：在安静处造工具。主力 Rust、Modern C++、Lua。',
    body);
}

export function techPanel() {
  const w = 620;
  const h = 330;
  const mainRows = MAIN.map((item, index) => {
    const y = 152 + index * 46;
    return `${bullet(34, y)}
    <text x="50" y="${y}" font-size="20">${esc(item.name)}</text>
    <text x="50" y="${y + 16}" class="mono dim" font-size="9" letter-spacing="1.2">${esc(item.role)}</text>`;
  }).join('\n  ');

  const chips = COMMON.map((name, index) => {
    const x = 326 + (index % 2) * 132;
    const y = 148 + Math.floor(index / 2) * 44;
    return `<rect x="${x}" y="${y}" width="124" height="32" rx="3" fill="${P.stoneHi}" fill-opacity=".62" stroke="${P.line}"/>
    ${bullet(x + 13, y + 16)}
    <text x="${x + 26}" y="${y + 21}" font-size="11">${esc(name)}</text>`;
  }).join('\n  ');

  return `${slab(w, h)}
  ${corners(w, h, 24, 20)}
  <text x="28" y="50" font-size="24" letter-spacing="2">技术铭文</text>
  <text x="28" y="70" class="mono dim" font-size="9" letter-spacing="2.4">TECH</text>
  <path d="M28 86H592" stroke="${P.gold}" stroke-width=".7" opacity=".5"/>
  <text x="32" y="116" font-size="14" letter-spacing="2">主力 / MAIN</text>
  ${mainRows}
  <path d="M310 104V300" stroke="${P.line}" stroke-width="1"/>
  <text x="326" y="116" font-size="14" letter-spacing="2">常用 / COMMON</text>
  ${chips}`;
}

export function nowPanel() {
  const w = 228;
  const h = 330;
  const lines = ['在做 heartflow。', '在学 GPUI 与 Vulkan。', '写小工具，读源码。'];
  return `${slab(w, h)}
  ${corners(w, h, 22, 18)}
  <text x="22" y="48" font-size="20" letter-spacing="2">现在 / NOW</text>
  <path d="M22 84H206" stroke="${P.gold}" stroke-width=".7" opacity=".5"/>
  ${lines.map((line, index) => `<text x="22" y="${128 + index * 48}" font-size="11">${esc(line)}</text>`).join('\n  ')}
  <text x="22" y="292" class="mono" font-size="7" letter-spacing="1.5" fill="${P.goldDim}">BUILD WITH LOVE</text>
  <g transform="translate(110 281) scale(.65)" fill="none" stroke="url(#gold)" stroke-width="1.4" opacity=".6">
    <path d="M10 18C2 12-2 7 2 3C5 0 9 2 10 5C11 2 15 0 18 3C22 7 18 12 10 18Z"/>
  </g>`;
}

export function statsPanel(metrics, languages, week, date, contributions) {
  const w = 880;
  const h = 260;
  const metricRows = metrics.map(([label, value], index) => {
    const x = 28 + index * 104;
    return `<text x="${x}" y="136" class="gold" font-size="30" font-weight="700">${value.toLocaleString('en-US')}</text>
    <text x="${x}" y="152" class="mono ash" font-size="6.5" letter-spacing=".8">${esc(label.split(' / ')[0])}</text>`;
  }).join('\n  ');
  const top = languages.slice(0, 3).map(share => share.language).join(' / ').toUpperCase()
    || 'NO LANGUAGE DATA';
  const total = contributions ? `${contributions.total.toLocaleString('en-US')} CONTRIBUTIONS` : '';

  return `${slab(w, h)}
  ${corners(w, h, 24, 20)}
  <text x="28" y="50" font-size="24" letter-spacing="2">开源档案</text>
  <text x="28" y="70" class="mono dim" font-size="9" letter-spacing="2.4">OPEN SOURCE</text>
  <path d="M28 86H852" stroke="${P.gold}" stroke-width=".7" opacity=".5"/>
  ${metricRows}
  <path d="M340 108V236" stroke="${P.line}" stroke-width="1"/>
  ${heatmap(contributions)}
  <text x="356" y="200" class="mono dim" font-size="7" letter-spacing="1.2">PAST 12 MONTHS</text>
  <text x="848" y="200" class="mono dim" font-size="7" letter-spacing="1" text-anchor="end">${total}</text>
  <text x="28" y="226" class="mono ash" font-size="8" letter-spacing="1.2">${esc(top)}</text>
  <text x="848" y="226" class="mono ash" font-size="7.5" letter-spacing="1.2" text-anchor="end">${week} · ${date}</text>`;
}

function heatmap(contributions) {
  const weeks = (contributions?.weeks ?? []).slice(-52);
  const normalized = Array.from({ length: 52 }, (_, index) => weeks[index] ?? []);
  const max = Math.max(1, ...normalized.flat());
  const cells = [];
  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const count = normalized[week][day] ?? 0;
      const level = count === 0 ? 0 : Math.min(4, 1 + Math.floor(count / max * 3.999));
      const x = 356 + week * 9.5;
      const y = 116 + day * 9.5;
      cells.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="8" height="8" rx="1.4" fill="${HEAT[level]}"/>`);
    }
  }
  return cells.join('');
}

export function rowTechDesktop() {
  const w = 880;
  const h = 330;
  const body = `
  <g transform="translate(8 0)">${techPanel()}</g>
  <g transform="translate(644 0)">${nowPanel()}</g>`;
  return document(w, h, '技术铭文与现在',
    '主力 Rust、Modern C++、Lua；常用 GPUI、Vite、Vulkan、Godot、TypeScript、React。',
    body);
}

export function rowTechMobile() {
  const w = 428;
  const h = 520;
  const mainRows = MAIN.map((item, index) => {
    const y = 124 + index * 36;
    return `${bullet(32, y)}
    <text x="46" y="${y}" font-size="16">${esc(item.name)}</text>
    <text x="46" y="${y + 14}" class="mono dim" font-size="8" letter-spacing="1">${esc(item.role)}</text>`;
  }).join('\n  ');

  const chips = COMMON.map((name, index) => {
    const x = 32 + (index % 2) * 194;
    const y = 256 + Math.floor(index / 2) * 38;
    return `<rect x="${x}" y="${y}" width="168" height="30" rx="3" fill="${P.stoneHi}" fill-opacity=".62" stroke="${P.line}"/>
    ${bullet(x + 12, y + 15)}
    <text x="${x + 23}" y="${y + 20}" font-size="11">${esc(name)}</text>`;
  }).join('\n  ');

  const lines = ['在做 heartflow。', '在学 GPUI 与 Vulkan。', '写小工具，读源码。'];

  return document(w, h, '技术铭文与现在',
    '主力 Rust、Modern C++、Lua；常用 GPUI、Vite、Vulkan、Godot、TypeScript、React。',
    `${slab(w, h)}
  ${corners(w, h, 22, 18)}
  <text x="32" y="46" font-size="22" letter-spacing="2">技术铭文</text>
  <text x="32" y="64" class="mono dim" font-size="8" letter-spacing="2.2">TECH</text>
  <text x="32" y="94" font-size="14" letter-spacing="2">主力 / MAIN</text>
  ${mainRows}
  <text x="32" y="232" font-size="14" letter-spacing="2">常用 / COMMON</text>
  ${chips}
  <path d="M32 380H396" stroke="${P.line}" stroke-width="1"/>
  <text x="32" y="404" font-size="18" letter-spacing="2">现在 / NOW</text>
  ${lines.map((line, index) => `<text x="32" y="${432 + index * 22}" font-size="11">${esc(line)}</text>`).join('\n  ')}`);
}

export function rowDataDesktop(metrics, languages, week, date, contributions) {
  const body = `<g transform="translate(0 0)">${statsPanel(metrics, languages, week, date, contributions)}</g>`;
  const desc = [
    ...metrics.map(([label, value]) => `${label}: ${value}`),
    languages.length ? `languages: ${languages.map(share => share.language).join(', ')}` : '',
  ].filter(Boolean).join('; ');
  return document(880, 260, '开源档案', desc, body);
}

export function rowDataMobile(metrics, languages, week, date, contributions) {
  const w = 428;
  const h = 300;
  const metricRows = metrics.map(([label, value], index) => {
    const x = 32 + index * 128;
    return `<text x="${x}" y="112" class="gold" font-size="24" font-weight="700">${value.toLocaleString('en-US')}</text>
    <text x="${x}" y="128" class="mono ash" font-size="6.5" letter-spacing=".8">${esc(label.split(' / ')[0])}</text>`;
  }).join('\n  ');

  const top = languages.slice(0, 3).map(share => share.language).join(' / ').toUpperCase()
    || 'NO LANGUAGE DATA';
  const total = contributions ? `${contributions.total.toLocaleString('en-US')} CONTRIBUTIONS` : '';

  return document(w, h, '开源档案',
    '每周刷新的 GitHub 开源档案：星标、关注、仓库与贡献热力图。',
    `${slab(w, h)}
  ${corners(w, h, 22, 18)}
  <text x="32" y="46" font-size="20" letter-spacing="2">开源档案</text>
  <text x="32" y="64" class="mono dim" font-size="7.5" letter-spacing="2">OPEN SOURCE</text>
  ${metricRows}
  <path d="M32 150H396" stroke="${P.gold}" stroke-width=".7" opacity=".45"/>
  ${heatmapMobile(contributions)}
  <text x="32" y="234" class="mono dim" font-size="7" letter-spacing="1.2">PAST 12 MONTHS</text>
  <text x="396" y="234" class="mono dim" font-size="7" letter-spacing="1" text-anchor="end">${total}</text>
  <text x="32" y="258" class="mono ash" font-size="8" letter-spacing="1.2">${esc(top)}</text>
  <text x="396" y="258" class="mono ash" font-size="7" letter-spacing="1.1" text-anchor="end">${week} · ${date}</text>`);
}

function heatmapMobile(contributions) {
  const weeks = (contributions?.weeks ?? []).slice(-52);
  const normalized = Array.from({ length: 52 }, (_, index) => weeks[index] ?? []);
  const max = Math.max(1, ...normalized.flat());
  const cells = [];
  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const count = normalized[week][day] ?? 0;
      const level = count === 0 ? 0 : Math.min(4, 1 + Math.floor(count / max * 3.999));
      const x = 30 + week * 7;
      const y = 166 + day * 7;
      cells.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="6" height="6" rx="1" fill="${HEAT[level]}"/>`);
    }
  }
  return cells.join('');
}
