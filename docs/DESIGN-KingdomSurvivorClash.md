# KINGDOM SURVIVOR CLASH — Master Design (north star, filed 2026-08-30)

> Original design digest, updated by the owner's 2026-09-19 zero-occult instruction. The content guide overrides older lore and historical changelog entries.
> Current build: survivor-wave.html (single-file HTML5). Phases below map the path.

## 1. Core identity
- Genre: Top-Down Action Tower Defense RPG. Survivor.io feel + BTD towers + CoC meta.
- Art: biblical kingdom — gold, white marble, bronze, linen, warm sunlight, stained glass. (Full Blender EEVEE/Cycles + ComfyUI pipeline belongs to the standalone engine phase; the HTML build approximates with canvas palette/motifs.)
- Map: MASSIVE (4x survivor maps), seamless streaming. 60° tilt camera w/ boss auto-zoom. (Engine phase; HTML build expands world bounds + biome variety meanwhile.)

## 2. Mechanical synergy (implementable now)
- **Mobile Fortress:** hero has Build Radius (3 tiles); towers placeable inside it OR on pre-built Field Stations. Enemies path toward hero AND field stations.
- **Resource triad:** Silver (kills; buys towers — currently `gold`), Engineering Oil (regen; abilities/merges/station activation — NEW), Wisdom Gems (boss-dropped XP for card picks — map to existing XP/levelup).

## 3. Tower roster (23 lines, 3-path × 5-tier, merge T3+T3→T4, T4+T4→T5 Paragon)
Primary: Sling Thrower, Boomerang Guard, Tack Defender, Bombardier, Pitch Thrower, Watchtower (freeze).
Military: Archer Sentinel, River Patrol, Galley Captain, Sky Scout, Eagle Rider, Mortar Guard, Dartling Guard.
Specialist: Arc Coil, Royal Champion, Palace Guard, Medic Station, Shepherd.
Support: Supply Depot, Craftsman, Beast Tamer (trained lion companion), Town Crier (support zone), Spike Smith.

## 4. Enemies & funny bosses
Progression renames: Red Bandit → … → BAD Apocalypse. Clash types: Barbarian Swarm, P.E.K.K.A Knight (crushes towers), Electro Serpent (disables towers), Lava Hound, Wall Breaker, Goblin Drill (burrows).
Funny bosses (mechanic + weakness): Spud the Unruly (rolls, splits at 50%), Sir Peel-a-Lot (rapid reposition + slip peels), Lord Glaze (2%/s regen; Watchtower melts glaze), The Saucy Duke (grease zones slow tower fire), Captain Fizz (100-hit shield, knockback fizz), Grainlord Crisp (milk beam; fire toasts cereal), Baron Burrito (salsa AoE, chip cover), Count Patty (lettuce HP layers).

## 5. Maps (engine phase; theme list)
Promised Land Meadow, Mount Hermon Peaks, Valley of Fire, Garden Ruins, New Jerusalem Grid, Archipelago of Tyre, Orbital Colony Ring, Milk & Honey Sprawl, Shadow Valley, Wilderness Mirage.

## 6. Art/audio pipeline (engine phase)
Blender GLTF + Draco; ComfyUI (RevAnimated v2 + ControlNet OpenPose + IP-Adapter + Kingdom LoRA, 8x8 sheets); MiniMax stem OST (base/combat/boss), biome themes, TTS hero callouts.

## 7. Progression
In-match: gems→level→3 cards; elite wave every 5, boss every 10; extraction = survive timer or kill final boss.
Meta: Palace (TH), Scriptorium (lab % buffs), Workshop consumables (Overdrive/Cryo Canister/Repair Kit), Field-station system, season pass.
Difficulty: Easy 200 lives / Normal 100 / Hard 50 / Impoppable 1 / CHIMPS (no continues/powers/merging).

## 8. Win conditions
Survive all waves or extract; Perfect Run (0 lives/0 sells/0 powers); speedrun boss kills; collection; patrol rank.

## PHASE MAP (how we get there)
- **Phase 1 — HTML build (current repo, now):** theming pass (gold/marble, tower renames), resource triad, field stations + build radius, clash enemy types, funny bosses (1 per wave), difficulty modes, leaderboard, tower roster growth (re-spec existing weapons as tower lines), merges.
- **Phase 2 — Standalone engine (later, separate repo):** Godot/Unity ECS, 4x streaming maps, 60° camera, Blender asset pipeline, ComfyUI sprites, MiniMax OST, workshop/mods, patrol co-op.
