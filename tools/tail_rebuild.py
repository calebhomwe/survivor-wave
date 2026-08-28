import io

def rd(p):
    return io.open(p, encoding='utf-8', newline='').read().split('\n')

def block_from(src, marker):
    """Return everything from the line containing marker to EOF."""
    for i, l in enumerate(src):
        if marker in l:
            return src[i:]
    raise SystemExit(f'marker not found: {marker}')

w4e = rd('tail_w4e.js')
b43 = block_from(rd('tail_w4g.js'), 'B043')
b53 = block_from(rd('tail_w4h.js'), 'B053')
print('B043 block:', len(b43), 'lines |', b43[0][:60])
print('B053 block:', len(b53), 'lines |', b53[0][:60])

out = w4e[:]
if out and out[-1] == '':
    out = out[:-1]
out += [''] + b43 + [''] + b53 + ['']
io.open('tail_new.js', 'w', encoding='utf-8', newline='').write('\n'.join(out))
print('assembled:', len(out), 'lines')
