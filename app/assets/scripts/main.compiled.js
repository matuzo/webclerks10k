/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(8);
	var _svg = __webpack_require__(9);var _svg2 = _interopRequireDefault(_svg);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
	
	var Promise = __webpack_require__(5).Promise;
	
	var FontFaceObserver = __webpack_require__(10);
	
	/**
	                                                     * Controller für die gesamte Website
	                                                     */var
	IndexController = function () {
	
	  // Funktionen, die beim Laden ausgeführt werden sollen
	  function IndexController() {_classCallCheck(this, IndexController);
	    console.log('IndexController');
	
	    // Sicher gehen, dass nur einmal refreshed wird
	    // Workaround für einen Bug in "force update on reload" (Chrome Feature).
	    this.refreshing = false;
	
	    this.cloneLogo();
	    this.loadFonts();
	    this.loadSVGIcons();
	  }_createClass(IndexController, [{ key: 'init', value: function init()
	
	    {
	      console.log('main.js');
	    } }, { key: 'loadFonts', value: function loadFonts()
	
	    {
	      console.log('Loading Fonts');
	
	      if (!localStorage.getItem('fontsLoaded')) {
	        var font = new FontFaceObserver('open_sansregular');
	
	        font.load().then(function () {
	          console.log('Font is available');
	          document.querySelector('html').classList.add('fonts-loaded');
	          localStorage.setItem('fontsLoaded', 'true');
	        }, function () {
	          console.log('Font is not available');
	        });
	      }
	    }
	
	    // Service Worker registrieren
	  }, { key: 'registerServiceWorker', value: function registerServiceWorker() {var _this = this;
	      console.log(navigator);
	      // Abbrechen, wenn der Browser ServiceWorker nicht beherrscht
	      if (!navigator.serviceWorker) return;
	
	      // Service Worker (SW) registrieren
	      navigator.serviceWorker.register('/sw.js').then(function (reg) {
	        console.log('Service Worker fertig registiert');
	
	        var index = _this;
	
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
	        reg.addEventListener('updatefound', function () {
	          console.info('Service Worker Update gefunden');
	          // Wartet bis der neue SW fertig installiert ist und
	          // ruft dann updateReady auf
	          index.trackInstalling(reg.installing);
	        });
	
	        if (document.querySelector('html').classList.contains('offline')) {
	          _this.sendMessage(navigator.serviceWorker.controller, { action: 'getCachedPages' }).then(function (data) {
	            var offlinePages = document.createElement('ul');
	            for (var i = 0; i < data.length; i++) {
	              var offlinePage = document.createElement('li');
	              offlinePage.innerHTML = '<a href="' + data[i] + '">' + data[i] + '</a>';
	              offlinePages.appendChild(offlinePage);
	            }
	
	            document.querySelector('.js-offline-pages').appendChild(offlinePages);
	          }).catch(function (error) {
	            console.log(error);
	          });
	        }
	      }).catch(function (error) {
	        console.log(error);
	      });
	
	
	      // Nach self.skipWaiting(), wenn der neue SW aktiviert worden ist,
	      // soll die Seite neu geladen werden
	      navigator.serviceWorker.addEventListener('controllerchange', function () {
	        _this.refreshPage();
	      });
	    } }, { key: 'sendMessage', value: function sendMessage(
	
	    worker, message) {
	      return new Promise(function (resolve, reject) {
	        var messageChannel = new MessageChannel();
	        messageChannel.port1.onmessage = function (event) {
	          if (event.data.error) {
	            reject(event.data.error);
	          } else {
	            resolve(event.data);
	          }
	        };
	        worker.postMessage(message, [messageChannel.port2]);
	      });
	    } }, { key: 'updateReady', value: function updateReady(
	
	    worker) {
	      console.log('Neuer Service Worker verfügbar');
	
	      // Info an den User, dass es eine neue verfügbare Version gibt
	      var swInfoBar = document.createElement('div');
	      swInfoBar.classList.add('bar', 'bar__info');
	      var infoMessage = 'Es gibt eine neue Version der Website.';
	      infoMessage += '<button class="btn js-btn-refresh">Aktualisieren</button>';
	
	      swInfoBar.innerHTML = infoMessage;
	      document.body.appendChild(swInfoBar);
	
	      // Wenn der Refresh-Button geclicked wird
	      document.querySelector('.js-btn-refresh').addEventListener('click', function () {
	        // Info an sw.js schicken was er machen soll
	        // In diesem Fall "skipWaiting", also vom aktiven SW zum neuen, wartenden SW wechseln
	        worker.postMessage({ action: 'skipWaiting' });
	      });
	    } }, { key: 'refreshPage', value: function refreshPage()
	
	    {
	      if (this.refreshing) return;
	      console.log('Seite wird neu geladen');
	      window.location.reload();
	      this.refreshing = true;
	    } }, { key: 'trackInstalling', value: function trackInstalling(
	
	    worker) {
	      var index = this;
	
	      // Wenn sich der Zustand des SW ändert
	      worker.addEventListener('statechange', function () {
	        // Wenn erfolgreich installiert
	        if (worker.state === 'installed') {
	          // SW updaten
	          index.updateReady(worker);
	        }
	      });
	    } }, { key: 'cloneLogo', value: function cloneLogo()
	
	    {
	      var logo = document.querySelector('.js-logo');
	      var secondLogo = logo.cloneNode(true);
	      secondLogo.classList.add('logo--clone');
	      secondLogo.classList.add('js-logo-clone');
	      document.querySelector('.js-site-content-featured').appendChild(secondLogo);
	    } }, { key: 'loadSVGIcons', value: function loadSVGIcons()
	
	    {
	      var inlineSVG = new _svg2.default(); // eslint-disable-line
	    } }]);return IndexController;}();
	
	
	var main = new IndexController();
	main.init();
	main.registerServiceWorker();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var LazyLoadController = function () {
	  function LazyLoadController() {var parent = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];_classCallCheck(this, LazyLoadController);
	    // console.log('LazyLoadController');
	
	    // Alle Bilder die lazy geloaded gehören
	    // const imageContainers = parent.querySelectorAll('[data-loadimg]');
	    var imageContainers = parent.querySelectorAll('[data-src]');
	    // const src = imageContainers.getAttribute('data-src');
	
	    // Bilder durchlaufen
	    for (var i = 0; i < imageContainers.length; i++) {
	      var imageContainer = imageContainers[i];
	      // Bildpfad holen
	      var imagePath = imageContainer.getAttribute('data-src');
	      var srcSet = imageContainer.getAttribute('data-srcset');
	      var classes = imageContainer.getAttribute('data-classes');
	      var alt = imageContainer.getAttribute('data-alt');
	
	      // picture Element erstellen
	      var picture = document.createElement('picture');
	      picture.classList.add(classes);
	
	      var sourceWebp = document.createElement('source');
	      sourceWebp.setAttribute('type', 'image/webp');
	      sourceWebp.setAttribute('srcset', imagePath.replace(new RegExp('jpg', 'g'), 'webp'));
	
	      var sourceJpg = document.createElement('source');
	
	      if (srcSet) {
	        sourceWebp.setAttribute('srcset', srcSet.replace(new RegExp('jpg', 'g'), 'webp'));
	        sourceWebp.setAttribute('sizes', '100%');
	
	        sourceJpg.setAttribute('srcset', srcSet);
	        sourceJpg.setAttribute('sizes', '100%');
	      }
	
	      picture.appendChild(sourceWebp);
	
	      if (srcSet) {
	        picture.appendChild(sourceJpg);
	      }
	
	
	      // img Element erstellen, Attribute vergeben
	      var loadedImg = document.createElement('img');
	      loadedImg.setAttribute('src', imagePath);
	
	      loadedImg.setAttribute('alt', alt);
	
	      picture.appendChild(loadedImg);
	
	
	      // img Element in Dom einfügen
	      if (imageContainer.querySelector('.js-lazy-imagelink')) {
	        imageContainer.querySelector('.js-lazy-imagelink').appendChild(picture);
	      } else {
	        imageContainer.appendChild(picture);
	      }
	
	      if (imagePath.indexOf('webclerks_logo.svg') !== -1) {
	        imageContainer.classList.add('ft__imgct--webclerks');
	      }
	
	      imageContainer.classList.add('art__imgct--image-loaded');
	    }
	  }_createClass(LazyLoadController, [{ key: 'init', value: function init()
	
	    {
	      console.log('Starting to lazy load images');
	    } }]);return LazyLoadController;}();
	
	
	var Lazyload = new LazyLoadController();
	Lazyload.init();exports.default =
	
	LazyLoadController;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var OffCanvasController = function () {
	
	  function OffCanvasController() {_classCallCheck(this, OffCanvasController);
	    console.log('OffCanvasController');
	
	    // Alle Elemente die off canvas sind
	    // und per default aria hidden und nicht mit Tab fokussier sein sollen
	    this.items = document.querySelectorAll('.js-offcanvas');
	    // Elemente verstecken
	    for (var i = 0; i < this.items.length; i++) {
	      this.a11yHide(this.items[i]);
	    }
	
	    // Hauptbereiche der Website
	    this.page = document.querySelector('.js-page');
	    this.siteContent = document.querySelector('.js-site-content');
	    this.siteFooter = document.querySelector('.js-site-footer');
	    this.navMain = document.querySelector('.js-nav-main');
	
	    // Flag ob die Elemente gerade sichtbar sind oder nicht
	    this.itemsVisible = false;
	
	    // Toggle und Close buttons erstellen und in DOM einfügen
	    this.createButtons();
	    // Eventlistener hinzufügen
	    this.addEvents();
	
	    // this.openNav = this.openNav.bind(this);
	  }_createClass(OffCanvasController, [{ key: 'createButtons', value: function createButtons()
	
	    {
	      // Buttons erstellen
	      this.closeButton = document.createElement('button');
	      this.toggleButton = document.createElement('button');
	
	      // Text und Klassen hinzufügen
	      this.closeButton.classList.add('btn');
	      this.closeButton.classList.add('btn__close-offcanvas');
	      this.closeButton.classList.add('js-close-offcanvas');
	      this.closeButton.innerHTML = '<span class="icon icon--close svg-close">\n                                    <span class="btn__text">\n                                        CLOSE\n                                    </span>\n                                   </span>';
	
	
	
	
	
	      this.toggleButton.classList.add('btn');
	      this.toggleButton.classList.add('btn__close-offcanvas');
	      this.toggleButton.classList.add('js-toggle-offcanvas');
	      this.toggleButton.innerHTML = '<span class="icon icon--burger svg-burger">\n                                    <span class="btn__text">\n                                        MENU\n                                    </span>\n                                   </span>';
	
	
	
	
	
	
	      // Toggle button in main einfügen
	      this.siteContent.insertBefore(this.toggleButton, this.siteContent.firstChild);
	      // Schließen button in die main nav einfügen
	      this.navMain.appendChild(this.closeButton);
	    } }, { key: 'addEvents', value: function addEvents()
	
	    {var _this = this;
	      // Toggle Elements
	      this.toggleButton.addEventListener('click', function () {return _this.toggleNav();});
	      // Close Elements
	      this.closeButton.addEventListener('click', function () {return _this.closeNav();});
	
	      // Manage key events
	      document.addEventListener('keydown', function (event) {return _this.keyEvents(event);});
	
	      // Open Elements
	      var firstLinkInNav = this.navMain.querySelector('.nav__main__item a:first-child');
	      firstLinkInNav.addEventListener('focus', function () {return _this.openContentInfo();});
	
	      // Close Elements
	      var lastLinkInFooter = this.siteFooter.querySelector('.js-last-focus');
	      lastLinkInFooter.addEventListener('blur', function () {return _this.closeContentInfo();});
	
	      document.querySelector('.js-skip-link-nav').addEventListener('click', function () {return _this.openNav();});
	    }
	
	    // Navigation aus- oder einblenden
	  }, { key: 'toggleNav', value: function toggleNav() {
	      if (this.itemsVisible) {
	        this.closeNav();
	        return;
	      }
	
	      this.openNav();
	    } }, { key: 'closeNav', value: function closeNav()
	
	    {
	      // Elemente verstecken
	      this.hideItems();
	      // Fokus auf Hauptinhalt setzen
	      this.siteContent.setAttribute('tabindex', -1);
	      this.siteContent.focus();
	      document.querySelector('.js-logo-clone').classList.remove('logo--hidden');
	    } }, { key: 'openNav', value: function openNav()
	
	    {
	      // Elemente zeigen
	      this.showItems();
	      // Fokus auf Hauptnavigation setzen
	      this.navMain.setAttribute('tabindex', -1);
	      this.navMain.focus();
	      document.querySelector('.js-logo-clone').classList.add('logo--hidden');
	    }
	
	    // Elemente zeigen
	  }, { key: 'showItems', value: function showItems() {
	      // Elemente sichtbar
	      this.itemsVisible = true;
	
	      // Alle unsichtbaren Elemente durchlaufen
	      for (var i = 0; i < this.items.length; i++) {
	        var item = this.items[i];
	        // Elemente a11y sichtbar machen
	        this.a11yShow(item);
	        // Elemente visuell sichtbar machen
	        item.classList.remove('offcanvas--hidden');
	      }
	
	      // Elemente einblenden
	      this.page.classList.add('page--navvisible');
	      document.querySelector('.js-site-header').classList.add('site__header--open');
	    }
	
	    // Elemente verstecken
	  }, { key: 'hideItems', value: function hideItems() {
	      // Elemente unsichtbar
	      this.itemsVisible = false;
	
	      // Alle sichtbaren Elemente durchlaufen
	      for (var i = 0; i < this.items.length; i++) {
	        var item = this.items[i];
	        // Elemente a11y verstecken
	        this.a11yHide(item);
	        // Elemente visuell verstecken
	        item.classList.add('offcanvas--hidden');
	      }
	
	      // Elemente ausblenden
	      this.page.classList.remove('page--navvisible');
	    }
	
	    // Elemente a11y verstecken
	  }, { key: 'a11yHide', value: function a11yHide(item) {
	      item.setAttribute('aria-hidden', true);
	    }
	
	    // Elemente a11y zeigen
	  }, { key: 'a11yShow', value: function a11yShow(item) {
	      item.removeAttribute('aria-hidden');
	    } }, { key: 'openContentInfo', value: function openContentInfo()
	
	    {
	      if (!this.itemsVisible) {
	        // Elemente zeigen
	        this.showItems();
	        // Fokus auf Footer setzen
	        this.navMain.setAttribute('tabindex', -1);
	        this.navMain.focus();
	      }
	    } }, { key: 'closeContentInfo', value: function closeContentInfo()
	
	    {
	      if (this.itemsVisible) {
	        // Elemente verstecken
	        this.hideItems();
	        this.navMain.removeAttribute('tabindex');
	      }
	    }
	
	    // Elemente per Esc schließen
	  }, { key: 'keyEvents', value: function keyEvents(e) {
	      if (e.keyCode === 27) {
	        this.closeNav();
	      }
	    } }]);return OffCanvasController;}();
	
	
	var offcanvas = new OffCanvasController();exports.default =
	
	offcanvas;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _utils = __webpack_require__(4);var u = _interopRequireWildcard(_utils);
	var _lazyload = __webpack_require__(1);var _lazyload2 = _interopRequireDefault(_lazyload);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
	
	var Promise = __webpack_require__(5).Promise;
	
	/**
	                                               * Controller für die Navigation über Tabs
	                                               */var
	TabsController = function () {
	  // Funktionen, die beim Laden ausgeführt werden sollen
	  function TabsController(options) {var _this = this;_classCallCheck(this, TabsController);
	    console.log('TabsController');
	
	    // Alle Tabs auf der aktuellen Seite
	    this.tabs = document.querySelectorAll('.js-tab');
	
	    // Defaulteinstellungen
	    // apiPath: Url von der die Daten kommen
	    // apiParameters: Parameter für Rest Api bzw. Pfad
	    // template: Normale Seite oder News
	    this.defaults = {
	      apiPath: '/',
	      apiParameters: '',
	      template: 'page' };
	
	
	    // Defaulteinstellungen mit übergebenen Optionen mergen
	    this.options = _extends({}, this.defaults, options);
	
	    // Wenn News, gleich die Daten aus der API holen
	    if (this.options.template === 'news') {
	      // Erst, wenn die Daten fertig geladen sind, Eventlistener hinzufügen
	      this.loadData().then(function (contents) {
	        _this.contents = contents;
	        _this.addEvents();
	      });
	      // Wenn nicht News, Daten erst bei Auswahl des Tabs laden
	      // Also Eventlistener gleich hinzufügen
	    } else {
	      this.addEvents();
	    }
	
	    // Aktueller Tab
	    var currentTab = document.querySelector('.nav__tabs__link--active');
	    // Index des aktuellen tabs
	    this.currentTabIndex = currentTab.getAttribute('data-tab');
	    // Klasse der aktuellen Seite
	    this.currentPage = currentTab.getAttribute('data-name');
	
	    this.setHeadlines();
	
	    this.lastScrollPos = 0;
	  }_createClass(TabsController, [{ key: 'init', value: function init()
	
	    {
	      console.log('Tabs initialisiert');
	    }
	
	    // Daten per AJAX laden
	  }, { key: 'loadData', value: function loadData() {var _this2 = this;
	      return new Promise(function (resolve, reject) {
	        u.get(_this2.options.apiPath + _this2.options.apiParameters).then(function (content) {
	          console.log('Content loaded successfully');
	          resolve(content);
	        }, function (error) {
	          reject(error);
	        });
	      });
	    }
	
	    // Eventlistener hinzufügen
	  }, { key: 'addEvents', value: function addEvents() {var _this3 = this;
	      for (var i = 0; i < this.tabs.length; i++) {
	        var tab = this.tabs[i];
	        // Bei Click auf Tab
	        tab.addEventListener('click', function (event) {return _this3.clickEvent(event);});
	        // Wenn der Tab mit einer Tast ausgewählt wurde
	        tab.addEventListener('keydown', function (event) {return _this3.keyEvents(event);});
	      }
	
	      // Event Details bei click zeigen
	      var articleLinks = document.querySelectorAll('.js-article-link');var _loop = function _loop(
	      _i) {
	        var article = articleLinks[_i];
	        var data = JSON.parse(_this3.contents).filter(function (content) {return content.slug === article.parentNode.getAttribute('id');});
	
	        article.addEventListener('click', function (e) {
	          _this3.showFeaturedNews(e, data[0]);
	        });};for (var _i = 0; _i < articleLinks.length; _i++) {_loop(_i);
	      }
	    } }, { key: 'clickEvent', value: function clickEvent(
	
	    e) {
	      e.preventDefault();
	      // Aktueller Link
	      var target = e.target;
	
	      // Wenn span in Link geklickt wird
	      if (target.tagName === 'SPAN') {
	        // Link selektieren
	        target = e.target.parentNode;
	      }
	
	      // Tabindex aktualisieren
	      this.currentTabIndex = target.getAttribute('data-tab');
	      // Neuen Tab aktivieren
	      this.setActiveTab();
	    } }, { key: 'keyEvents', value: function keyEvents(
	
	    e) {
	      e.stopPropagation();
	      // Bei Taste links, Tabindex verringern
	      if (e.keyCode === 37) {
	        this.currentTabIndex--;
	      }
	
	      // Bei Taste rechts, Tabindex erhöhen
	      if (e.keyCode === 39) {
	        this.currentTabIndex++;
	      }
	
	      // Wenn am letzten Tab, auf den ersten springen
	      if (this.currentTabIndex === this.tabs.length) {
	        this.currentTabIndex = 0;
	      }
	
	      // Wenn am ersten Tab, auf den letzten springen
	      if (this.currentTabIndex === -1) {
	        this.currentTabIndex = this.tabs.length - 1;
	      }
	
	      // Neuen Tab aktivieren, wenn links oder rechts gedrückt wurde
	      if (e.keyCode === 39 || e.keyCode === 37) {
	        this.setActiveTab();
	      }
	    }
	
	    // Neuen Tab aktivieren
	  }, { key: 'setActiveTab', value: function setActiveTab() {
	      // Aktueller Tab
	      var currentTab = document.querySelector('.nav__tabs__link--active');
	
	      // Nicht auswählbar machen
	      currentTab.setAttribute('tabindex', -1);
	      currentTab.setAttribute('aria-selected', false);
	
	      // Aktiv Klasse entfernen
	      currentTab.classList.remove('nav__tabs__link--active');
	
	      // Neuer Tab
	      var newTab = this.tabs[this.currentTabIndex];
	      // Auswählbar machen
	      newTab.setAttribute('tabindex', 0);
	      newTab.setAttribute('aria-selected', true);
	      // Fokussieren
	      newTab.focus();
	      // Aktiv Klasse hinzufügen
	      newTab.classList.add('nav__tabs__link--active');
	      // Neuer Name der page
	      var newPage = newTab.getAttribute('data-name');
	
	      document.querySelector('html').classList.remove(this.currentPage);
	      document.querySelector('html').classList.add(newPage);
	
	      this.currentPage = newPage;
	
	      // Inhalt laden
	      this.loadTabContent(newTab);
	    }
	
	    // Inhalt laden
	  }, { key: 'loadTabContent', value: function loadTabContent(activeTab) {var _this4 = this;
	      // Url ändern
	      this.changeUrl(activeTab);
	
	      // Wenn News, die Daten zuerst je nach Tab filtern
	      if (this.options.template === 'news') {
	        this.filterNewsByCategory().then(function (contents) {
	          // News nach dem filtern ausgeben
	          console.log(contents);
	          _this4.showNews(contents);
	        }).catch(function (err) {
	          console.log(err);
	          document.querySelector('.js-site-content-main').textContent = 'Sorry, but you are offline :(';
	        });
	        // Wenn nicht News
	      } else {
	        // Vom aktuellen Tab den Pfad holen
	        this.options.apiPath = activeTab.getAttribute('href');
	
	        // Die Daten laden
	        this.loadData().then(function (contents) {
	          // Temporär div erstellen und mit dem geholten HTMLString befüllen
	          var temp = document.createElement('div');
	          temp.innerHTML = contents;
	          // Aus den geholten Daten nur die Main Inhalte holen
	          var pageContent = temp.querySelector('.js-site-content-main').innerHTML;
	          // Aus den geholten Daten nur die Featured Inhalte holen
	          var pageFeatured = temp.querySelector('.js-featured-cards-inner').innerHTML;
	          // Seite anzeigen
	          _this4.showPage(pageContent, pageFeatured);
	        });
	      }
	    }
	
	    // Url ändern
	  }, { key: 'changeUrl', value: function changeUrl(activeTab) {
	      // Url des aktuellen Tabs holen
	      this.link = activeTab.getAttribute('href');
	
	      // In History pushen
	      history.pushState(this.link, null, this.link);
	    }
	
	    // Seite anzeigen
	  }, { key: 'showPage', value: function showPage(content, featured) {
	      // Neue Inhalte ins HTML einfügen
	      var sectionContent = document.querySelector('.js-site-content-main');
	      sectionContent.innerHTML = content;
	
	      var lazyloadSectionContent = new _lazyload2.default(sectionContent);
	
	      var sectionFeatured = document.querySelector('.js-featured-cards-inner');
	      sectionFeatured.innerHTML = featured;
	
	      var lazyloadFeaturedContent = new _lazyload2.default(sectionFeatured);
	    }
	
	    // News anzeigen
	  }, { key: 'showNews', value: function showNews(contents) {var _this5 = this;
	      var parent = document.querySelector('.js-site-content-main');
	      // Aktuelle Inhalte leeren
	      parent.innerHTML = '';
	
	      // Headline austauschen
	      var headlineTemplate = this.buildHeadlineTemplate();
	      // Ins HTML einfügen
	      parent.appendChild(headlineTemplate);
	
	      // News abarbeiten und in HTML einfügen
	      contents.forEach(function (content) {
	        var contentTemplate = _this5.buildContentTemplate(content);
	        parent.appendChild(contentTemplate);
	      });
	
	      // Wenn fertig, Bilder lazyloaden
	      var lazyload = new _lazyload2.default(parent);
	      lazyload.init();
	
	      this.buildFeaturedTemplate(contents[0]);
	    } }, { key: 'showFeaturedNews', value: function showFeaturedNews(
	
	    e, data) {
	      e.preventDefault();
	      this.setHeadlines();
	      this.buildFeaturedTemplate(data);
	      this.toggleFeaturedNews();
	
	      var link = '/news/' + data._embedded['wp:term'][0][0]['slug'] + '/' + data.slug; // eslint-disable-line
	      history.pushState(link, null, link);
	    } }, { key: 'toggleFeaturedNews', value: function toggleFeaturedNews(
	
	    e) {
	      if (e) {
	        e.preventDefault();
	      }
	
	      var htmlClasses = document.querySelector('html').classList;
	
	      var scrollPos = 0;
	
	      if (!htmlClasses.contains('mobile-card')) {
	        this.lastScrollPos = document.body.scrollTop;
	      }
	
	      htmlClasses.toggle('mobile-card');
	
	      if (htmlClasses.contains('mobile-card')) {
	        scrollPos = 0;
	      } else {
	        scrollPos = this.lastScrollPos;
	      }
	
	      window.scrollTo(0, scrollPos);
	    }
	
	    // Headline in HTML verpacken
	  }, { key: 'buildHeadlineTemplate', value: function buildHeadlineTemplate() {
	      var html = document.createElement('h3');
	      html.textContent = this.contentHeadline;
	      html.classList.add('main-content__hl');
	
	      // html.setAttribute('tabindex', 0);
	
	      return html;
	    } }, { key: 'buildFeaturedTemplate', value: function buildFeaturedTemplate(
	
	    data) {var _this6 = this;
	      var sectionFeatured = document.querySelector('.js-featured-cards-inner');
	      sectionFeatured.innerHTML = '';
	
	      var headline = document.createElement('h3');
	      headline.setAttribute('tabindex', 0);
	      headline.classList.add('ft__hl');
	      headline.textContent = this.featuredHeadline;
	
	      sectionFeatured.appendChild(headline);
	
	      var card = document.createElement('div');
	      card.classList.add('ft__card');
	      card.classList.add('ft__card--card');
	
	      var image = '/assets/images/webclerks_logo.svg';
	      var imageClasses = 'ft__imgct ft__imgct--webclerks';
	      var altText = '';
	      var sizes = ['image285', 'image435', 'full'];
	      var srcset = [];
	
	      if (data._embedded['wp:featuredmedia']) {// eslint-disable-line
	        for (var i = 0; i < sizes.length; i++) {
	          if (data._embedded['wp:featuredmedia'][0].media_details.sizes[sizes[i]]) {// eslint-disable-line
	            var sizeFormat = data._embedded['wp:featuredmedia'][0].media_details.sizes[sizes[i]]; // eslint-disable-line
	            srcset.push(sizeFormat.source_url + ' ' + sizeFormat.width + 'w'); // eslint-disable-line
	
	            if (data._embedded['wp:featuredmedia'][0].media_details.sizes[sizes[0]]) {// eslint-disable-line
	              image = data._embedded['wp:featuredmedia'][0].media_details.sizes[sizes[0]].source_url; // eslint-disable-line
	            } else {
	              image = data._embedded['wp:featuredmedia'][0].media_details.sizes.thumb_small.source_url; // eslint-disable-line
	            }
	          }
	          altText = data._embedded['wp:featuredmedia'][0].alt_text; // eslint-disable-line
	        }
	        imageClasses = 'ft__imgct';
	      }
	
	
	      var categorySlug = data._embedded['wp:term'][0][0]['slug']; // eslint-disable-line
	
	      var output = '\n      <div class="' +
	      imageClasses + '" data-srcset="' + srcset.join(',') + '" data-src="' + image + '" data-classes="ft__img" data-alt="' + altText + '"></div>\n  \n      <div class="ft__ct">\n\n        <a href="/news/' +
	
	
	
	      categorySlug + '" class="ft__btn ft__btn--close btn--round btn--small js-article-close">\n          <span class="svg-close icon--close icon art__btn__icon">\n            <span class="visually-hidden">\n              Zurück zur Übersicht\n            </span>\n          </span>\n        </a>\n\n        <h4 class="ft__ct__hl">' +
	
	
	
	
	
	
	
	      data.title.rendered + '</h4>\n\n        ' +
	
	      data.content.rendered + '\n      </div>\n    ';
	
	
	
	      card.innerHTML = output;
	      card.querySelector('.js-article-close').addEventListener('click', function (e) {
	        _this6.toggleFeaturedNews(e);
	      });
	
	      sectionFeatured.appendChild(card);
	
	      var lazyload = new _lazyload2.default(sectionFeatured);
	      lazyload.init();
	    }
	
	    // Newsinhalte in HTML verpacken
	  }, { key: 'buildContentTemplate', value: function buildContentTemplate(data) {var _this7 = this;
	      var output = '';
	      var html = document.createElement('article');
	      var altText = '';
	      html.classList.add('art');
	      html.setAttribute('id', data.slug);
	      html.setAttribute('role', 'article');
	
	      if (data.acf.gesponsered) {
	        html.classList.add('art--sponsored');
	      }
	
	      var date = data.date;
	      var image = '/assets/images/webclerks_logo.svg';
	      var imageClasses = 'art__imgct art__imgct--webclerks';
	
	      if (data._embedded['wp:featuredmedia']) {// eslint-disable-line
	        image = data._embedded['wp:featuredmedia'][0].media_details.sizes.thumb_small.source_url; // eslint-disable-line
	        imageClasses = 'art__imgct';
	        altText = data._embedded['wp:featuredmedia'][0].alt_text; // eslint-disable-line
	      }
	
	      var categorySlug = data._embedded['wp:term'][0][0]['slug']; // eslint-disable-line
	      var link = '/news/' + categorySlug + '/' + data.slug;
	
	      output = '<a href="' + link + '" class="art__link js-article-link">\n                <div class="' +
	      imageClasses + '" data-src="' + image + '" data-classes="art__img" data-alt="' + altText + '"></div>\n                <h4 class="art__hl">\n                    ' +
	
	      data.title.rendered + '\n                </h4>\n                <p class="art__meta">\n                  von webclerks am\n                  <time datetime=\'' +
	
	
	
	      u.formattedDate(date, false, false, true, '-', true) + '\'>\n                    ' +
	      u.formattedDate(date, true) + '\n                  </time>\n                </p>\n              </a>';
	
	
	
	
	      if (data.acf.gesponsered) {
	        output += '<p class="art__sponsored"><span class="visually-hidden">Dieser Artikel wurde</span> gesponsert</p>';
	      }
	
	      html.innerHTML = output;
	      html.querySelector('.js-article-link').addEventListener('click', function (e) {
	        _this7.showFeaturedNews(e, data);
	      });
	
	      return html;
	    }
	
	    // Aktuell noch hardgecoded:
	  }, { key: 'setHeadlines', value: function setHeadlines() {
	      // Alle möglichen Kategorien
	      this.newsCategories = [2, 4, 3];
	
	      // Alle möglichen Headlines
	      var newsHeadline = ['Most current job offer', 'More projects', 'More industry news'];
	      var recentNewsHeadline = ['Most current job offer', 'Latest project', 'Latest industry news'];
	
	      // Aktuelle Headline setzen
	      this.contentHeadline = newsHeadline[this.currentTabIndex];
	      this.featuredHeadline = recentNewsHeadline[this.currentTabIndex];
	    }
	
	    // Je nach News, andere Inhalte zeigen
	  }, { key: 'filterNewsByCategory', value: function filterNewsByCategory() {var _this8 = this;
	      this.setHeadlines();
	      // Gefilterte News zurückgeeben
	      return new Promise(function (resolve) {
	        resolve(JSON.parse(_this8.contents).filter(function (news) {return news.categories[0] === _this8.newsCategories[_this8.currentTabIndex];}));
	      });
	    } }]);return TabsController;}();exports.default =
	
	
	TabsController;
	
	if (document.querySelector('html.news')) {
	  var tabs = new TabsController({
	    apiPath: 'https://content.webclerks.at/wp-json/wp/v2/posts',
	    apiParameters: '?_embed&filter[meta_key]=gesponsered&filter[orderby]=meta_value%20date&filter[order]=DESC&orderby=date&per_page=30',
	    template: 'news' });
	
	  tabs.init();
	}
	
	if (document.querySelector('html.meetups')) {
	  var _tabs = new TabsController();
	  _tabs.init();
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var get = function getRequest(url) {
	  // Return a new promise.
	  return new Promise(function (resolve, reject) {
	    // Do the usual XHR stuff
	    var req = new XMLHttpRequest();
	    req.open('GET', url);
	
	    req.onload = function () {
	      // This is called even on 404 etc
	      // so check the status
	      if (req.status === 200) {
	        // Resolve the promise with the response text
	        resolve(req.response);
	      } else {
	        // Otherwise reject with the status text
	        // which will hopefully be a meaningful error
	        reject(Error(req.statusText));
	      }
	    };
	
	    // Handle network errors
	    req.onerror = function () {
	      reject(Error('Network Error'));
	    };
	
	    // Make the request
	    req.send();
	  });
	};
	
	var leftPad = function leftPad(number) {
	  var string = number;
	
	  if (number < 10) {
	    string = '0' + number;
	  }
	
	  return string;
	};
	
	var formattedDate = function formatDate(rawDate) {var namedMonths = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];var time = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];var showDay = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];var customSeparator = arguments.length <= 4 || arguments[4] === undefined ? '.' : arguments[4];var yearFirst = arguments[5];
	  var date = new Date(rawDate);
	  var separator = customSeparator;
	  var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	
	  if (namedMonths) {
	    months = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
	  }
	
	  var day = leftPad(date.getDate());
	  var minutes = leftPad(date.getMinutes());
	  var hours = leftPad(date.getHours());
	
	  var dateString = '';
	  var timeString = ', ' + hours + ':' + minutes;
	  var customDate = [day, months[date.getMonth()], date.getFullYear()];
	
	  if (!showDay) {
	    customDate.shift();
	  }
	
	  if (yearFirst) {
	    customDate.reverse();
	  }
	
	  dateString = customDate.join(separator);
	
	  if (time) {
	    dateString += timeString;
	  }
	
	  return dateString;
	};exports.
	
	
	get = get;exports.
	formattedDate = formattedDate;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */
	
	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';
	
	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}
	
	function isFunction(x) {
	  return typeof x === 'function';
	}
	
	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}
	
	var isArray = _isArray;
	
	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;
	
	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};
	
	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}
	
	function setAsap(asapFn) {
	  asap = asapFn;
	}
	
	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';
	
	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}
	
	// vertx
	function useVertxTimer() {
	  return function () {
	    vertxNext(flush);
	  };
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}
	
	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}
	
	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}
	
	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];
	
	    callback(arg);
	
	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }
	
	  len = 0;
	}
	
	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(7);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}
	
	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;
	
	  var parent = this;
	
	  var child = new this.constructor(noop);
	
	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }
	
	  var _state = parent._state;
	
	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }
	
	  return child;
	}
	
	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }
	
	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}
	
	var PROMISE_ID = Math.random().toString(36).substring(16);
	
	function noop() {}
	
	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	
	var GET_THEN_ERROR = new ErrorObject();
	
	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}
	
	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}
	
	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}
	
	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}
	
	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	
	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}
	
	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}
	
	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}
	
	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}
	
	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }
	
	  publish(promise);
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	
	  promise._result = value;
	  promise._state = FULFILLED;
	
	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}
	
	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	
	  asap(publishRejection, promise);
	}
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;
	
	  parent._onerror = null;
	
	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;
	
	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}
	
	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;
	
	  if (subscribers.length === 0) {
	    return;
	  }
	
	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }
	
	  promise._subscribers.length = 0;
	}
	
	function ErrorObject() {
	  this.error = null;
	}
	
	var TRY_CATCH_ERROR = new ErrorObject();
	
	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;
	
	  if (hasCallback) {
	    value = tryCatch(callback, detail);
	
	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }
	
	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}
	
	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}
	
	var id = 0;
	function nextId() {
	  return id++;
	}
	
	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}
	
	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);
	
	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }
	
	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;
	
	    this._result = new Array(this.length);
	
	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}
	
	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};
	
	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;
	
	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};
	
	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;
	
	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);
	
	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};
	
	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;
	
	  if (promise._state === PENDING) {
	    this._remaining--;
	
	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }
	
	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};
	
	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;
	
	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};
	
	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}
	
	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}
	
	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}
	
	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
	
	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}
	
	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.
	
	  Terminology
	  -----------
	
	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.
	
	  A promise can be in one of three states: pending, fulfilled, or rejected.
	
	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.
	
	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.
	
	
	  Basic Usage:
	  ------------
	
	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);
	
	    // on failure
	    reject(reason);
	  });
	
	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Advanced Usage:
	  ---------------
	
	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.
	
	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();
	
	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();
	
	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }
	
	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Unlike callbacks, promises are great composable primitives.
	
	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON
	
	    return values;
	  });
	  ```
	
	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];
	
	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}
	
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;
	
	Promise.prototype = {
	  constructor: Promise,
	
	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,
	
	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	function polyfill() {
	    var local = undefined;
	
	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }
	
	    var P = local.Promise;
	
	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }
	
	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }
	
	    local.Promise = Promise;
	}
	
	polyfill();
	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;
	
	return Promise;
	
	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var ModalController = function () {
	  function ModalController() {_classCallCheck(this, ModalController);
	    if (document.querySelectorAll('[data-modal]')) {
	      console.log('init modal');
	      this.modalVisible = false;
	      this.modalLinks = document.querySelectorAll('[data-modal]');
	      this.addEvents();
	    }
	  }_createClass(ModalController, [{ key: 'addEvents', value: function addEvents()
	
	    {var _this = this;var _loop = function _loop(
	      i) {
	        var modalLink = _this.modalLinks[i];
	        modalLink.addEventListener('click', function (event) {return _this.showModal(event, modalLink);});};for (var i = 0; i < this.modalLinks.length; i++) {_loop(i);
	      }
	    } }, { key: 'showModal', value: function showModal(
	
	    e, modalLink) {
	      e.preventDefault();
	      if (!this.modalVisible) {
	        this.modalID = modalLink.getAttribute('data-modal');
	
	        this.getContent();
	
	        this.modal = this.buildModal(modalLink);
	        this.createCloseButton(this.modal, modalLink);
	
	        document.querySelector('body').insertBefore(this.modal, document.querySelector('.js-site-header'));
	
	        this.modal.querySelector('.modal__ct').setAttribute('tabindex', 0);
	        this.modal.querySelector('.modal__ct').focus();
	
	        document.querySelector('html').style.overflow = 'hidden';
	        this.modalVisible = true;
	      }
	    } }, { key: 'hideModal', value: function hideModal(
	
	    e, modalLink) {
	      document.querySelector('body').removeChild(this.modal);
	      modalLink.focus();
	
	      document.querySelector('html').removeAttribute('style');
	
	      this.modalVisible = false;
	    } }, { key: 'buildModal', value: function buildModal(
	
	    modalLink) {var _this2 = this;
	      var modal = document.createElement('div');
	      modal.classList.add('modal');
	
	      modal.innerHTML = this.modalContent;
	
	      modal.addEventListener('keydown', function (e) {
	        if ((e.keyCode || e.which) === 27) {
	          e.preventDefault();
	          _this2.hideModal(e, modalLink);
	        }
	      });
	
	      var modalContent = modal.querySelector('[data-modal-content]');
	      modalContent.removeAttribute('data-modal-content');
	      modalContent.classList.add('modal__ct');
	
	      return modal;
	    } }, { key: 'createCloseButton', value: function createCloseButton(
	
	    modal, modalLink) {var _this3 = this;
	      var button = document.createElement('button');
	      var icon = document.createElement('span');
	      var text = document.createElement('span');
	      button.classList.add('dialog__button', 'btn', 'btn--round', 'btn--mini');
	
	      icon.classList.add('svg-close', 'icon', 'icon--close', 'btn--mini');
	      button.appendChild(icon);
	
	      text.classList.add('btn__text');
	      text.textContent = 'Schließen';
	      button.appendChild(text);
	
	      button.addEventListener('click', function (event) {return _this3.hideModal(event, modalLink);});
	      button.addEventListener('keydown', function (event) {return _this3.handleTab(event);});
	
	      modal.querySelector('.dialog').appendChild(button);
	    } }, { key: 'handleTab', value: function handleTab(
	
	    e) {
	      if ((e.keyCode || e.which) === 9) {
	        this.modal.querySelector('.modal__ct').focus();
	        e.preventDefault();
	      }
	    } }, { key: 'getContent', value: function getContent()
	
	    {
	      console.log(this.modalID);
	      this.modalContent = document.querySelector('[data-modal-content="' + this.modalID + '"]').outerHTML;
	      console.log('Show Modal');
	    } }]);return ModalController;}();
	
	
	var modal = new ModalController(); // eslint-disable-line

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _utils = __webpack_require__(4);var u = _interopRequireWildcard(_utils);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var
	
	SVGController = function () {
	  function SVGController() {_classCallCheck(this, SVGController);
	    if (document.querySelectorAll('[data-inlinesvg]').length > 0) {
	      this.svgContainers = document.querySelectorAll('[data-inlinesvg]');
	      this.totalIcons = this.svgContainers.length;
	      this.currentIcon = 0;
	      this.loadSVG(this.svgContainers[this.currentIcon]);
	    }
	  }_createClass(SVGController, [{ key: 'loadSVG', value: function loadSVG(
	
	    svgContainer) {var _this = this;
	      this.filename = svgContainer.getAttribute('data-inlinesvg');
	      var classes = svgContainer.className.split(' ');
	
	      if (sessionStorage.getItem(this.filename)) {
	        console.info('Loading icon from storage', this.filename);
	
	        this.buildSVG(svgContainer, sessionStorage.getItem(this.filename), classes);
	
	        this.loadNextIcon();
	      } else {
	        u.get('/assets/icons/' + this.filename + '.svg').then(function (content) {
	          console.info('Loading icon from file', _this.filename);
	
	          _this.buildSVG(svgContainer, content, classes);
	
	          sessionStorage.setItem(_this.filename, content);
	
	          _this.loadNextIcon();
	        }, function (error) {
	          console.log(error);
	        });
	      }
	    } }, { key: 'buildSVG', value: function buildSVG(
	
	    svgContainer, content, classes) {
	      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	      svg.innerHTML = content;
	      svg.setAttribute('viewBox', '0 0 256 256');
	      svg.setAttribute('preserveAspectRatio', 'xMidYMax slice');
	      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	      svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
	      svg.classList.add('inlicon');
	
	      for (var i = 0; i < classes.length; i++) {
	        svg.classList.add(classes[i]);
	      }
	
	      svgContainer.insertBefore(svg, svgContainer.firstChild);
	    } }, { key: 'loadNextIcon', value: function loadNextIcon()
	
	    {
	      this.currentIcon++;
	
	      if (this.currentIcon < this.totalIcons) {
	        this.loadSVG(this.svgContainers[this.currentIcon]);
	      }
	    } }]);return SVGController;}();exports.default =
	
	
	SVGController;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function q(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
	this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
	function w(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function x(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function z(a,b){function c(){var a=k;x(a)&&null!==a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);x(a)};function A(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var B=null,C=null,D=null;function H(){if(null===C){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}C=""!==a.style.font}return C}function I(a,b){return[a.style,a.weight,H()?a.stretch:"","100px",b].join(" ")}
	A.prototype.load=function(a,b){var c=this,k=a||"BESbswy",y=b||3E3,E=(new Date).getTime();return new Promise(function(a,b){null===D&&(D=!!document.fonts);if(D){var J=new Promise(function(a,b){function e(){(new Date).getTime()-E>=y?b():document.fonts.load(I(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},function(){b()})}e()}),K=new Promise(function(a,c){setTimeout(c,y)});Promise.race([K,J]).then(function(){a(c)},function(){b(c)})}else m(function(){function r(){var b;if(b=
	-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===B&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),B=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=B&&(f==t&&g==t&&h==t||f==u&&g==u&&h==u||f==v&&g==v&&h==v)),b=!b;b&&(null!==d.parentNode&&d.parentNode.removeChild(d),clearTimeout(G),a(c))}function F(){if((new Date).getTime()-E>=y)null!==d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||
	void 0===a)f=e.a.offsetWidth,g=n.a.offsetWidth,h=p.a.offsetWidth,r();G=setTimeout(F,50)}}var e=new q(k),n=new q(k),p=new q(k),f=-1,g=-1,h=-1,t=-1,u=-1,v=-1,d=document.createElement("div"),G=0;d.dir="ltr";w(e,I(c,"sans-serif"));w(n,I(c,"serif"));w(p,I(c,"monospace"));d.appendChild(e.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);t=e.a.offsetWidth;u=n.a.offsetWidth;v=p.a.offsetWidth;F();z(e,function(a){f=a;r()});w(e,I(c,'"'+c.family+'",sans-serif'));z(n,function(a){g=a;r()});
	w(n,I(c,'"'+c.family+'",serif'));z(p,function(a){h=a;r()});w(p,I(c,'"'+c.family+'",monospace'))})})}; true?module.exports=A:(window.FontFaceObserver=A,window.FontFaceObserver.prototype.load=A.prototype.load);}());


/***/ }
/******/ ]);
//# sourceMappingURL=main.compiled.js.map