'use strict';

const CACHE_NAME = 'survivor-wave-shell-v1';
const CACHE_PREFIX = 'survivor-wave-shell-';
const CACHE_PATHS = [
  'survivor-wave.html',
  'manifest.webmanifest',
  'offline.js',
  'assets/app-icon.svg',
  'assets/fonts/baloo2-latin.woff2',
  'assets/fonts/luckiestguy.woff2',
  'assets/music/theme.mp3',
  'assets/particles/dust.png',
  'assets/particles/ember.png',
  'assets/particles/puff.png',
  'assets/particles/smoke.png',
  'assets/particles/spark.png',
  'assets/particles/star.png',
  'assets/sfx/boom.wav',
  'assets/sfx/buzz.wav',
  'assets/sfx/coin.wav',
  'assets/sfx/hit.wav',
  'assets/sfx/jump.wav',
  'assets/sfx/levelup.wav',
  'assets/sfx/lose.wav',
  'assets/sfx/pop.wav',
  'assets/sfx/tap.wav',
  'assets/sfx/tick.wav',
  'assets/sfx/whoosh.wav',
  'assets/sfx/win.wav',
  'assets/sfx2/boom.mp3',
  'assets/sfx2/buzz.mp3',
  'assets/sfx2/coin.mp3',
  'assets/sfx2/hit.mp3',
  'assets/sfx2/jump.mp3',
  'assets/sfx2/levelup.mp3',
  'assets/sfx2/lose.mp3',
  'assets/sfx2/pop.mp3',
  'assets/sfx2/tap.mp3',
  'assets/sfx2/tick.mp3',
  'assets/sfx2/whoosh.mp3',
  'assets/sfx2/win.mp3',
  'assets/survivor/grass.png',
  'assets/survivor/hero.png',
  'assets/survivor/hero2.png',
  'assets/survivor/hero_engi.png',
  'assets/survivor/hero_medic.png',
  'assets/survivor/hero_scout.png',
  'assets/survivor/hero_scout2.png',
  'assets/survivor/hero_soldier.png',
  'assets/survivor/hero_soldier2.png'
];
const CACHE_URLS = CACHE_PATHS.map(path => new URL(path, self.registration.scope).href);
const CACHE_URL_SET = new Set(CACHE_URLS);
const PREPARE_TIMEOUT_MS = 20000;

async function cacheFile(cache, url, deadline) {
  if (await cache.match(url)) return;

  const remaining = deadline - Date.now();
  if (remaining <= 0) throw new Error('Preparation timed out');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), remaining);
  try {
    const response = await fetch(new Request(url, {cache: 'reload', signal: controller.signal}));
    if (!response.ok || response.type === 'opaque') throw new Error('Asset unavailable');
    await cache.put(url, response);
  } finally {
    clearTimeout(timeout);
  }
}

async function prepareCache(report) {
  const cache = await caches.open(CACHE_NAME);
  const deadline = Date.now() + PREPARE_TIMEOUT_MS;
  let completed = 0;
  const failures = [];

  await Promise.all(CACHE_URLS.map(async url => {
    try {
      await cacheFile(cache, url, deadline);
    } catch (_) {
      failures.push(url);
    } finally {
      completed++;
      try {
        report({completed, total: CACHE_URLS.length});
      } catch (_) {}
    }
  }));

  const missing = [];
  await Promise.all(CACHE_URLS.map(async url => {
    if (!await cache.match(url)) missing.push(url);
  }));
  if (failures.length || missing.length) throw new Error('Offline cache is incomplete');
  return CACHE_URLS.length;
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    await prepareCache(() => {});
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const oldCaches = (await caches.keys()).filter(name =>
      name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME
    );
    await Promise.all(oldCaches.map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (!event.data || event.data.type !== 'PREPARE_OFFLINE' || !event.ports || !event.ports[0]) return;
  const port = event.ports[0];
  event.waitUntil((async () => {
    try {
      const total = await prepareCache(progress => port.postMessage({type: 'progress', ...progress}));
      port.postMessage({type: 'complete', version: CACHE_NAME, total});
    } catch (_) {
      port.postMessage({type: 'error', version: CACHE_NAME});
    } finally {
      port.close();
    }
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('range')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  url.search = '';
  url.hash = '';
  const key = url.href;
  if (!CACHE_URL_SET.has(key)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(key) || fetch(request);
  })());
});
