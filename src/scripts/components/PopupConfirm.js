import { Popup } from './Popup.js';

export class PopupConfirm extends Popup {
  constructor({ selector, handleFormConfirm }) {
    super(selector);

    /**  submit form callback */
    this._handleFormConfirm = handleFormConfirm;

    this._confirmForm = (evt) => {
      evt.preventDefault();
      this._handleFormConfirm();
    };

    this._submitButton = this._popUpElement.querySelector('.popup__submit-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', this._confirmForm);
  }

  close(){
    super.close();
  }
}
