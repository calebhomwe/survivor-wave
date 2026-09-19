# Kingdom Survivor Clash — changelog (web build)

## Post-v1.2 — 2026-09-19 (post-merge interaction fixes)
- Tower inspection/build UI closes when a level-up, pause, chest or end screen opens; controls cannot upgrade or sell behind those overlays.
- Settings pauses combat; held movement resets on suspension; paused hit-stop no longer advances the run clock.
- Touch tower placement/inspection and explicit cancellation; scrollable mobile menu, build bar and inspector; safe-area spacing for DOM controls and larger inspector buttons.
- End-screen details update an isolated text span, preserving Retry handlers; victory preserves towers for endless mode. M mute restored.
- Reduced meadow small-prop density; added a stable contrasting player ring.
- Documented Playwright/browser setup, removed a stale smoke workaround and added dependency-free source regression tests. Not physical-iPhone or offline-PWA certification.

## v1.2 — 2026-09-18 (visual polish + BTD upgrade paths + Clash kingdom)
- MAP 1 "Promised Land Meadow": kingdom re-theme of the first map — continuous-noise painterly ground (no tile grid), shade + sun dapple, grass/clover, flower meadows, seamless winding footpaths, flagstone roads with marble curbs and gold seams, marble plazas with fountains and pillars, banners, lanterns, market stalls, hay, carts, wells, shrines, low stone walls, olive trees.
- BTD upgrade paths: every tower line has 3 paths × 2 tiers (two paths per tower, third locks). Effective stats derive from base × paths × PARAGON/GLORY × Kingdom research (`TOWERSYS.eff`). New behaviours: pierce, crit, twin shells, concussion, deep freeze, no-falloff chains, long arcs, tithe oil/harvest, tar pools, caltrops, crier heraldry (sell value / mending), apothecary tonics, craftsman reinforcement.
- BTD inspect panel: icon, tier, stats (DMG / RATE / RANGE / POPS / DEALT), three path columns with costs + lock reasons, targeting toggle (CLOSE / HERO / STRONG / WEAK), merge + sell. Hotkeys 1/2/3 buy the next tier of a path while inspecting.
- Per-tower pops + damage ledger; ELECTRO SERPENT disable now truly silences a tower; goblin drills are untargetable to towers.
- GLORY (T5) now has a real bonus (+25% dmg, +10% range, +20% rate on top of PARAGON) — it was cosmetic.
- BAL: path oil costs 25–95 (old 240/400 tesla + mortar tiers were unreachable under the 100 oil cap).
- Kingdom art for all 11 towers (marble plinth, gold tier rings, path gems) incl. the five batch-D lines that only had overlay squares; build bar cards get icons + hotkey chips for every line.
- CLASH kingdom meta: 🏰 KINGDOM screen — PALACE (gates other buildings, +1 tower slot/level), SCRIPTORIUM (+6% tower dmg/level), OIL PRESS (+12 cap, +12% regen/level), FORGE (+25 tower HP, -4% cost/level), BEACON TOWER (+5% range, +4% rate/level), WORKSHOP (ZEAL Z / STILLNESS X / RESTORATION V, one use each per run), HIGH ALTAR (cheaper consecration, stronger altar heal). Persisted in `survivorKingdom`; village skyline + NOW/NEXT effect lines + lock reasons.
- HUD: removed the dead coin-turret "T:PLACE / G:TYPE" pill (T belongs to the build bar), oil bar no longer overlaps the mortar pill, weapon chips no longer clipped at the screen edge, Hub link + version footer hidden during play, boss-gauntlet banner no longer overflows, consumable chips + palace badge.
- MENU: retitled KINGDOM SURVIVOR CLASH, kingdom gold/marble theme, scroll-safe layout (top text and bottom buttons were clipped at 720p), compact secondary buttons, KINGDOM button beside FIGHT.

## v1.1 — 2026-08-31 (60 iterations after the placement bugfix)
- FIX: towers/HUD were invisible — a render-chain wrapper had lost its call-through; roads no longer block placement; smoke now pixel-checks the HUD.
- Towers: 11 lines (Sling Thrower, Prophet Herald, Bombardier, Tack Defender, Watchtower, Tithe Collector, Pitch Thrower, Spike Smith, Town Crier, Apothecary, Craftsman), oil upgrades T2/T3, **PARAGON T4** (merge two T3) and **GLORY T5** (merge two T4).
- Boss gauntlet (7): Spud the Unruly 2:30 → Baron Burrito 3:30 → Sir Peel-a-Lot 5:00 → Lord Glaze 6:30 → Count Patty 7:00 → Fizzbeelzebub 8:00 → Grainlord Crisp 9:00 — each with signature mechanics + counters.
- Clash enemies: Barbarian Swarmers, P.E.K.K.A Knights (crush towers; towers have HP), Electro Serpents (disable towers), Ram Beetles, Nacho Chips, Goblin Drills (burrow).
- Economy: Silver + Anointing Oil, altar consecration, covenant-radius placement, oil rush events.
- Meta: difficulty select, IRONMAN, NG+, Weekly Challenge, Hall of Valor top-10, lifetime stats, achievements, save export/import, endless KEEP GOING.
- QoL: build hotkeys 1-0/C with tooltips, range previews, sell-all, speedrun splits, photo mode, FPS counter + auto low-FX, gamepad menu support, unpause countdown, mute (M), photo HUD hide (H).

## v1.0 — 2026-08-30
- Baseline roguelite + 45 campaign improvements (waves 0-4 + wave 5 partial): weapons audit, 7 heroes, 5 biomes, achievements, bestiary, elite affixes, dynamic music, object pooling, spatial hash, BTD tower system, weapon archetype fixes.
