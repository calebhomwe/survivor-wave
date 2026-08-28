# Survivor Wave — 100-Item Improvement Backlog (2026-08-29)

Ten waves × ten agents. Constraint per wave: no two items may touch the same subsystem.
Every item must keep the game a SINGLE self-contained HTML file with ZERO runtime network requests.
Verification gate for every item: `python tools/smoke.py` must print `"pass": true`.

Areas: BAL balance · WEAP weapon · HERO hero · ENMY enemy · BIOM biome · JUIC juice · AUD audio · UI user interface · META meta/progression · PERF performance · BUG robustness · A11Y accessibility · POL polish

## Wave 1
- **B001 [BAL] Weapon rebalance pass** — audit all 10 weapons' DPS/fire-rate/evolution cost; nudge outliers (±15% of median at equal investment). Mark edits with `// BAL:` comments. Done: all weapons viable, no reordering of table entries.
- **B013 [HERO] New hero: Vampire "Crimson"** — lifesteal passive (heal % of damage dealt), unique starting weapon. Append to HEROES table; never reorder existing entries. Done: selectable, playable, balanced vs existing 5.
- **B018 [ENMY] Spawn formations** — enemies occasionally spawn in rings, V-formations, and chasing trails. Done: ≥3 formation patterns, weighted by chapter, smoke passes.
- **B029 [JUIC] Damage numbers** — floating damage numbers with crit styling (bigger/gold), stack merging for dense hits. Done: readable at 60 enemies, cheap (pooled ok later).
- **B036 [AUD] Audio mix pass** — per-channel gain normalization, master soft limiter, ducking of SFX under level-up jingle. Done: no clipping on mass kills.
- **B041 [UI] End-of-run stats screen** — kills, time, damage by weapon, damage taken, gold, level. Done: shown on death and victory.
- **B058 [META] Achievements v1** — 15 achievements (kills, weapons evolved, chapters, no-hit chapter) with toast popups + list panel. Persisted.
- **B068 [PERF] Spatial hash grid** — uniform-grid broadphase for enemy collision queries. Done: measurable frame-time reduction or equal with headroom; behavior unchanged.
- **B074 [BUG] Save schema versioning** — versioned localStorage key, safe migration from old saves, corrupt-save recovery + reset button in options. Done: never hard-locks on bad JSON.
- **B081 [POL] Animated title background** — title screen shows a slow simulated horde drifting behind the logo. Done: subtle, cheap, skippable for perf.

## Wave 2
- **B002 [BAL] XP curve + choice weighting** — smooth per-chapter XP curve; level-up choices weight toward player's existing build synergies. Done: level pace feels even across chapters 1–4.
- **B006 [WEAP] New weapon: Orbit Blades** — rotating shield blades scaling with level; evolution = "Guillotine Halo" (bigger, launches on dash). Append to weapons table.
- **B014 [HERO] New hero: Engineer "Bolt"** — starts with turret, turret damage +X% per level passive. Append to HEROES.
- **B019 [ENMY] Elite affix system** — rare elites with 1 affix (Shielded / Swift / Volatile) + visual outline + better drops. Done: ~5% spawn rate, telegraphed.
- **B030 [JUIC] Screen shake + hit-stop** — shake on explosions/boss hits, 40ms hit-stop on elite kills. Respect a `reducedMotion` setting (default on = effects on).
- **B037 [AUD] Dynamic music intensity** — music layer crossfade calm ↔ combat ↔ boss based on threat. Done: audible transition, no restarts of the track.
- **B042 [UI] Weapon/passive tooltips** — inspect panel or hover/hold tooltips showing weapon stats, evolution recipe, synergy notes. Done: available in level-up and inventory.
- **B052 [UI] Bestiary gallery** — panel listing enemy types seen this save (name, mini-render, kill count). Persisted.
- **B090 [POL] XP orb merging** — orbs merge into bigger tiers when dense; visual distinction per tier. Done: perf-neutral or better.
- **B078 [A11Y] Colorblind-safe mode** — option that adds shape-coded outlines on elites/bosses + adjusted palette. Persisted.

## Wave 3
- **B003 [BAL] Gold economy** — drop rates, magnet pickup value curve, pity timer for rare drops. Done: mid-run shop (if enabled) affordable by chapter 3.
- **B007 [WEAP] New weapon: Chain Lightning** — arcs to N nearby enemies; evolution "Tempest Coil" (chains + stun). Append to weapons table.
- **B015 [HERO] Hero perk system** — each hero gets 3-tier meta perks bought with a persistent currency. Done: UI + persistence + real effects.
- **B024 [BIOM] Fifth biome: Cinder Wastes** — volcano palette, burning-ground hazards, 3 new critter skins via the procedural bestiary. Done: reachable via chapter select/progression.
- **B031 [JUIC] Kill streak combo** — combo counter with decay, small score multiplier at thresholds, on-screen flair. 
- **B038 [AUD] New SFX set** — level-up jingle, elite spawn sting, chest open, evolution fanfare, boss death. Synthesized (WebAudio) to stay single-file.
- **B045 [UI] First-run tutorial** — 3-step overlay (move / collect / aim), skippable, localStorage flag.
- **B059 [META] Daily run share codes** — show seed + modifiers as copyable code; import a code to replay identical daily.
- **B069 [PERF] Object pooling** — pools for bullets, particles, damage numbers, XP orbs. Done: near-zero per-frame allocations in hot paths.
- **B082 [POL] Loading progress** — asset load progress bar on boot (fonts/audio), fast-fail if assets missing.

