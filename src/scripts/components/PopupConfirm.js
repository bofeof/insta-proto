import { Popup } from './Popup.js';
export class PopupConfirm extends Popup {
  constructor({ selector }) {
    super(selector);

    this._submitButton = this._popUpElement.querySelector(
      '.popup__submit-button'
    );
  }

  /** set func for action after confirmation */
  setCallBack(callBackFunc) {
    this._handleFormSubmit = callBackFunc;
  }

  changeButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
