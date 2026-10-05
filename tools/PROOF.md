# PROOF — Kingdom Survivor Clash (web build)

Generated 2026-10-05T04:45:15 · wall 675s · modules: g1, g2, g3, g4, g5, g6, g7, g8, g9

**VERDICT: ALL PASS**

## g1

| check | status | detail |
|---|---|---|
| run starts | PASS |  |
| tower ring placed (11 types + merge fodder) | PASS | placed 14 |
| oil upgrades reach T3 | PASS | 14 towers at T3 |
| PARAGON T4 merge | PASS | {'t4': 0, 't5': 1} |
| GLORY T5 merge | PASS | {'t4': 0, 't5': 1} |
| field station activated via E | PASS | 1 on |
| boss spawns: Spud the Unruly | PASS | {'hp': 936, 'max': 936, 'layers': None, 'sh': None, 'x': 3362} |
| boss killable: Spud the Unruly | PASS |  |
| boss spawns: Baron Burrito | PASS | {'hp': 931, 'max': 931, 'layers': None, 'sh': None, 'x': 3659} |
| boss killable: Baron Burrito | PASS |  |
| boss spawns: Sir Peel-a-Lot | PASS | {'hp': 1667, 'max': 1667, 'layers': None, 'sh': None, 'x': 2362} |
| boss killable: Sir Peel-a-Lot | PASS |  |
| boss spawns: Lord Glaze | PASS | {'hp': 3188, 'max': 3188, 'layers': None, 'sh': None, 'x': 2326} |
| boss killable: Lord Glaze | PASS |  |
| boss spawns: Count Patty | PASS | {'hp': 5534, 'max': 5534, 'layers': 3, 'sh': None, 'x': 3696} |
| boss killable: Count Patty | PASS |  |
| kills accrued | PASS | 28 kills |
| zero page errors | PASS | [] |
## g2

| check | status | detail |
|---|---|---|
| mode runs clean: casual | PASS | state=play kills=2 errs=0 |
| mode runs clean: normal | PASS | state=play kills=2 errs=0 |
| mode runs clean: nightmare | PASS | state=play kills=1 errs=0 |
| mode runs clean: ironman | PASS | state=play kills=2 errs=0 |
| mode runs clean: ngplus | PASS | state=play kills=1 errs=0 |
| mode runs clean: weekly | PASS | state=play kills=1 errs=0 |
| mode runs clean: echo | PASS | state=play kills=1 errs=0 |
| endless KEEP GOING works | PASS | True/clicked/play |
| endless zero errors | PASS | [] |
## g3

| check | status | detail |
|---|---|---|
| hero roster >= 6 | PASS | ['survivor', 'soldier', 'scout', 'medic', 'engi', 'crimson'] |
| hero kills: survivor | PASS | kills=21 errs=0 |
| hero kills: soldier | PASS | kills=21 errs=0 |
| hero kills: scout | PASS | kills=20 errs=0 |
| hero kills: medic | PASS | kills=17 errs=0 |
| hero kills: engi | PASS | kills=19 errs=0 |
| hero kills: crimson | PASS | kills=18 errs=0 |
## g4

| check | status | detail |
|---|---|---|
| weapon fires: Kunai | PASS | tag dmg=204 (other=0) |
| weapon fires: Shotgun | PASS | tag dmg=184 (other=3813) |
| weapon fires: Orbital Discharger | PASS | tag dmg=546 (other=92) |
| weapon fires: ForceField | PASS | tag dmg=221 (other=153) |
| weapon fires: Guardian | PASS | tag dmg=274 (other=142) |
| weapon fires: Molotov | PASS | tag dmg=202 (other=113) |
| weapon fires: Brick | PASS | tag dmg=260 (other=177) |
| weapon fires: Baseball Bat | PASS | tag dmg=468 (other=154) |
| weapon fires: Katana | PASS | tag dmg=391 (other=150) |
| weapon fires: Gravity Projector | PASS | tag dmg=270 (other=93) |
| weapon fires: RPG | PASS | tag dmg=530 (other=127) |
| weapon fires: Orbit Blades | PASS | tag dmg=344 (other=47) |
| weapon fires: Arc Discharger | PASS | tag dmg=282 (other=125) |
| weapon fires: Boomerang | PASS | tag dmg=338 (other=159) |
| weapon fires: Cryo Emitter | PASS | tag dmg=361 (other=111) |
| zero page errors | PASS | [] |
## g5