## Wave 4
- **B004 [BAL] Enemy scaling audit** — HP/damage/speed per chapter plotted and smoothed; late-game not exponential nonsense. Done: comments with the curve formula.
- **B008 [WEAP] New weapon: Boomerang** — returns, pierces; evolution "Twin Cyclone" (two blades). Append.
- **B016 [HERO] Drone companion** — one hero gets an auto-attack drone with simple orbit AI. Done: drone survives to end, drawable cheap.
- **B020 [ENMY] New basic behaviors** — Charger (wind-up dash) and Splitter (dies into 2 minis). Done: mixed into spawns chapter 2+.
- **B032 [JUIC] Level-up moment FX** — burst ring, 300ms time-slow, chime already exists (reuse). Reduced-motion aware.
- **B039 [AUD] Biome ambient loops** — subtle procedural ambience per biome (wind/embers/cave drips), volume low.
- **B043 [UI] Pause menu options** — master/music/sfx volume sliders, screen-shake toggle, colorblind toggle, reduced-motion toggle. All persisted via save system.
- **B053 [UI] Lifetime stats panel** — total kills, runs, hours, best chapter, favorite weapon. Persisted aggregate.
- **B075 [BUG] Edge-case bug hunt** — pause during death, tab-blur dt spike, level-up during boss intro, spam-clicking level-up. Fix all found; list fixes in commit body.
- **B087 [POL] Code health helpers** — extract repeated patterns (spawn, lerp, rand-range, sprite draw) into small helpers; no behavior change. Do NOT reformat untouched code.

## Wave 5
- **B005 [BAL] Boss phases + enrage** — bosses get 3 HP phases with pattern shifts and an enrage timer. Done: visible phase transitions.
- **B009 [WEAP] New weapon: Frost Nova** — periodic AoE slow; evolution "Absolute Zero" (freeze). Append.
- **B025 [BIOM] Hazard per existing biome** — one new environmental hazard each for the 4 existing biomes. Done: hazards telegraphed, fair.
- **B048 [META? BAL] Difficulty select** — Casual / Normal / Nightmare multipliers; Nightmare gates an achievement. Stored per-run, not global.
- **B044 [UI] Minimap + offscreen arrows** — corner minimap (toggle) or offscreen elite/boss arrows; pick and implement cleanly.
- **B054 [UI] Local leaderboard** — top 10 runs per mode (score/time), localStorage, viewable from menu.
- **B060 [META] Prestige: Echo Shards** — earn shards on runs; 5-node permanent upgrade tree. Done: persists, real effects, reset-safe.
- **B065 [META] Pickup tiers** — small/big/star magnets, reworked nuke pickup with screen flash. Reduced-motion aware flash.
- **B070 [PERF] Culling + throttling** — off-screen entity update throttle; far-enemy simplified updates. Done: no visible behavior change on-screen.
- **B083 [POL] Chapter intro/outro cards** — animated title card per chapter start/end with objective text.

## Wave 6
- **B089 [BAL] Adaptive difficulty** — if player is steamrolling or dying fast, nudge spawn pressure within ±20%. Done: smooth, logged via debug only.
- **B010 [WEAP] Three new passives** — Boots (move speed), Gauntlet (area size), Prism (+1 projectile every N levels). Append to passives.
- **B023 [ENMY] Status icon system** — unified slow/burn/stun icons above enemies. Done: readable, cheap batching.
- **B026 [BIOM] Parallax backgrounds** — 2-layer parallax per biome using procedural canvas patterns. Cheap.
- **B091 [META] Wave director** — scripted intensity curve per chapter with breather waves replacing pure random pacing.
- **B033 [JUIC] Low-HP feedback** — vignette pulse + heartbeat sound under 25% HP. Reduced-motion aware.
- **B040 [AUD] UI sound kit** — hover/click/confirm/error synthesized blips, consistent volume.
- **B046 [UI] Chapter select with stars** — grid of chapters, best-time stars, locked/unlocked states.
- **B062 [META] Revive item** — rare drop granting one revive with dramatic FX. Reduced-motion aware.
- **B080 [A11Y] Text scaling + safe areas** — UI scale option (90/100/110%), safe-area margins. Done: nothing overlaps at any scale.

