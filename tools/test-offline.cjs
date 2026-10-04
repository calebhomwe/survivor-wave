const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'survivor-wave.html'), 'utf8');
const swSource = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const offlineSource = fs.readFileSync(path.join(root, 'offline.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));

new vm.Script(swSource);
new vm.Script(offlineSource);
assert(html.includes('<link rel="manifest" href="manifest.webmanifest">'));
assert(html.includes('id="prepareOffline"'));
assert(html.includes('id="offlineStatus"'));
assert(html.includes('<script src="offline.js" defer></script>'));
assert.equal(manifest.start_url, './survivor-wave.html');
assert.equal(manifest.scope, './');
assert.equal(manifest.display, 'standalone');

const shellMatch = swSource.match(/const CACHE_PATHS = (\[[\s\S]*?\]);/);
assert(shellMatch, 'service worker cache inventory exists');
const shellPaths = vm.runInNewContext(shellMatch[1]);
assert.equal(new Set(shellPaths).size, shellPaths.length, 'cache inventory has no duplicates');
for (const relativePath of shellPaths) {
  const absolutePath = path.resolve(root, relativePath);
  assert(absolutePath.startsWith(root + path.sep), 'cache path stays inside the repository');
  assert(fs.existsSync(absolutePath), `cached file exists: ${relativePath}`);
}

function listFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(absolutePath) : [path.relative(root, absolutePath).replaceAll(path.sep, '/')];
  });
}
const missingAssets = listFiles(path.join(root, 'assets')).filter(file => !shellPaths.includes(file));
assert.deepEqual(missingAssets, [], 'every checked-in game asset is in the offline cache inventory');

function makeServiceWorker(failingPath) {
  const handlers = {};
  const entries = new Map();
  let fetchCount = 0;
  const cache = {
    match: async request => entries.get(typeof request === 'string' ? request : request.url),
    put: async (request, response) => entries.set(typeof request === 'string' ? request : request.url, response.clone())
  };
  const self = {
    registration: {scope: 'https://game.example/survivor-wave/'},
    location: {origin: 'https://game.example'},
    addEventListener: (type, handler) => { handlers[type] = handler; },
    skipWaiting: async () => {},
    clients: {claim: async () => {}}
  };
  const context = {
    self,
    caches: {
      open: async () => cache,
      keys: async () => ['unrelated-cache', 'survivor-wave-shell-old'],
      delete: async () => true
    },
    URL, Request, Response, AbortController, Date, Promise, Set, Map,
    setTimeout, clearTimeout,
    fetch: async request => {
      fetchCount++;
      if (failingPath && request.url.endsWith(failingPath)) return new Response('missing', {status: 404});
      return new Response('cached test asset', {status: 200});
    }
  };
  vm.runInNewContext(swSource, context);
  return {handlers, entries, get fetchCount() { return fetchCount; }};
}

function makeOfflinePage(register, getReady, timers = {setTimeout, clearTimeout}) {
  const button = {disabled: false, addEventListener: (type, handler) => { button.click = handler; }};
  const status = {textContent: ''};
  const navigator = {serviceWorker: {register, get ready() { return getReady(); }}};
  class FakeMessageChannel {
    constructor() {
      this.port1 = {onmessage: null, close() {}};
      this.port2 = {
        postMessage: data => queueMicrotask(() => this.port1.onmessage?.({data})),
        close() {}
      };
    }
  }
  vm.runInNewContext(offlineSource, {
    document: {getElementById: id => id === 'prepareOffline' ? button : status},
    window: {isSecureContext: true},
    navigator,
    location: {href: 'https://game.example/survivor-wave/survivor-wave.html'},
    URL, MessageChannel: FakeMessageChannel, Promise, setTimeout: timers.setTimeout, clearTimeout: timers.clearTimeout
  });
  return {button, status};
}

