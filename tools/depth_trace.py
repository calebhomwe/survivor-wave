import io, sys

def strip_code(s):
    out = []; i = 0; n = len(s)
    while i < n:
        c = s[i]
        if c == '/' and i + 1 < n and s[i + 1] == '/':
            j = s.find('\n', i); i = n if j < 0 else j
        elif c == '/' and i + 1 < n and s[i + 1] == '*':
            j = s.find('*/', i); i = n if j < 0 else j + 2
        elif c in '"\'':
            q = c; i += 1
            while i < n:
                if s[i] == '\\': i += 2; continue
                if s[i] == q: i += 1; break
                i += 1
        elif c == '`':
            i += 1
            while i < n:
                if s[i] == '\\': i += 2; continue
                if s[i] == '`': i += 1; break
                i += 1
        else:
            out.append(c); i += 1
    return ''.join(out)

path, start = sys.argv[1], int(sys.argv[2])
lines = io.open(path, encoding='utf-8', newline='').readlines()
depth = 0
for idx, l in enumerate(lines[:start - 1]):
    sl = strip_code(l)
    depth += sl.count('{') + sl.count('(') + sl.count('[') - sl.count('}') - sl.count(')') - sl.count(']')
for idx in range(start - 1, len(lines)):
    sl = strip_code(lines[idx])
    depth += sl.count('{') + sl.count('(') + sl.count('[') - sl.count('}') - sl.count(')') - sl.count(']')
    marker = ' <<<' if 'function' in lines[idx] or '({' in sl else ''
    print(f'{idx+1:5d} d={depth:3d} {lines[idx][:95].rstrip()}{marker}')
