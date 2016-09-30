class OffCanvasController {

  constructor() {
    console.log('OffCanvasController');

    // Alle Elemente die off canvas sind
    // und per default aria hidden und nicht mit Tab fokussier sein sollen
    this.items = document.querySelectorAll('.js-offcanvas');
    // Elemente verstecken
    for (let i = 0; i < this.items.length; i++) {
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
  }

  createButtons() {
    // Buttons erstellen
    this.closeButton = document.createElement('button');
    this.toggleButton = document.createElement('button');

    // Text und Klassen hinzufügen
    this.closeButton.classList.add('btn');
    this.closeButton.classList.add('btn__close-offcanvas');
    this.closeButton.classList.add('js-close-offcanvas');
    this.closeButton.innerHTML = `<span class="icon icon--close svg-close">
                                    <span class="btn__text">
                                        CLOSE
                                    </span>
                                   </span>`;

    this.toggleButton.classList.add('btn');
    this.toggleButton.classList.add('btn__close-offcanvas');
    this.toggleButton.classList.add('js-toggle-offcanvas');
    this.toggleButton.innerHTML = `<span class="icon icon--burger svg-burger">
                                    <span class="btn__text">
                                        MENU
                                    </span>
                                   </span>`;


    // Toggle button in main einfügen
    this.siteContent.insertBefore(this.toggleButton, this.siteContent.firstChild);
    // Schließen button in die main nav einfügen
    this.navMain.appendChild(this.closeButton);
  }

  addEvents() {
    // Toggle Elements
    this.toggleButton.addEventListener('click', () => this.toggleNav());
    // Close Elements
    this.closeButton.addEventListener('click', () => this.closeNav());

    // Manage key events
    document.addEventListener('keydown', (event) => this.keyEvents(event));

    // Open Elements
    const firstLinkInNav = this.navMain.querySelector('.nav__main__item a:first-child');
    firstLinkInNav.addEventListener('focus', () => this.openContentInfo());

    // Close Elements
    const lastLinkInFooter = this.siteFooter.querySelector('.js-last-focus');
    lastLinkInFooter.addEventListener('blur', () => this.closeContentInfo());

    document.querySelector('.js-skip-link-nav').addEventListener('click', () => this.openNav());
  }

  // Navigation aus- oder einblenden
  toggleNav() {
    if (this.itemsVisible) {
      this.closeNav();
      return;
    }

    this.openNav();
  }

  closeNav() {
    // Elemente verstecken
    this.hideItems();
    // Fokus auf Hauptinhalt setzen
    this.siteContent.setAttribute('tabindex', -1);
    this.siteContent.focus();
    document.querySelector('.js-logo-clone').classList.remove('logo--hidden');
  }

  openNav() {
    // Elemente zeigen
    this.showItems();
    // Fokus auf Hauptnavigation setzen
    this.navMain.setAttribute('tabindex', -1);
    this.navMain.focus();
    document.querySelector('.js-logo-clone').classList.add('logo--hidden');
  }

  // Elemente zeigen
  showItems() {
    // Elemente sichtbar
    this.itemsVisible = true;

    // Alle unsichtbaren Elemente durchlaufen
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
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
  hideItems() {
    // Elemente unsichtbar
    this.itemsVisible = false;

    // Alle sichtbaren Elemente durchlaufen
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      // Elemente a11y verstecken
      this.a11yHide(item);
      // Elemente visuell verstecken
      item.classList.add('offcanvas--hidden');
    }

    // Elemente ausblenden
    this.page.classList.remove('page--navvisible');
  }

  // Elemente a11y verstecken
  a11yHide(item) {
    item.setAttribute('aria-hidden', true);
  }

  // Elemente a11y zeigen
  a11yShow(item) {
    item.removeAttribute('aria-hidden');
  }

  openContentInfo() {
    if (!this.itemsVisible) {
      // Elemente zeigen
      this.showItems();
      // Fokus auf Footer setzen
      this.navMain.setAttribute('tabindex', -1);
      this.navMain.focus();
    }
  }

  closeContentInfo() {
    if (this.itemsVisible) {
      // Elemente verstecken
      this.hideItems();
      this.navMain.removeAttribute('tabindex');
    }
  }

  // Elemente per Esc schließen
  keyEvents(e) {
    if (e.keyCode === 27) {
      this.closeNav();
    }
  }
}

const offcanvas = new OffCanvasController();

export default offcanvas;
