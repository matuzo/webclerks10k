import './modules/lazyload.js';
import './modules/offcanvas.js';
import './modules/tabs.js';
import './modules/modal.js';
import InlineSVG from './modules/svg.js';

const Promise = require('es6-promise').Promise;

const FontFaceObserver = require('fontfaceobserver');

/**
 * Controller für die gesamte Website
 */
class IndexController {

  // Funktionen, die beim Laden ausgeführt werden sollen
  constructor() {
    console.log('IndexController');

    // Sicher gehen, dass nur einmal refreshed wird
    // Workaround für einen Bug in "force update on reload" (Chrome Feature).
    this.refreshing = false;

    this.cloneLogo();
    this.loadFonts();
    this.loadSVGIcons();
  }

  init() {
    console.log('main.js');
  }

  loadFonts() {
    console.log('Loading Fonts');

    if (!localStorage.getItem('fontsLoaded')) {
      const font = new FontFaceObserver('open_sansregular');

      font.load().then(() => {
        console.log('Font is available');
        document.querySelector('html').classList.add('fonts-loaded');
        localStorage.setItem('fontsLoaded', 'true');
      }, () => {
        console.log('Font is not available');
      });
    }
  }

  // Service Worker registrieren
  registerServiceWorker() {
    console.log(navigator);
    // Abbrechen, wenn der Browser ServiceWorker nicht beherrscht
    if (!navigator.serviceWorker) return;

    // Service Worker (SW) registrieren
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Service Worker fertig registiert');

      const index = this;

      // Der Service Worker ist jetzt installiert
      // Folgend kommt der Code der sich darum kümmert, was passiert,
      // wenn es einen neueren SW gibt, der "waiting" ist

      // Wenn es keinen aktiven Service Worker gibt, gibt es auch keinen wartenden.
      // => also abbrechen
      if (!navigator.serviceWorker.controller) {
        return;
      }

      // Wenn es einen wartenden SW gibt
      // (update ready)
      if (reg.waiting) {
        // Legt fest, was passieren soll, wenn es einen wartenden SW gibt.
        index.updateReady(reg.waiting);
        return;
      }

      // Für den Fall, dass es keinen wartenden ServiceWorker gibt,
      // aber gerade einer installiert wird
      // (update in progress)
      if (reg.installing) {
        // Wartet bis der neue SW fertig installiert ist und
        // ruft dann updateReady auf
        index.trackInstalling(reg.installing);
        return;
      }

      // Falls es keinen wartenden SW gibt, keiner installiert wird
      // aber irgendwann später einer dazukommt
      reg.addEventListener('updatefound', () => {
        console.info('Service Worker Update gefunden');
        // Wartet bis der neue SW fertig installiert ist und
        // ruft dann updateReady auf
        index.trackInstalling(reg.installing);
      });

      if (document.querySelector('html').classList.contains('offline')) {
        this.sendMessage(navigator.serviceWorker.controller, { action: 'getCachedPages' }).then((data) => {
          const offlinePages = document.createElement('ul');
          for (let i = 0; i < data.length; i++) {
            const offlinePage = document.createElement('li');
            offlinePage.innerHTML = `<a href="${data[i]}">${data[i]}</a>`;
            offlinePages.appendChild(offlinePage);
          }

          document.querySelector('.js-offline-pages').appendChild(offlinePages);
        }).catch((error) => {
          console.log(error);
        });
      }
    }).catch((error) => {
      console.log(error);
    });


    // Nach self.skipWaiting(), wenn der neue SW aktiviert worden ist,
    // soll die Seite neu geladen werden
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      this.refreshPage();
    });
  }

  sendMessage(worker, message) {
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      worker.postMessage(message, [messageChannel.port2]);
    });
  }

  updateReady(worker) {
    console.log('Neuer Service Worker verfügbar');

    // Info an den User, dass es eine neue verfügbare Version gibt
    const swInfoBar = document.createElement('div');
    swInfoBar.classList.add('bar', 'bar__info');
    let infoMessage = 'Es gibt eine neue Version der Website.';
    infoMessage += '<button class="btn js-btn-refresh">Aktualisieren</button>';

    swInfoBar.innerHTML = infoMessage;
    document.body.appendChild(swInfoBar);

    // Wenn der Refresh-Button geclicked wird
    document.querySelector('.js-btn-refresh').addEventListener('click', () => {
      // Info an sw.js schicken was er machen soll
      // In diesem Fall "skipWaiting", also vom aktiven SW zum neuen, wartenden SW wechseln
      worker.postMessage({ action: 'skipWaiting' });
    });
  }

  refreshPage() {
    if (this.refreshing) return;
    console.log('Seite wird neu geladen');
    window.location.reload();
    this.refreshing = true;
  }

  trackInstalling(worker) {
    const index = this;

    // Wenn sich der Zustand des SW ändert
    worker.addEventListener('statechange', () => {
      // Wenn erfolgreich installiert
      if (worker.state === 'installed') {
        // SW updaten
        index.updateReady(worker);
      }
    });
  }

  cloneLogo() {
    const logo = document.querySelector('.js-logo');
    const secondLogo = logo.cloneNode(true);
    secondLogo.classList.add('logo--clone');
    secondLogo.classList.add('js-logo-clone');
    document.querySelector('.js-site-content-featured').appendChild(secondLogo);
  }

  loadSVGIcons() {
    const inlineSVG = new InlineSVG(); // eslint-disable-line
  }
}

const main = new IndexController();
main.init();
main.registerServiceWorker();
