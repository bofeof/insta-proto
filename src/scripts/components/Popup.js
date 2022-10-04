export class Popup {
  constructor(selector) {
    this._popUpElement = document.querySelector(selector);
    this._clickOverlay = this._handleClickClose.bind(this);
    this._escClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popUpElement.classList.add('popup_opened');
    this._popUpElement.addEventListener('click', this._clickOverlay);
    document.addEventListener('keydown', this._escClose);
  }

  close() {
    this._popUpElement.classList.remove('popup_opened');
    this._popUpElement.removeEventListener('click', this._clickOverlay);
    document.removeEventListener('keydown', this._escClose);
  }

  /**  esc click */
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  /**  overlay click */
  _handleClickClose(evt) {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__container') ||
      evt.target.classList.contains('popup__img-container')
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popUpElement
      .querySelector('.popup__close-button')
      .addEventListener('click', this.close.bind(this));
  }
}
