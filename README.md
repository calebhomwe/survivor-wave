# 🛡️ Survivor Wave

A polished single-file HTML5 horde-survival roguelite — **Survivor.io-style, but chill**: you defend a city park from invading wildlife, not zombies.

Play locally: keep `survivor-wave.html` beside its `assets/` folder, run
`python -m http.server 8000`, then open `http://localhost:8000/survivor-wave.html`.
No build step or runtime package dependencies. The complete downloaded folder can
run on a local server without internet. This GitHub build is **not yet an installable
offline iPhone PWA**; a browser preview alone is not an airplane-mode guarantee.

## Features

Content direction: no witchcraft or occult themes. Keep the biblical/kingdom identity and use natural, military, medical or technological alternatives. Contributors: read [the content guide](docs/CONTENT_GUIDE.md).

- **17 weapons** × 5 levels each, with EVO evolutions (pair a maxed weapon with its passive to unlock gold EVO cards)
- **6 heroes** with unique starting weapons, traits and ultimates
- **Procedural critter bestiary** — snakes, rats, boars, toads, scorpions, titan boa + hornet queen bosses, blimp mini-bosses, splitter packs
- **9 biomes × 4 road layouts** across a 17-chapter ladder, ending in Moonlit Keep, Ironwood Marsh, Crystal Citadel and Sunspire Gardens
- **BTD-style coin turrets** (place T, cycle G, upgrade F) + **mortar strikes** (Q)
- Gold economy, missions bar, achievements, daily challenge + sign-in, offline patrol, ECHO score-attack mode, chapters with stars, steamroll replays
- Crowd-physics hordes, combo system, dash, bloom, painted environment, arcade audio

## Controls
WASD/arrows/drag — move · SPACE — dash · R — ultimate · T/G/F — turrets · Q — mortar · P — pause · Gamepad OK

## Credits
Character/environment sprites: [Kenney](https://kenney.nl) (CC0) · Icons, critters, portraits: procedural · Fonts: Luckiest Guy + Baloo 2 (Google Fonts, OFL) · SFX + music: ElevenLabs · Particles: [Kenney Particle Pack](https://kenney.nl) (CC0)

## Kingdom Survivor Clash (v1.3.2)

Survivor.io-style horde survival × BTD tower defense × Clash-style kingdom meta.

- **BTD towers:** 11 tower lines, each with **3 upgrade paths × 2 tiers** (BTD crosspath rule: two paths
  per tower, the third locks), bought with Engineering Oil from a BTD-style inspect panel (stats, DPS,
  per-tower **pops** and damage dealt, **targeting priority** CLOSE / HERO / STRONG / WEAK, sell value).
  A fully-walked path = Tier 3 → merge two T3 into a **PARAGON** (T4), two T4 into **GLORY** (T5).
- **Clash kingdom:** the 🏰 KINGDOM screen is a persistent village bought with Silver. The **PALACE**
  (Town Hall) gates every other building's level: SCRIPTORIUM (tower damage research), OIL PRESS
  (oil cap + regen), FORGE (tower HP, cheaper builds), BEACON TOWER (range + fire rate), WORKSHOP
  (run consumables OVERDRIVE / CRYO CANISTER / REPAIR KIT on Z / X / V) and FIELD HOSPITAL (cheaper, stronger field stations).
- **Promised Land Meadow:** map 1 is a painterly kingdom meadow — continuous-noise ground, flower
  meadows, winding footpaths, flagstone roads with marble curbs, marble plazas with fountains, pillars,
  banners, lanterns, market stalls, wells and olive trees.
- **Readable mobile upgrade cards:** large 2× procedural weapon emblems, level progress pips, category
  labels, stronger contrast and iPhone safe-area/short-screen layouts.
- **7-boss gauntlet** every run, field-station/build-radius placement, Silver + Engineering Oil economy, clash enemies
  (P.E.K.K.A, Electro Serpent, Goblin Drill...), difficulty modes (Casual → Nightmare + IRONMAN), NG+,
  weekly challenges, endless mode, local leaderboards.

**Controls:** WASD move · SPACE dash · T build (1-0 / C pick) · click a tower to inspect (1/2/3 buy a path tier) ·
E activate field station · Z / X / V consumables · Q mortar · R ult · P pause · H photo · M mute · Y timer

**Touch:** drag empty ground to move; tap BUILD, select a tower, then tap ground to
place. Tap an existing tower to inspect/upgrade/sell. CANCEL PLACEMENT exits build
mode. Dash and ULT stay on the right; build/sell controls stay on the left. Menus
scroll; swipe the hero cards horizontally. Settings pauses a live run; close it
and press Resume to continue.

## Test setup

The Python browser harness needs separate developer dependencies; they are not
needed by players. Use a virtual environment:

```sh
python -m venv .venv
# macOS/Linux: source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install -r tools/requirements-test.txt
python -m playwright install chromium
node tools/test-ui-regressions.cjs
python tools/smoke.py
python tools/gauntlet.py --only g1,g2,g5,g6,g8
```

Linux CI may need `python -m playwright install --with-deps chromium`. Browser
installation needs internet; download it before working offline. A missing browser
or blocked download is a setup failure, not a passing test. The gauntlet writes
`tools/PROOF.md` and `tools/proof/`; review generated changes before committing.
The Node suite tests actual source functions with a fake DOM, not browser layout.
Physical iPhone Safari, safe-area behavior and offline reload still need device QA.
