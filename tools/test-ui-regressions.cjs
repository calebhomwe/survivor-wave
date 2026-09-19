// Dependency-free source/unit regressions. Fake DOM, NOT browser/layout or device proof.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'survivor-wave.html'), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
let passed = 0;
function test(name, run) { run(); passed++; console.log('PASS', name); }
function fn(name) {
  const start = html.indexOf('function ' + name + '(');
  assert(start >= 0, name + ' exists');
  const end = html.indexOf('\n}', start);
  return html.slice(start, end + 2);
}
test('all inline scripts parse', () => scripts.forEach(s => new vm.Script(s)));
const ids = new Map(), events = {};
const noop = () => {};
const paint = new Proxy({}, {get: (_, key) => key.startsWith('create') ? () => ({addColorStop: noop}) : noop});
class Element {
  constructor(tag) {
    this.tagName = tag.toUpperCase(); this.style = {}; this.dataset = {};
    this.children = []; this._text = ''; this.attrs = {}; this.offsetWidth = 344; this.offsetHeight = 330;
    const classes = new Set(['hidden']);
    this.classList = {add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c)};
  }
  set id(v) { this._id = v; ids.set(v, this); }
  get id() { return this._id; }
  set textContent(v) { this._text = String(v); this.children = []; }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(''); }
  set innerHTML(v) { this._html = v; this.children = []; }
  get innerHTML() { return this._html || ''; }
  appendChild(c) { c.parentElement = this; this.children.push(c); return c; }
  setAttribute(k, v) { this.attrs[k] = v; }
  getContext() { return paint; }
  addEventListener() {}
}
const document = {body: new Element('body'), createElement: tag => new Element(tag), getElementById: id => ids.get(id)};
for (const id of ['cv', 'lvlup', 'pause', 'settingsOv', 'over', 'win', 'chestOv', 'start', 'finGold', 'winGold', 'setBtn']) {
  const e = new Element('div'); e.id = id; document.body.appendChild(e);
}
// Gold labels sit in isolated rows, not the overlay ancestor that contains retry.
for (const id of ['finGold', 'winGold']) new Element('div').appendChild(ids.get(id));
const c = {
  document, state: 'play', gold: 10000, oil: 100, innerWidth: 390, innerHeight: 844,
  keys: {w: true}, joy: {active: true, id: 7}, mouseDown: true,
  cam: {x: 1000, y: 1000}, WORLD: {w: 6000, h: 6000},
  cv: ids.get('cv'), ctx: paint, settings: {lowFx: true}, player: {x: 1300, y: 1400},
  Math, performance: {now: () => 0}, console, setInterval: noop,
  addEventListener: (name, cb, options) => (events[name] ||= []).push({cb, options}),
  update: noop, renderHUD: noop, startGame: () => { c.state = 'play'; },
  addFloater: noop, spawnParticles: noop, sfx: noop,
  Music: {start: noop, stop: noop}, renderPauseBuild: noop, renderSettings: noop,
  hideEl: id => ids.get(id).classList.add('hidden')
};
c.window = c;
vm.createContext(c);
for (const name of ['resetGameInput', 'syncPlayUI', 'showEl', 'togglePause', 'updateRunDetails']) vm.runInContext(fn(name), c);
vm.runInContext(scripts.find(s => s.includes('BTD: TOWER PLACEMENT SYSTEM')), c);
const ts = c.TOWERSYS;
const emit = (type, x, y) => {
  const e = {target: c.cv, button: 0, clientX: x, clientY: y,
    changedTouches: [{clientX: x, clientY: y, identifier: 1}],
    stopped: false, prevented: false, stopImmediatePropagation() { this.stopped = true; }, preventDefault() { this.prevented = true; }};
  for (const h of events[type] || []) { h.cb(e); if (e.stopped) break; }
  return e;
};
const descendants = e => [e, ...e.children.flatMap(descendants)];
test('touch places at tap coordinates and does not start movement', () => {
  ts.startPlace('gatling'); const gold = c.gold;
  const e = emit('touchstart', 160, 250);
  assert.equal(ts.towers.length, 1); assert.equal(ts.towers[0].x, 1160);
  assert.equal(ts.towers[0].y, 1250); assert.equal(c.gold, gold - 50);
  assert(e.prevented && e.stopped); assert.equal(c.joy.active, false);
});
test('explicit cancel exits repeated placement', () => {
  ids.get('kscCancelBuild').onclick({stopPropagation: noop});
  assert.equal(ts.ghost, null); assert.equal(ids.get('kscCancelBuild').style.display, 'none');
});
test('touch inspects a tower and upgrade button updates effective rate', () => {
  emit('touchstart', 160, 250); assert.equal(ts.selected, ts.towers[0]);
  const pop = ids.get('kscTowerInspect'); assert.equal(pop.style.display, 'block');
  const button = descendants(pop).find(e => e.tagName === 'BUTTON' && e.innerHTML.includes('Quick Arm'));
  const before = ts.eff(ts.towers[0]).rate;
  button.onclick({stopPropagation: noop});
  assert.equal(c.oil, 70); assert(ts.eff(ts.towers[0]).rate < before);
});
test('level-up closes inspector and clears held input immediately', () => {
  c.keys.w = true; c.joy.active = true; c.mouseDown = true;
  c.state = 'levelup'; c.showEl('lvlup');
  assert.equal(ts.selected, null); assert.equal(ids.get('kscTowerInspect').style.display, 'none');
  assert.equal(c.document.body.dataset.gameplay, 'false');
  assert.equal(Object.keys(c.keys).length, 0); assert(!c.joy.active && !c.mouseDown);
});
test('stale upgrade handlers cannot buy behind an overlay', () => {
  const button = descendants(ids.get('kscTowerInspect')).find(e => e.tagName === 'BUTTON' && e.innerHTML.includes('Twin Shot'));
  const oil = c.oil; button.onclick({stopPropagation: noop}); assert.equal(c.oil, oil);
});
test('every blocking overlay closes both building and inspection state', () => {
  for (const id of ['pause', 'settingsOv', 'chestOv', 'over', 'win', 'start']) {
    c.state = 'play'; ts.toggleBar(); c.showEl(id);
    assert.equal(ts.barOpen, false); assert.equal(ts.selected, null);
    c.hideEl(id); ts.startPlace('gatling'); c.showEl(id);
    assert.equal(ts.ghost, null); c.hideEl(id);
  }
});
test('mouse placement uses current click, not stale hover coordinates', () => {
  c.state = 'play'; ts.startPlace('gatling'); emit('mousedown', 310, 440); ts.cancel();
  assert.equal(ts.towers[1].x, 1310); assert.equal(ts.towers[1].y, 1440);
});
test('crosspath lock and paid tiers are preserved', () => {
  const t = ts.towers[1]; c.oil = 100;
  assert(ts.upgradePath(t, 0)); assert(ts.upgradePath(t, 1));
  const oil = c.oil; assert(!ts.upgradePath(t, 2, true)); assert.equal(c.oil, oil);
  c.oil = 100; assert(ts.upgradePath(t, 0)); assert.equal(t.tier, 3);
});
test('win and pause preserve towers; restart clears them', () => {
  c.state = 'win'; c.update(0.016); assert.equal(ts.towers.length, 2);
  c.state = 'paused'; c.update(0.016); assert.equal(ts.towers.length, 2);
  c.startGame(); assert.equal(ts.towers.length, 0); assert.equal(ts.placed, 0);
});
test('settings pauses combat and blocks keyboard unpause until closed', () => {
  vm.runInContext(html.match(/document\.getElementById\('setBtn'\)\.onclick=[^\n]+/)[0], c);
  c.state = 'play'; ids.get('setBtn').onclick(); assert.equal(c.state, 'paused');
  c.togglePause(); assert.equal(c.state, 'paused');
  c.hideEl('settingsOv'); c.togglePause(); assert.equal(c.state, 'play');
});
test('end-screen summary updates one span without replacing ancestor HTML', () => {
  c.state = 'over'; const parent = ids.get('finGold').parentElement;
  Object.defineProperty(parent, 'innerHTML', {set() { throw Error('would destroy Retry listener'); }});
  c.updateRunDetails(); c.updateRunDetails();
  assert.equal(parent.children.length, 2); assert(ids.get('finRunDetails').textContent.includes('oil held'));
  c.startGame(); assert.equal(ids.get('finRunDetails').textContent, '');
});
test('responsive and state visibility guards are present (not a layout test)', () => {
  for (const marker of ['viewport-fit=cover', 'safe-area-inset-bottom', '100dvh', '#kscTowerInspect', 'data-gameplay="true"']) assert(html.includes(marker));
  assert(html.includes("if(state==='play'&&hitStopT>0)"));
});
test('refined upgrade UI keeps large Retina art and explicit progress', () => {
  for (const marker of ['grid-template-columns:112px', 'width:96%;height:96%', 'iconCV(k,144)', 'g.translate(Sz/2,Sz/2)', 'lc-progress', 'CHOOSE YOUR BLESSING']) assert(html.includes(marker));
  assert(!html.includes('grid-template-columns:48px'));
});
test('expanded campaign exposes four named late-game destinations', () => {
  for (const marker of ['n<=17', 'MOONLIT KEEP', 'WITCHWOOD MIRE', 'CRYSTAL CITADEL', 'SUNSPIRE GARDENS', "if(ch>=13)return THEMES[Math.min(THEMES.length-1,ch-9)]"]) assert(html.includes(marker));
});
console.log(JSON.stringify({pass: true, groups: passed, inlineScripts: scripts.length, scope: 'source/unit; fake DOM, no browser or physical iPhone'}));
