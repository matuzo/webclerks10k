class ModalController {
  constructor() {
    if (document.querySelectorAll('[data-modal]')) {
      console.log('init modal');
      this.modalVisible = false;
      this.modalLinks = document.querySelectorAll('[data-modal]');
      this.addEvents();
    }
  }

  addEvents() {
    for (let i = 0; i < this.modalLinks.length; i++) {
      const modalLink = this.modalLinks[i];
      modalLink.addEventListener('click', (event) => this.showModal(event, modalLink));
    }
  }

  showModal(e, modalLink) {
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
  }

  hideModal(e, modalLink) {
    document.querySelector('body').removeChild(this.modal);
    modalLink.focus();

    document.querySelector('html').removeAttribute('style');

    this.modalVisible = false;
  }

  buildModal(modalLink) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = this.modalContent;

    modal.addEventListener('keydown', (e) => {
      if ((e.keyCode || e.which) === 27) {
        e.preventDefault();
        this.hideModal(e, modalLink);
      }
    });

    const modalContent = modal.querySelector('[data-modal-content]');
    modalContent.removeAttribute('data-modal-content');
    modalContent.classList.add('modal__ct');

    return modal;
  }

  createCloseButton(modal, modalLink) {
    const button = document.createElement('button');
    const icon = document.createElement('span');
    const text = document.createElement('span');
    button.classList.add('dialog__button', 'btn', 'btn--round', 'btn--mini');

    icon.classList.add('svg-close', 'icon', 'icon--close', 'btn--mini');
    button.appendChild(icon);

    text.classList.add('btn__text');
    text.textContent = 'Schließen';
    button.appendChild(text);

    button.addEventListener('click', (event) => this.hideModal(event, modalLink));
    button.addEventListener('keydown', (event) => this.handleTab(event));

    modal.querySelector('.dialog').appendChild(button);
  }

  handleTab(e) {
    if ((e.keyCode || e.which) === 9) {
      this.modal.querySelector('.modal__ct').focus();
      e.preventDefault();
    }
  }

  getContent() {
    console.log(this.modalID);
    this.modalContent = document.querySelector(`[data-modal-content="${this.modalID}"]`).outerHTML;
    console.log('Show Modal');
  }
}

const modal = new ModalController(); // eslint-disable-line