| check | status | detail |
|---|---|---|
| tower damage: gatling | PASS | 376 dmg |
| tower damage: tesla | PASS | 465 dmg |
| tower damage: mortar | PASS | 1272 dmg |
| tower damage: tack | PASS | 443 dmg |
| tower damage: watch | PASS | 570 dmg |
| tower damage: pitch | PASS | 622 dmg |
| tower damage: spike | PASS | 873 dmg |
| tithe generates silver | PASS | +2 |
| apothecary heals hero | PASS | +4 hp |
| town crier support zone applies | PASS | {'crierAura': True} |
| zero page errors | PASS | [] |
## g6

| check | status | detail |
|---|---|---|
| Spud spawns | PASS | {'hp': 937, 'max': 937, 'layers': None, 'sh': None, 'x': 1157} |
| Spud splits at 50% | PASS | 6 split spawns |
| Peel-a-Lot spawns | PASS | {'hp': 1505, 'max': 1505, 'layers': None, 'sh': None, 'x': 921} |
| Peel teleports | PASS | {'hp': 1505, 'max': 1505, 'layers': None, 'sh': None, 'x': 921}->{'x': 1858, 'y': 1295} |
| Lord Glaze spawns | PASS | {'hp': 2637, 'max': 2637, 'layers': None, 'sh': None, 'x': 927} |
| Glaze regenerates | PASS | 1582->1727 |
| Watchtower melts Glaze | PASS | {'melt': 3.75, 'gone': False, 'tower': True, 'dist': 42, 'state': 'play', 'tw': 1} |
| Count Patty spawns | PASS | {'hp': 3617, 'max': 3617, 'layers': 3, 'sh': None, 'x': 2279} |
| Patty layer pops | PASS | 3->2 |
| Captain Fizz spawns | PASS | {'hp': 4156, 'max': 4156, 'layers': None, 'sh': 80, 'x': 989} |
| Fizz shield absorbs | PASS | 80->74 |
| spawns: Baron Burrito | PASS | {'hp': 297, 'max': 297, 'layers': None, 'sh': None, 'x': 964} |
| royal loot: Baron Burrito | PASS | +150 silver |
| spawns: Grainlord Crisp | PASS | {'hp': 5433, 'max': 5433, 'layers': None, 'sh': None, 'x': 2219} |
| royal loot: Grainlord Crisp | PASS | +150 silver |
| spawns: Captain Fizz | PASS | {'hp': 4156, 'max': 4156, 'layers': None, 'sh': 80, 'x': 987} |
| royal loot: Captain Fizz | PASS | +150 silver |
| zero page errors | PASS | [] |
## g7

| check | status | detail |
|---|---|---|
| 120-entity scene | PASS | 127 enemies live |
| FPS >= 10 headless (software raster; GPU browsers far higher) | PASS | 18 fps headless |
| zero page errors under load | PASS | [] |
## g8

| check | status | detail |
|---|---|---|
| save keys discovered | PASS | 7 keys |
| corrupt-save boot: survivorSaveVer | PASS | menu=True errs=0 |
| corrupt-save boot: survivorGold | PASS | menu=True errs=0 |
| corrupt-save boot: survivorHero | PASS | menu=True errs=0 |
| corrupt-save boot: survivorDaily | PASS | menu=True errs=0 |
| corrupt-save boot: survivorMeta | PASS | menu=True errs=0 |
| corrupt-save boot: survivorPerks | PASS | menu=True errs=0 |
| corrupt-save boot: survivorAchievements | PASS | menu=True errs=0 |
| monkey test survives | PASS | state=play errs=0 |
## g9

| check | status | detail |
|---|---|---|
| soak run 1 clean | PASS | kills=70 errs=0 |
| soak run 2 clean | PASS | kills=58 errs=0 |
| soak run 3 clean | PASS | kills=263 errs=0 |

## Screenshots

![g1_endstate.png](proof/g1_endstate.png)
![g4_weapons.png](proof/g4_weapons.png)
![g5_towers.png](proof/g5_towers.png)
![g7_perf.png](proof/g7_perf.png)

---
94 checks · 0 failed