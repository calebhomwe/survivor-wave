import io, sys, re

"""Syntax-balance scanner: reports the last line where bracket depth returns to 0,
plus the first line where depth goes negative. Usage: python balance_check.py file.js"""

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

path = sys.argv[1]
lines = io.open(path, encoding='utf-8', newline='').readlines()
depth = 0; last0 = 0; neg = None
for idx, l in enumerate(lines):
    sl = strip_code(l)
    depth += sl.count('{') + sl.count('(') + sl.count('[') - sl.count('}') - sl.count(')') - sl.count(']')
    if depth < 0 and neg is None:
        neg = idx + 1
    if depth == 0:
        last0 = idx
print(f'file: {path}  lines: {len(lines)}  final depth: {depth}')
print(f'last depth-0 line: {last0 + 1}')
if neg: print(f'FIRST NEGATIVE depth at line: {neg}')
if depth > 0:
    print('--- context after last balanced line:')
    print(''.join(lines[last0:last0 + 14]))
