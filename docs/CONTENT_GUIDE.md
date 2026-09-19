# Content direction — required for future changes

The owner explicitly requests **no witchcraft content**.

- Do not introduce witches, wizards, spellcasting, occult rituals/symbols, demonic equipment, vampire characters or blood-magic upgrades in names, descriptions, artwork, effects or future backlog items.
- The owner's follow-up is stricter: **zero occult or ritual-like gameplay**, including ambiguous legacy themes. Keep the kingdom setting and benign biblical place names; do not present faith as a combat power. Religious references are not themselves witchcraft, but active abilities, upgrades and props must be unambiguously equipment, medicine or engineering.
- Use nature, military engineering, medicine and technology for equivalent gameplay. Current examples: Ironwood Marsh, Royal Blade, Precision Shuriken, Gravity Projector, Field Medkit and Crimson's Second Wind/combat recovery.
- Crimson is a human survivor; green medical feedback replaces the former blood-themed presentation. Map waymarkers are carved direction signs, not ritual props.
- Preserve save compatibility: legacy internal identifiers such as `crimson`, `sanguine`, `voidw`, `heroSteal` and `metaLeech` remain implementation details, not player-facing lore. A tower-placement `ghost` is only an engineering preview, not an undead character.
- Keep renamed weapons' damage-ledger labels consistent. When changing an ultimate name, update its execution branch too.

## Mandatory handover to Claude — v1.3.2

- Field Hospital / field stations replace the former ritual activation system. Activation is logistical setup paid in Silver; green medical cabinets and radio masts replace floating lights over pedestals. Range rings are coverage indicators, not symbols.
- Arc Coil / Cryo Pressure replace spiritual tower paths. Overdrive, Cryo Canister and Repair Kit are manufactured Workshop consumables. Emergency Kit is medical recovery. Pulse Modules are boss-dropped shockwave devices, not supernatural objects.
- Captain Fizz replaces the demon-referencing boss name in BOTH spawning and behaviour checks. Laser Cutter, Laser Array, Orbital Discharger, Arc Discharger, Cryo Emitter and Rotary Cutter explicitly identify hardware. ForceField now shows satellite panels and housings, not bare floating orbs. Decorative skull piles are rubble.
- No ritual altars, consecration, blessings-as-power, spell-like equipment, demon puns, enchanted relics, floating ritual props or potion/cauldron framing. Do not restore old names from screenshots, earlier commits or the historical changelog.
- Save/API compatibility only: `survivorRelics`, `player.relic`, `survivorKingdom.altar`, `KSC_ALTARS`, `altarCost` and `altarHeal` remain private legacy keys. NEVER use them as display names. Existing progress must continue to load.
- Saved lifetime weapon labels are allowlisted against current equipment; retired labels become `Legacy equipment` without discarding their numeric damage totals. Never render arbitrary saved labels as HTML.
- The Node regression suite now guards the runtime theme and executes station activation/healing, all three consumables, one-use/lock/pause rules, existing hospital saves and the renamed Second Wind. Keyword guards do not certify every visual: inspect procedural drawings and any new asset too.
- Remaining QA: physical iPhone Safari and airplane-mode reload are not certified. The current web folder is not an installable offline iPhone PWA. Do not promise otherwise.

Validation: run `node tools/test-ui-regressions.cjs`; inspect affected menus, upgrade descriptions and effects in the browser. Keyword checks support review but do not replace visual judgment.