async function run() {
  const workingWorker = {
    postMessage: (message, ports) => {
      assert.equal(message.type, 'PREPARE_OFFLINE');
      ports[0].postMessage({type: 'progress', completed: shellPaths.length, total: shellPaths.length});
      ports[0].postMessage({type: 'complete', version: 'survivor-wave-shell-v2', total: shellPaths.length});
      ports[0].close();
    }
  };
  const registration = {active: workingWorker};
  let registrationAttempts = 0;
  const retryPage = makeOfflinePage(async () => {
    registrationAttempts++;
    if (registrationAttempts === 1) throw new Error('temporary service-worker fetch failure');
    return registration;
  }, () => Promise.resolve(registration));
  await retryPage.button.click();
  assert.equal(registrationAttempts, 1);
  assert(!retryPage.status.textContent.includes('Offline play ready'));
  assert.equal(retryPage.button.disabled, false);
  await retryPage.button.click();
  assert.equal(registrationAttempts, 2, 'retry invokes service-worker registration again');
  assert(retryPage.status.textContent.includes('Offline play ready'));

  const fastTimeouts = {
    setTimeout: (callback, ms) => setTimeout(callback, ms === 25000 ? 0 : ms),
    clearTimeout
  };
  const readinessPage = makeOfflinePage(
    async () => registration,
    () => new Promise(() => {}),
    fastTimeouts
  );
  await readinessPage.button.click();
  assert(!readinessPage.status.textContent.includes('Offline play ready'));
  assert(readinessPage.status.textContent.includes('retry'), 'service-worker readiness timeout is recoverable');
  assert.equal(readinessPage.button.disabled, false);

  const silentRegistration = {active: {postMessage() {}}};
  const preparePage = makeOfflinePage(
    async () => silentRegistration,
    () => Promise.resolve(silentRegistration),
    fastTimeouts
  );
  await preparePage.button.click();
  assert(!preparePage.status.textContent.includes('Offline play ready'));
  assert(preparePage.status.textContent.includes('retry'), 'prepare-message timeout is recoverable');

  const serviceWorker = makeServiceWorker();
  const {handlers, entries} = serviceWorker;
  let install;
  handlers.install({waitUntil: promise => { install = promise; }});
  await install;
  assert.equal(entries.size, shellPaths.length, 'install caches the complete shell');

  const messages = [];
  let preparation;
  handlers.message({
    data: {type: 'PREPARE_OFFLINE'},
    ports: [{postMessage: message => messages.push(message), close() {}}],
    waitUntil: promise => { preparation = promise; }
  });
  await preparation;
  const complete = messages.find(message => message.type === 'complete');
  assert.deepEqual(
    {version: complete.version, total: complete.total},
    {version: 'survivor-wave-shell-v2', total: shellPaths.length}
  );
  assert(messages.some(message => message.type === 'progress'));

  let cachedResponse;
  handlers.fetch({
    request: new Request('https://game.example/survivor-wave/survivor-wave.html'),
    respondWith: promise => { cachedResponse = promise; }
  });
  assert.equal(await (await cachedResponse).text(), 'cached test asset');
  assert.equal(serviceWorker.fetchCount, shellPaths.length, 'cached shell requests do not go to network');
  let rangeHandled = false;
  handlers.fetch({
    request: new Request('https://game.example/survivor-wave/assets/music/theme.mp3', {headers: {range: 'bytes=0-1'}}),
    respondWith: () => { rangeHandled = true; }
  });
  assert.equal(rangeHandled, false, 'range requests remain outside the cache handler');

  const broken = makeServiceWorker('assets/app-icon.svg');
  const brokenPage = makeOfflinePage(async () => {
    let failedInstall;
    broken.handlers.install({waitUntil: promise => { failedInstall = promise; }});
    await assert.rejects(failedInstall);
    return {active: null};
  }, () => new Promise(() => {}), fastTimeouts);
  await brokenPage.button.click();
  assert(broken.entries.size < shellPaths.length, 'failed install leaves an incomplete cache');
  assert(!brokenPage.status.textContent.includes('Offline play ready'));
  assert(brokenPage.status.textContent.includes('retry'));

  let failedInstall;
  broken.handlers.install({waitUntil: promise => { failedInstall = promise; }});
  await assert.rejects(failedInstall);
  const failedMessages = [];
  let failedPreparation;
  broken.handlers.message({
    data: {type: 'PREPARE_OFFLINE'},
    ports: [{postMessage: message => failedMessages.push(message), close() {}}],
    waitUntil: promise => { failedPreparation = promise; }
  });
  await failedPreparation;
  assert(failedMessages.some(message => message.type === 'error'));
  assert(!failedMessages.some(message => message.type === 'complete'), 'partial cache is never reported ready');
  console.log(`PASS offline shell: ${shellPaths.length} files present and reported ready`);
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
