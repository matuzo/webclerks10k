import * as u from './utils.js';
import Layzload from './lazyload.js';

const Promise = require('es6-promise').Promise;

/**
 * Controller für die Navigation über Tabs
 */
class TabsController {
  // Funktionen, die beim Laden ausgeführt werden sollen
  constructor(options) {
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
      template: 'page',
    };

    // Defaulteinstellungen mit übergebenen Optionen mergen
    this.options = Object.assign({}, this.defaults, options);

    // Wenn News, gleich die Daten aus der API holen
    if (this.options.template === 'news') {
      // Erst, wenn die Daten fertig geladen sind, Eventlistener hinzufügen
      this.loadData().then((contents) => {
        this.contents = contents;
        this.addEvents();
      });
    // Wenn nicht News, Daten erst bei Auswahl des Tabs laden
    // Also Eventlistener gleich hinzufügen
    } else {
      this.addEvents();
    }

    // Aktueller Tab
    const currentTab = document.querySelector('.nav__tabs__link--active');
    // Index des aktuellen tabs
    this.currentTabIndex = currentTab.getAttribute('data-tab');
    // Klasse der aktuellen Seite
    this.currentPage = currentTab.getAttribute('data-name');

    this.setHeadlines();

    this.lastScrollPos = 0;
  }

  init() {
    console.log('Tabs initialisiert');
  }

  // Daten per AJAX laden
  loadData() {
    return new Promise((resolve, reject) => {
      u.get(this.options.apiPath + this.options.apiParameters).then((content) => {
        console.log('Content loaded successfully');
        resolve(content);
      }, (error) => {
        reject(error);
      });
    });
  }

  // Eventlistener hinzufügen
  addEvents() {
    for (let i = 0; i < this.tabs.length; i++) {
      const tab = this.tabs[i];
      // Bei Click auf Tab
      tab.addEventListener('click', (event) => this.clickEvent(event));
      // Wenn der Tab mit einer Tast ausgewählt wurde
      tab.addEventListener('keydown', (event) => this.keyEvents(event));
    }

    // Event Details bei click zeigen
    const articleLinks = document.querySelectorAll('.js-article-link');
    for (let i = 0; i < articleLinks.length; i++) {
      const article = articleLinks[i];
      const data = JSON.parse(this.contents).filter((content) => content.slug === article.parentNode.getAttribute('id'));

      article.addEventListener('click', (e) => {
        this.showFeaturedNews(e, data[0]);
      });
    }
  }

  clickEvent(e) {
    e.preventDefault();
    // Aktueller Link
    let target = e.target;

    // Wenn span in Link geklickt wird
    if (target.tagName === 'SPAN') {
      // Link selektieren
      target = e.target.parentNode;
    }

    // Tabindex aktualisieren
    this.currentTabIndex = target.getAttribute('data-tab');
    // Neuen Tab aktivieren
    this.setActiveTab();
  }

  keyEvents(e) {
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
      this.currentTabIndex = (this.tabs.length - 1);
    }

    // Neuen Tab aktivieren, wenn links oder rechts gedrückt wurde
    if (e.keyCode === 39 || e.keyCode === 37) {
      this.setActiveTab();
    }
  }

  // Neuen Tab aktivieren
  setActiveTab() {
    // Aktueller Tab
    const currentTab = document.querySelector('.nav__tabs__link--active');

    // Nicht auswählbar machen
    currentTab.setAttribute('tabindex', -1);
    currentTab.setAttribute('aria-selected', false);

    // Aktiv Klasse entfernen
    currentTab.classList.remove('nav__tabs__link--active');

    // Neuer Tab
    const newTab = this.tabs[this.currentTabIndex];
    // Auswählbar machen
    newTab.setAttribute('tabindex', 0);
    newTab.setAttribute('aria-selected', true);
    // Fokussieren
    newTab.focus();
    // Aktiv Klasse hinzufügen
    newTab.classList.add('nav__tabs__link--active');
    // Neuer Name der page
    const newPage = newTab.getAttribute('data-name');

    document.querySelector('html').classList.remove(this.currentPage);
    document.querySelector('html').classList.add(newPage);

    this.currentPage = newPage;

    // Inhalt laden
    this.loadTabContent(newTab);
  }

  // Inhalt laden
  loadTabContent(activeTab) {
    // Url ändern
    this.changeUrl(activeTab);

    // Wenn News, die Daten zuerst je nach Tab filtern
    if (this.options.template === 'news') {
      this.filterNewsByCategory().then((contents) => {
        // News nach dem filtern ausgeben
        console.log(contents);
        this.showNews(contents);
      }).catch((err) => {
        console.log(err);
        document.querySelector('.js-site-content-main').textContent = 'Sorry, but you are offline :(';
      });
    // Wenn nicht News
    } else {
      // Vom aktuellen Tab den Pfad holen
      this.options.apiPath = activeTab.getAttribute('href');

      // Die Daten laden
      this.loadData().then((contents) => {
        // Temporär div erstellen und mit dem geholten HTMLString befüllen
        const temp = document.createElement('div');
        temp.innerHTML = contents;
        // Aus den geholten Daten nur die Main Inhalte holen
        const pageContent = temp.querySelector('.js-site-content-main').innerHTML;
        // Aus den geholten Daten nur die Featured Inhalte holen
        const pageFeatured = temp.querySelector('.js-featured-cards-inner').innerHTML;
        // Seite anzeigen
        this.showPage(pageContent, pageFeatured);
      });
    }
  }

  // Url ändern
  changeUrl(activeTab) {
    // Url des aktuellen Tabs holen
    this.link = activeTab.getAttribute('href');

    // In History pushen
    history.pushState(this.link, null, this.link);
  }

  // Seite anzeigen
  showPage(content, featured) {
  // Neue Inhalte ins HTML einfügen
    const sectionContent = document.querySelector('.js-site-content-main');
    sectionContent.innerHTML = content;

    const lazyloadSectionContent = new Layzload(sectionContent);

    const sectionFeatured = document.querySelector('.js-featured-cards-inner');
    sectionFeatured.innerHTML = featured;

    const lazyloadFeaturedContent = new Layzload(sectionFeatured);
  }

  // News anzeigen
  showNews(contents) {
    const parent = document.querySelector('.js-site-content-main');
    // Aktuelle Inhalte leeren
    parent.innerHTML = '';

    // Headline austauschen
    const headlineTemplate = this.buildHeadlineTemplate();
    // Ins HTML einfügen
    parent.appendChild(headlineTemplate);

    // News abarbeiten und in HTML einfügen
    contents.forEach((content) => {
      const contentTemplate = this.buildContentTemplate(content);
      parent.appendChild(contentTemplate);
    });

    // Wenn fertig, Bilder lazyloaden
    const lazyload = new Layzload(parent);
    lazyload.init();

    this.buildFeaturedTemplate(contents[0]);
  }

  showFeaturedNews(e, data) {
    e.preventDefault();
    this.setHeadlines();
    this.buildFeaturedTemplate(data);
    this.toggleFeaturedNews();

    const link = `/news/${data._embedded['wp:term'][0][0]['slug']}/${data.slug}`; // eslint-disable-line
    history.pushState(link, null, link);
  }

  toggleFeaturedNews(e) {
    if (e) {
      e.preventDefault();
    }

    const htmlClasses = document.querySelector('html').classList;

    let scrollPos = 0;

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
  buildHeadlineTemplate() {
    const html = document.createElement('h3');
    html.textContent = this.contentHeadline;
    html.classList.add('main-content__hl');

    // html.setAttribute('tabindex', 0);

    return html;
  }

  buildFeaturedTemplate(data) {
    const sectionFeatured = document.querySelector('.js-featured-cards-inner');
    sectionFeatured.innerHTML = '';

    const headline = document.createElement('h3');
    headline.setAttribute('tabindex', 0);
    headline.classList.add('ft__hl');
    headline.textContent = this.featuredHeadline;

    sectionFeatured.appendChild(headline);

    const card = document.createElement('div');
    card.classList.add('ft__card');
    card.classList.add('ft__card--card');

    let image = '/assets/images/webclerks_logo.svg';
    let imageClasses = 'ft__imgct ft__imgct--webclerks';
    let altText = '';
    const sizes = ['image285', 'image435', 'full'];
    const srcset = [];

    if (data._embedded['wp:featuredmedia']) { // eslint-disable-line
      for (let i = 0; i < sizes.length; i++) {
        if (data._embedded['wp:featuredmedia'][0].media_details.sizes[sizes[i]]) { // eslint-disable-line
          const sizeFormat = data._embedded['wp:featuredmedia'][0].media_details.sizes[sizes[i]]; // eslint-disable-line
          srcset.push(`${sizeFormat.source_url} ${sizeFormat.width}w`); // eslint-disable-line

          if (data._embedded['wp:featuredmedia'][0].media_details.sizes[sizes[0]]) { // eslint-disable-line
            image = data._embedded['wp:featuredmedia'][0].media_details.sizes[sizes[0]].source_url; // eslint-disable-line
          } else {
            image = data._embedded['wp:featuredmedia'][0].media_details.sizes.thumb_small.source_url; // eslint-disable-line
          }
        }
        altText = data._embedded['wp:featuredmedia'][0].alt_text; // eslint-disable-line
      }
      imageClasses = 'ft__imgct';
    }


    const categorySlug = data._embedded['wp:term'][0][0]['slug']; // eslint-disable-line

    const output = `
      <div class="${imageClasses}" data-srcset="${srcset.join(',')}" data-src="${image}" data-classes="ft__img" data-alt="${altText}"></div>
  
      <div class="ft__ct">

        <a href="/news/${categorySlug}" class="ft__btn ft__btn--close btn--round btn--small js-article-close">
          <span class="svg-close icon--close icon art__btn__icon">
            <span class="visually-hidden">
              Zurück zur Übersicht
            </span>
          </span>
        </a>

        <h4 class="ft__ct__hl">${data.title.rendered}</h4>

        ${data.content.rendered}
      </div>
    `;

    card.innerHTML = output;
    card.querySelector('.js-article-close').addEventListener('click', (e) => {
      this.toggleFeaturedNews(e);
    });

    sectionFeatured.appendChild(card);

    const lazyload = new Layzload(sectionFeatured);
    lazyload.init();
  }

  // Newsinhalte in HTML verpacken
  buildContentTemplate(data) {
    let output = '';
    const html = document.createElement('article');
    let altText = '';
    html.classList.add('art');
    html.setAttribute('id', data.slug);
    html.setAttribute('role', 'article');

    if (data.acf.gesponsered) {
      html.classList.add('art--sponsored');
    }

    const date = data.date;
    let image = '/assets/images/webclerks_logo.svg';
    let imageClasses = 'art__imgct art__imgct--webclerks';

    if (data._embedded['wp:featuredmedia']) { // eslint-disable-line
      image = data._embedded['wp:featuredmedia'][0].media_details.sizes.thumb_small.source_url; // eslint-disable-line
      imageClasses = 'art__imgct';
      altText = data._embedded['wp:featuredmedia'][0].alt_text; // eslint-disable-line
    }

    const categorySlug = data._embedded['wp:term'][0][0]['slug']; // eslint-disable-line
    const link = `/news/${categorySlug}/${data.slug}`;

    output = `<a href="${link}" class="art__link js-article-link">
                <div class="${imageClasses}" data-src="${image}" data-classes="art__img" data-alt="${altText}"></div>
                <h4 class="art__hl">
                    ${data.title.rendered}
                </h4>
                <p class="art__meta">
                  von webclerks am
                  <time datetime='${u.formattedDate(date, false, false, true, '-', true)}'>
                    ${u.formattedDate(date, true)}
                  </time>
                </p>
              </a>`;

    if (data.acf.gesponsered) {
      output += '<p class="art__sponsored"><span class="visually-hidden">Dieser Artikel wurde</span> gesponsert</p>';
    }

    html.innerHTML = output;
    html.querySelector('.js-article-link').addEventListener('click', (e) => {
      this.showFeaturedNews(e, data);
    });

    return html;
  }

  // Aktuell noch hardgecoded:
  setHeadlines() {
    // Alle möglichen Kategorien
    this.newsCategories = [2, 4, 3];

    // Alle möglichen Headlines
    const newsHeadline = ['Most current job offer', 'More projects', 'More industry news'];
    const recentNewsHeadline = ['Most current job offer', 'Latest project', 'Latest industry news'];

    // Aktuelle Headline setzen
    this.contentHeadline = newsHeadline[this.currentTabIndex];
    this.featuredHeadline = recentNewsHeadline[this.currentTabIndex];
  }

  // Je nach News, andere Inhalte zeigen
  filterNewsByCategory() {
    this.setHeadlines();
    // Gefilterte News zurückgeeben
    return new Promise((resolve) => {
      resolve(JSON.parse(this.contents).filter((news) => news.categories[0] === this.newsCategories[this.currentTabIndex]));
    });
  }
}

export default TabsController;

if (document.querySelector('html.news')) {
  const tabs = new TabsController({
    apiPath: 'https://content.webclerks.at/wp-json/wp/v2/posts',
    apiParameters: '?_embed&filter[meta_key]=gesponsered&filter[orderby]=meta_value%20date&filter[order]=DESC&orderby=date&per_page=30',
    template: 'news',
  });
  tabs.init();
}

if (document.querySelector('html.meetups')) {
  const tabs = new TabsController();
  tabs.init();
}
