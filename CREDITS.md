# Credits / 致谢与借鉴

本仓库的页面结构、静态 SVG 资产组织方式与“GitHub Actions 定期重绘”流程，参考了以下公开工作。所有 SVG 图形、排版、文案与生成脚本均为本仓库原创重写，未复制第三方美术资源或源码。

## 结构与流程参考

- [luolangaga/luolangaga](https://github.com/luolangaga/luolangaga) — `picture` 桌面/移动双版本、静态 SVG 卡片与定时刷新工作流的结构参考。
- [Platane/snk](https://github.com/Platane/snk) — 用 Actions 生成并提交 SVG 的思路。
- [kyechan99/capsule-render](https://github.com/kyechan99/capsule-render) — 动态头图与分区色带的思路。

## 设计语言参考

- [Elden Ring (2022) design spec](https://designbycurio.com/elden-ring-2022) — 暖黑底、细金线、宽字距罗马大写、残环与蚀刻质感的主要参考。
- [Dark Souls-inspired GitHub character sheet](https://dev.to/ilkin97/i-turned-my-github-profile-into-a-dark-souls-inspired-rpg-character-sheet-c9i) — 把技能、统计与项目组织成角色卡 HUD 的思路。
- [GitHub Markdown layout tips](https://readmedesign.com/blog/github-markdown-tips-tricks) — `picture`、并排卡片与移动端适配的可用写法。
- Elden Ring 金箔、蚀刻线与残环纹样 — 仅作为视觉气质参考，未使用官方 Logo、角色图或游戏内素材。
- [Elden Ring logo black.svg](https://commons.wikimedia.org/wiki/File:Elden_Ring_logo_black.svg) — Wikimedia Commons 将其归为简单几何文字标识（PD-textlogo），但仍可能受商标限制；本项目没有使用该文件。
- [Runic letters elder futhark.svg](https://commons.wikimedia.org/wiki/File:Runic_letters_elder_futhark.svg) — 公有领域卢恩字母表，曾作为形态参考；最终版本删除了所有卢恩图形，只保留原创残环与几何线条，未嵌入该文件。
- [game-icons.net](https://game-icons.net/) — CC BY 3.0 的符文/剑类线性图标，作为风格参考，未直接使用。
- [NERV-UI](https://mdrbx.github.io/nerv-ui/) — EVA 战术 HUD 的网格、编号与仪表盘设计语言，最终未采用。
- [Doodlebug](https://doodlebug.tarinagarwal.in/) — 手绘统计卡的产品思路。
- [readme-aura](https://github.com/collectioneur/readme-aura) — React/JSX 在构建期渲染为 SVG 的实现思路。
- [svg-terminal](https://www.npmjs.com/package/svg-terminal) — 声明式配置生成自包含动画 SVG 的思路。

## 本地生成的装饰

- 贡献热力图由本仓库的 `scripts/update-stats.mjs` 通过 GitHub GraphQL API 获取数据，并在 `scripts/cards.mjs` 中直接绘制为 SVG；不使用第三方统计卡片或徽章服务。
- 所有金线、残环、热力图色阶与排版均为本仓库原创绘制。

## 工具与索引

- [abhisheknaiidu/awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme)
- [rzashakeri/beautify-github-profile](https://github.com/rzashakeri/beautify-github-profile)
- [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

如你认为某处借鉴应当补充署名，请开 issue 说明，我会修正。
