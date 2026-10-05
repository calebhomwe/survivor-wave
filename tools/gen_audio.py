#!/usr/bin/env python3
"""Generate the Kingdom Survivor Clash audio pack v2 with ElevenLabs.
Voice lines -> assets/voice/*.mp3, sound effects -> assets/sfx3/*.mp3, music -> assets/music/*.mp3.
Idempotent: skips files that already exist and are > 2KB. Key from the ELEVENLABS_API_KEY environment variable (never printed or committed)."""
import json, sys, time, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
import os
KEY = os.environ.get('ELEVENLABS_API_KEY', '').strip()
if not KEY:
  sys.exit('set ELEVENLABS_API_KEY (never commit it)')
ONLY = sys.argv[1] if len(sys.argv) > 1 else 'all'   # voice | sfx | music | all

VOICE_ID = 'pNInz6obpgDQGcFmaJgB'  # Adam - dominant, firm (herald / battle caller)
TTS_MODEL = 'eleven_multilingual_v2'

VOICE = {
  'run_start': 'Defend the kingdom!',
  'boss_incoming': 'Boss incoming!',
  'boss_spud': 'Spud the Unruly rolls in!',
  'boss_burrito': 'Baron Burrito approaches!',
  'boss_peel': 'Sir Peel-a-Lot appears!',
  'boss_glaze': 'Lord Glaze approaches!',
  'boss_patty': 'Count Patty approaches!',
  'boss_fizz': 'Captain Fizz approaches!',
  'boss_crisp': 'Grainlord Crisp approaches!',
  'boss_down': 'Boss down! Royal loot!',
  'elite': 'Elite incoming!',
  'new_foe': 'New foe sighted!',
  'levelup': 'Level up!',
  'level10': 'Level ten!',
  'level20': 'Level twenty!',
  'evo': 'Evolution!',
  'paragon': 'Paragon!',
  'glory': 'Glory!',
  'merge_ready': 'Merge ready!',
  'station': 'Field station online!',
  'oil_rush': 'Oil rush!',
  'tower_limit': 'Tower limit reached.',
  'victory': 'The kingdom stands! Victory!',
  'defeat': 'The line has fallen.',
  'endless': 'Endless mode. The horde remembers.',
  'ult_survivor': 'Barrage!',
  'ult_soldier': 'Orbital strike!',
  'ult_scout': 'Blade cyclone!',
  'ult_medic': 'Regen field!',
  'ult_engi': 'Fortify!',
  'ult_crimson': 'Second wind!',
  'c_zeal': 'Overdrive!',
  'c_still': 'Cryo canister!',
  'c_resto': 'Repair kit!',
  'kingdom_build': 'Construction complete.',
  'kingdom_palace': 'The palace rises!',
  'low_hp': "You're hurt! Fall back!",
  'countdown': 'Three. Two. One. Fight!',
}