## Wave 7
- **B092 [ENMY] Chapter midpoint minibosses** — one miniboss per chapter with a simple pattern + guaranteed drop.
- **B011 [WEAP] Weapon synergy pairs** — specific weapon+passive pairs grant a named bonus. Done: ≥5 pairs, shown in tooltip.
- **B017 [HERO] Hero skins** — 2 palette-swap skins per hero, unlocked via achievements/prestige.
- **B027 [BIOM] Parallax polish OR environmental props** — explosive barrels + health shrines spawning per biome. Done: barrel chain reactions.
- **B034 [JUIC] Biome-matched death FX** — gibs/spark colors match biome palette per enemy family.
- **B095 [AUD] Boss music stinger** — distinct boss layer + death sting integrated with dynamic music.
- **B047 [UI] Mobile touch controls** — virtual joystick + auto-aim toggle; auto-detects touch. Done: playable on a phone-shaped viewport.
- **B063 [UI] Hide-UI / photo mode** — hotkey pauses and hides UI for clean screenshots.
- **B071 [PERF] Fixed timestep** — accumulator loop with spiral-of-death guard; dt spikes safe. Done: identical feel at 30/60/144Hz.
- **B061 [META] New Game+** — carry 1 weapon + 20% stats, enemies +50%; unlocked after victory.

## Wave 8
- **B096 [ENMY] Elite chest guardians** — mini-boss guards big chests. Done: fair fight, better loot.
- **B012 [WEAP] Reroll + banish in level-up** — limited charges per run, upgrades purchasable. Done: UI + charges tracked.
- **B022 [ENMY→UI] Build summary on pause** — pause shows current build, DPS estimate, synergies. Done: accurate to real state.
- **B028 [BIOM] Chapter 4 boss arena mechanic** — closing ring or similar arena hazard. Reduced-motion safe telegraphs.
- **B035 [JUIC] Additive glow layer** — cheap additive-canvas glow for projectiles/explosions, auto-off under FPS guard.
- **B093 [META] Echo ghost ally** — in Echo mode, your previous run's build manifests as an allied ghost for 30s once per chapter.
- **B055 [UI] Between-chapter shop** — spend gold on heals, upgrade rerolls, revives. Done: integrates with gold economy.
- **B066 [META] Mission expansion** — 3 new mission types using new systems (elites slain, hazards survived, no-reroll run).
- **B077 [BUG] Resolution independence** — devicePixelRatio handling, mid-run resize, ultrawide safe. Done: crisp at 125%/150% Windows scaling.
- **B051 [UI] Speedrun timer + splits** — toggleable timer with chapter splits. 

## Wave 9
- **B097 [ENMY] Miniboss variety pass** — second pattern set for chapter bosses (pickable per run seed). 
- **B049 [META] Save import/export** — export full save + settings as base64 text; import validates version. Done: round-trips losslessly.
- **B094 [BAL] Weekly challenge** — fixed seed + rotating modifier set, resets by week number, separate leaderboard slot.
- **B098 [BIOM] Biome fog/vignette** — subtle biome-tinted vignette, offscreen fade. Reduced-motion aware.
- **B064 [JUIC] Chest rarity FX** — rarity-colored beam + open animation tiered by loot.
- **B099 [JUIC] Player dust/footsteps** — movement dust particles, biome-tinted.
- **B072 [PERF] FPS guard** — auto particle budget reduction below 45fps, restores when headroom returns. Done: no user action needed.
- **B073 [PERF] Particle sprite atlas** — pre-render common particles to offscreen canvases; drawImage instead of shape draws.
- **B085 [POL] Gamepad support (basic)** — move/aim/pause via Gamepad API. Done: works in Chrome with Xbox pad mapping.
- **B057 [UI] Lore fragments** — rare scroll pickups with short flavor text panel + collection count.

## Wave 10
- **B100 [ENMY] Boss telegraph system** — warning zones before heavy attacks across all bosses. Done: no undodgeable surprises.
- **B101 [WEAP] Evolution recipe hints** — tooltip shows "evolves with X at level Y" hints without spoiling full recipe pre-unlock.
- **B102 [HERO] Hero unlock quests** — short in-run objectives unlock the 2 new heroes for new players (auto-unlocked for existing saves).
- **B103 [META] Achievement rewards** — achievements grant small permanent bonuses (capped, e.g., +2% gold each tier).
- **B104 [UI] Onboarding settings check** — first-boot asks reduced-motion/colorblind preferences quietly; skippable.
- **B105 [JUIC] Victory sequence** — proper end-of-campaign celebration (stat reel, confetti burst, reduced-motion variant).
- **B106 [AUD] Full audio regression** — every new system emits correct sounds at correct volumes; fix drift. Ship a mixing table comment.
- **B107 [BUG] Full edge-case regression hunt** — playtest every mode: daily, Echo, NG+, endless, weekly, mobile viewport. Fix what breaks.
- **B108 [PERF] Final perf pass** — profile hot loops, fix top 3, verify stable 60fps with 200 enemies + max particles.
- **B109 [POL] Dev console** — `?debug` URL param enables godmode/spawn menu/timescale for future testing. Hidden in normal play.

---
**Count: exactly 100 items — ten waves × ten agents.**
Rules for every agent: single-file constraint, zero network, append-don't-reorder shared tables, run smoke before commit, commit message `BXXX: short title`.
