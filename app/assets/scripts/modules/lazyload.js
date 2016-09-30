class LazyLoadController {
  constructor(parent = document) {
    // console.log('LazyLoadController');

    // Alle Bilder die lazy geloaded gehören
    // const imageContainers = parent.querySelectorAll('[data-loadimg]');
    const imageContainers = parent.querySelectorAll('[data-src]');
    // const src = imageContainers.getAttribute('data-src');

    // Bilder durchlaufen
    for (let i = 0; i < imageContainers.length; i++) {
      const imageContainer = imageContainers[i];
      // Bildpfad holen
      const imagePath = imageContainer.getAttribute('data-src');
      const srcSet = imageContainer.getAttribute('data-srcset');
      const classes = imageContainer.getAttribute('data-classes');
      const alt = imageContainer.getAttribute('data-alt');

      // picture Element erstellen
      const picture = document.createElement('picture');
      picture.classList.add(classes);

      const sourceWebp = document.createElement('source');
      sourceWebp.setAttribute('type', 'image/webp');
      sourceWebp.setAttribute('srcset', imagePath.replace(new RegExp('jpg', 'g'), 'webp'));

      const sourceJpg = document.createElement('source');

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
      const loadedImg = document.createElement('img');
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
  }

  init() {
    console.log('Starting to lazy load images');
  }
}

const Lazyload = new LazyLoadController();
Lazyload.init();

export default LazyLoadController;
