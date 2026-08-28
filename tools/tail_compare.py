import io, re, subprocess

def last_script(ref):
    out = subprocess.run(['git', 'show', f'{ref}:survivor-wave.html'], capture_output=True, text=True,
                         encoding='utf-8', errors='replace').stdout
    bodies = re.findall(r'<script[^>]*>(.*?)</script>', out, re.S)
    return bodies[-1]

cur = io.open('sw_tail.js', encoding='utf-8', newline='').read()
pre = last_script('HEAD^1')
w4g = last_script('w4g')
w4h = last_script('w4h')
for name, s in [('current', cur), ('pre-w4g', pre), ('w4g', w4g), ('w4h', w4h)]:
    print(f'{name:8s} {len(s.splitlines()):5d} lines  head: {s.strip().splitlines()[0][:60]!r}')
# where do current and pre-w4g diverge?
a, b = pre.split('\n'), cur.split('\n')
import difflib
sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal' and (i2 - i1) > 5:
        print(f'equal pre[{i1}:{i2}] cur[{j1}:{j2}]  first: {a[i1][:50]!r}')
    elif tag != 'equal':
        print(f'{tag:8s} pre[{i1}:{i2}] cur[{j1}:{j2}]')
