import { writeFileSync } from 'node:fs';
import { heroDesktop, heroMobile, rowTechDesktop, rowTechMobile } from './cards.mjs';

const out = name => new URL(`../assets/${name}`, import.meta.url);

const files = [
  ['identity.svg', heroDesktop()],
  ['identity-mobile.svg', heroMobile()],
  ['row-tech.svg', rowTechDesktop()],
  ['row-tech-mobile.svg', rowTechMobile()],
];

for (const [name, content] of files) {
  writeFileSync(out(name), content);
  console.log(`rendered assets/${name}`);
}