SFX = {  # name: (prompt, seconds)
  'tower_place': ('heavy stone block set down on flagstone with a short metal clank, siege engine placed', 1.2),
  'tower_upgrade': ('metal ratchet clicks then a bright anvil chime, upgrade complete', 1.2),
  'tower_sell': ('small pile of silver coins poured onto a wooden table', 1.0),
  'paragon': ('triumphant brass fanfare stinger with a golden shimmer, short', 2.5),
  'arc_zap': ('sharp electric arc zap crackle from a copper coil', 0.7),
  'mortar_launch': ('deep hollow thump of a mortar launching a shell', 0.8),
  'cryo_pulse': ('icy pressurized gas burst with a crystalline shimmer', 1.2),
  'tack_burst': ('burst of many small metal darts fired at once, metallic pings', 0.7),
  'pitch_splash': ('thick tar splash, viscous liquid splat', 0.8),
  'spike_clang': ('blacksmith hammer clang on an anvil, single hit', 0.6),
  'crier_horn': ('short medieval rallying horn call, single note', 1.5),
  'heal_chime': ('soft medical monitor chime, gentle two-note healing beep', 0.9),
  'craft_gears': ('small clockwork gears whirring and clicking briefly', 1.0),
  'station_online': ('generator powering up with a radio mast beep, electrical hum rising', 1.8),
  'oil_rush': ('hand pump gurgling thick oil into a barrel, liquid glug', 1.3),
  'boss_stinger': ('dramatic orchestral boss reveal hit, low brass and timpani, ominous', 2.5),
  'boss_death': ('massive explosion with debris then a crowd cheering and a triumphant horn', 3.0),
  'ui_click': ('subtle soft user interface click, wooden tap', 0.5),
  'ui_confirm': ('bright short user interface confirm chime, coin-like', 0.5),
  'ui_error': ('short dull buzz error tone', 0.5),
  'kingdom_build': ('construction hammering on stone with a final wooden thud, quick', 1.5),
  'victory_fanfare': ('grand orchestral victory fanfare, brass and choir, triumphant', 4.0),
  'defeat_sting': ('somber low drum hit with a mournful horn, defeat', 3.0),
  'lvlup_major': ('bright rising orchestral sparkle with bells, level up reward', 1.6),
  'chest_open': ('wooden treasure chest creaking open with jingling coins and a sparkle', 1.6),
}

MUSIC = {  # name: (prompt, ms)
  'menu': ('Heroic medieval kingdom main theme, warm brass, strings, marching snare, hopeful and grand, instrumental, seamless loop', 60000),
  'combat': ('Driving orchestral hybrid battle music, taiko drums, brass ostinato, urgent strings, energetic, instrumental, seamless loop', 60000),
  'boss': ('Menacing epic boss battle music, heavy war drums, low brass, choir stabs, relentless and intense, instrumental, seamless loop', 60000),
}

def post(url, body, timeout=180):
  data = json.dumps(body).encode()
  req = urllib.request.Request(url, data=data, headers={'xi-api-key': KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg'})
  return urllib.request.urlopen(req, timeout=timeout).read()

def gen(out, fn, label):
  if out.exists() and out.stat().st_size > 2048:
    print('skip', label); return
  for attempt in range(3):
    try:
      audio = fn()
      if len(audio) < 2048: raise RuntimeError('too small: %d bytes' % len(audio))
      out.parent.mkdir(parents=True, exist_ok=True); out.write_bytes(audio)
      print('ok  ', label, len(audio), 'bytes', flush=True); return
    except urllib.error.HTTPError as e:
      msg = e.read()[:300]
      print('http', label, e.code, msg, flush=True)
      if e.code in (400, 401, 402, 422): return
    except Exception as e:
      print('err ', label, repr(e)[:200], flush=True)
    time.sleep(2 + attempt * 3)

if ONLY in ('voice', 'all'):
  for name, text in VOICE.items():
    gen(ROOT / 'assets/voice' / (name + '.mp3'), lambda text=text: post(
      f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}?output_format=mp3_44100_64',
      {'text': text, 'model_id': TTS_MODEL, 'voice_settings': {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.4, 'use_speaker_boost': True}}), 'voice:' + name)

if ONLY in ('sfx', 'all'):
  for name, (prompt, secs) in SFX.items():
    gen(ROOT / 'assets/sfx3' / (name + '.mp3'), lambda prompt=prompt, secs=secs: post(
      'https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_64',
      {'text': prompt, 'duration_seconds': secs, 'prompt_influence': 0.6}), 'sfx:' + name)

if ONLY in ('music', 'all'):
  for name, (prompt, ms) in MUSIC.items():
    def mk(prompt=prompt, ms=ms):
      try:
        return post('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_96', {'prompt': prompt, 'music_length_ms': ms, 'force_instrumental': True}, timeout=400)
      except urllib.error.HTTPError as e:
        if e.code == 422:
          return post('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_96', {'prompt': prompt, 'music_length_ms': ms}, timeout=400)
        raise
    gen(ROOT / 'assets/music' / (name + '.mp3'), mk, 'music:' + name)

print('DONE', ONLY)
