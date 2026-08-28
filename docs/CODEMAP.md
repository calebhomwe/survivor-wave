# survivor-wave.html — Code Map (for improvement agents)

Single file, ~11,400 lines of vanilla JS in one `<script>`. Canvas id `cv` (1280×720 logical,
resizes). No frameworks, no build step. All persistent state in `localStorage` (keys prefixed
`survivor*`, plus `siop`, `sioc`).

## Section map (line numbers approximate, file grows downward)

| Lines | Section | What's there |
|---|---|---|
| 320–404 | UI skin / bounty chip | CSS-ish frame painting helpers |
| 739–982 | ASSETS | `ASSETS` image path map (~820), image loader, `IMGS` registry (`im.ok`, `im.lit`) |
| 983–1353 | META / HEROES | `HEROES` table (~985), meta levels `metaLv`, gold, daily, chapters, relics, missions + achievements persistence (~1124–1150), `selectedHero`, `saveAll()` (~1160) |
| 1354–1472 | WORLD | camera, world bounds |
| 1362+ | PLAYER | player object, stats, regen |
| 1473–1549 | NEXT-RUN BOUNTIES | pre-run modifiers |
| 1550–1575 | SKILL DEFS | `SKILLS` table (passives) |
| 1576–1983 | WEAPONS | `WEAPONS` table + per-weapon fire/update logic |
| 1984–2083 | INPUT | keyboard/mouse/gamepad, `keys` set, touch |
| 2084–2529 | GAME FLOW | menus, `startRun()`, death, chapter select, armory/shop, pause |
| 2530–2793 | SPAWNING / DIRECTOR | wave director, spawn tables, elites |
| 2794–3023 | COMBAT HELPERS | damage, knockback, collisions, projectiles |
| 3024–4283 | UPDATE | main per-frame entity updates (enemies, bullets, pickups, turrets) |
| 4284–4590 | XP / LEVELUP | xp orbs, level-up UI, upgrade choices |
| 4591–4681 | CHEST | chest drops/opening |
| 4682–4931 | AUDIO | WebAudio synth + `assets/music|sfx` playback, volumes |
| 4932–4967 | PARTICLES / FLOATERS | particle + floating-text systems |
| 4968–5507 | ICON PAINTER | procedural weapon/skill icons |
| 5274–5507 | HERO PORTRAITS | portrait rendering |
| 5508–6405 | CRITTER PAINTERS | procedural enemy sprites (bestiary is drawn, not loaded) |
| 6406–6727 | ENVIRONMENT (chunked) | `CHUNK=512` (~6409), `chunkCache` (~6417), `chunkPlaceholder` (declared next to it), road/lamp painting |
| 6728–7713 | MAP BIOMES | biome themes, `themeFor()`, `buildRoads()` |
| 7714–10072 | RENDER | full draw pipeline: ground chunks, entities, FX, HUD, minimap, menus-on-canvas |
| 10073–10444 | MISSIONS SYSTEM | in-run missions |
| 10445–10552 | ACHIEVEMENTS SYSTEM | `achieves` store, unlock checks |
| 10553–10636 | BFX: biomes play differently | per-biome gameplay modifiers |
| 10637–10811 | LOOP | `loop()` (~10656) → `update()` + `render()`, fixed-ish dt, pause |
| 10812–end | ECHO MODE | daily-seeded DPS-race score attack |

## Key globals (read these before editing)

- `HEROES` (~985): object keyed by hero id → `{name,img,weapon,desc,regen?,turr?,ult}`. Hero images live in `assets/survivor/` (~51×43 px, base draw height 43 — see render ~9232 `him0`).
- `WEAPONS` (~1576): weapon definitions + behavior. Passives: `SKILLS` (~1550).
- `settings` (~1522): `{shake,flash,floaters,haptics,sfxVol,musicVol,lowFx}` — respect these in any new FX.
- Persistence: scattered `localStorage.getItem` with try/catch (~1031–1160); centralized-ish save in `saveAll()` (~1160). `metaLv` = meta upgrades, `sioc` = chapter progress, `siod` = daily state.
- Run state: `player`, `gameTime`, `state` ('play'|'pause'|...), `kills`, `gold`, `cam`, arrays for enemies/bullets/pickups (grep `enemies.push`).
- Enemy sprites are PROCEDURAL (critter painters ~5508) — new enemy types = new painter + spawn-table entry, no PNG needed. Hero sprites ARE PNGs.
- Elites: `ELITE_SLAM_R` (~6417 area), elite logic in spawning/combat sections.

## Hard rules for every change

1. Game stays ONE self-contained HTML file. Zero runtime network requests. No CDN/imports.
2. APPEND to shared tables (`HEROES`, `WEAPONS`, `SKILLS`, biome/spawn tables) — never reorder/rewrite existing entries (keeps swarm merges conflict-free).
3. Don't reformat untouched code. Match style: dense, `const`/`let`, short names, `/*PATCH-TAG*/` comments.
4. New localStorage keys: prefix `survivor`, read with try/catch default, write via `saveAll()`.
5. Gate: `python tools/smoke.py` (≤90s, serves repo itself on a random localhost port) must print `"pass": true` as the last `SMOKE` line. Don't weaken the harness.
