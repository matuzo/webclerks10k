import * as u from './utils.js';

class SVGController {
  constructor() {
    if (document.querySelectorAll('[data-inlinesvg]').length > 0) {
      this.svgContainers = document.querySelectorAll('[data-inlinesvg]');
      this.totalIcons = this.svgContainers.length;
      this.currentIcon = 0;
      this.loadSVG(this.svgContainers[this.currentIcon]);
    }
  }

  loadSVG(svgContainer) {
    this.filename = svgContainer.getAttribute('data-inlinesvg');
    const classes = svgContainer.className.split(' ');

    if (sessionStorage.getItem(this.filename)) {
      console.info('Loading icon from storage', this.filename);

      this.buildSVG(svgContainer, sessionStorage.getItem(this.filename), classes);

      this.loadNextIcon();
    } else {
      u.get(`/assets/icons/${this.filename}.svg`).then((content) => {
        console.info('Loading icon from file', this.filename);

        this.buildSVG(svgContainer, content, classes);

        sessionStorage.setItem(this.filename, content);

        this.loadNextIcon();
      }, (error) => {
        console.log(error);
      });
    }
  }

  buildSVG(svgContainer, content, classes) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = content;
    svg.setAttribute('viewBox', '0 0 256 256');
    svg.setAttribute('preserveAspectRatio', 'xMidYMax slice');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svg.classList.add('inlicon');

    for (let i = 0; i < classes.length; i++) {
      svg.classList.add(classes[i]);
    }

    svgContainer.insertBefore(svg, svgContainer.firstChild);
  }

  loadNextIcon() {
    this.currentIcon++;

    if (this.currentIcon < this.totalIcons) {
      this.loadSVG(this.svgContainers[this.currentIcon]);
    }
  }
}

export default SVGController;
