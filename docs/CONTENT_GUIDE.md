# Content direction — required for future changes

The owner explicitly requests **no witchcraft content**.

- Do not introduce witches, wizards, spellcasting, occult rituals/symbols, demonic equipment, vampire characters or blood-magic upgrades in names, descriptions, artwork, effects or future backlog items.
- Preserve the intentional biblical/kingdom theme. This instruction is not a request to remove biblical references, faith, blessings or the kingdom identity.
- Use nature, military engineering, medicine and technology for equivalent gameplay. Current examples: Ironwood Marsh, Royal Blade, Precision Shuriken, Gravity Projector, Field Medkit and Crimson's Second Wind/combat recovery.
- Crimson is a human survivor; green medical feedback replaces the former blood-themed presentation. Map waymarkers are carved direction signs, not ritual props.
- Preserve save compatibility: legacy internal identifiers such as `crimson`, `sanguine`, `voidw`, `heroSteal` and `metaLeech` remain implementation details, not player-facing lore. A tower-placement `ghost` is only an engineering preview, not an undead character.
- Keep renamed weapons' damage-ledger labels consistent. When changing an ultimate name, update its execution branch too.

Validation: run `node tools/test-ui-regressions.cjs`; inspect affected menus, upgrade descriptions and effects in the browser. Keyword checks support review but do not replace visual judgment.
