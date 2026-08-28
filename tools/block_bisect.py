import io, re, subprocess, sys

NODE = r"C:\Users\caleb\nodejs\node-v24.18.0-win-x64\node.exe"
src = io.open(sys.argv[1], encoding='utf-8', newline='').read()
lines = src.split('\n')

# find candidate top-level boundaries: lines that are exactly '})();' possibly with ';'
starts = [0]
for i, l in enumerate(lines):
    if re.fullmatch(r'\}\)\(\);?\s*', l.strip() or 'x'):
        if i + 1 < len(lines):
            starts.append(i + 1)
blocks = []
for a, b in zip(starts, starts[1:] + [len(lines)]):
    blocks.append((a, b))
print(f'{len(blocks)} blocks')
for n, (a, b) in enumerate(blocks):
    io.open('sw_blk.js', 'w', encoding='utf-8', newline='').write('\n'.join(lines[a:b]))
    r = subprocess.run([NODE, '--check', 'sw_blk.js'], capture_output=True, text=True)
    status = 'OK ' if r.returncode == 0 else 'BAD'
    first = lines[a].strip()[:70]
    print(f'block {n:2d} lines {a+1:4d}-{b:4d} {status}  {first}')
    if r.returncode != 0:
        err = (r.stderr or '').split('\n')
        for e in err[1:4]:
            print('     ', e[:100])
