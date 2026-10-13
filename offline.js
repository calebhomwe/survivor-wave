'use strict';

(() => {
  const VERSION = 'survivor-wave-shell-v2';
  const button = document.getElementById('prepareOffline');
  const status = document.getElementById('offlineStatus');
  if (!button || !status) return;

  if (!window.isSecureContext || !('serviceWorker' in navigator)) {
    button.disabled = true;
    status.textContent = 'Offline preparation requires HTTPS or localhost.';
    return;
  }

  const scriptUrl = new URL('./sw.js', location.href);
  const scope = new URL('./', location.href).pathname;
  const waitFor = (promise, timeoutMs) => new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timed out')), timeoutMs);
    Promise.resolve(promise).then(value => {
      clearTimeout(timeout);
      resolve(value);
    }, error => {
      clearTimeout(timeout);
      reject(error);
    });
  });

  status.textContent = 'Press to cache and verify the game files while online.';

  button.addEventListener('click', async () => {
    button.disabled = true;
    status.textContent = 'Preparing offline play…';
    try {
      const registration = await waitFor(
        navigator.serviceWorker.register(scriptUrl, {scope}),
        25000
      );
      const readyRegistration = await waitFor(navigator.serviceWorker.ready, 25000);
      const worker = readyRegistration.active || registration.active;
      if (!worker) throw new Error('No active service worker');

      await waitFor(new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        const finish = (error, value) => {
          channel.port1.close();
          try {
            channel.port2.close();
          } catch (_) {}
          if (error) reject(error);
          else resolve(value);
        };
        channel.port1.onmessage = event => {
          const message = event.data || {};
          if (message.version && message.version !== VERSION) {
            finish(new Error('Refresh the page to update offline support.'));
          } else if (message.type === 'progress') {
            status.textContent = `Preparing offline play (${message.completed}/${message.total})…`;
          } else if (message.type === 'complete') {
            status.textContent = `Offline play ready: ${message.total} game files cached.`;
            finish();
          } else if (message.type === 'error') {
            finish(new Error('Cache incomplete'));
          }
        };
        try {
          worker.postMessage({type: 'PREPARE_OFFLINE'}, [channel.port2]);
        } catch (error) {
          finish(error);
        }
      }), 25000);
    } catch (_) {
      status.textContent = 'Offline preparation did not complete. Stay online and retry.';
    } finally {
      button.disabled = false;
    }
  });
})();
