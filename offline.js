'use strict';

(() => {
  const VERSION = 'survivor-wave-shell-v1';
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
  const registrationPromise = navigator.serviceWorker.register(scriptUrl, {scope});
  registrationPromise.then(() => {
    if (!button.disabled) status.textContent = 'Press to cache and verify the game files while online.';
  }).catch(() => {
    status.textContent = 'Could not start offline preparation. Check the connection and retry.';
  });

  button.addEventListener('click', async () => {
    button.disabled = true;
    status.textContent = 'Preparing offline play…';
    try {
      await registrationPromise;
      const registration = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timed out')), 25000);
        navigator.serviceWorker.ready.then(value => {
          clearTimeout(timeout);
          resolve(value);
        }, error => {
          clearTimeout(timeout);
          reject(error);
        });
      });
      const worker = registration.active;
      if (!worker) throw new Error('No active service worker');

      await new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        const finish = (error, value) => {
          clearTimeout(timeout);
          channel.port1.close();
          if (error) reject(error);
          else resolve(value);
        };
        const timeout = setTimeout(() => finish(new Error('Timed out')), 25000);
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
      });
    } catch (_) {
      status.textContent = 'Offline preparation did not complete. Stay online and retry.';
    } finally {
      button.disabled = false;
    }
  });
})();
