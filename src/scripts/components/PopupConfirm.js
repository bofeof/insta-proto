import { Popup } from './Popup.js';
PopupConfirm
export class PopupConfirm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);

    /**  submit form callback */
    this.handleFormSubmit = handleFormSubmit;

    this._submitForm = (evt) => {
      evt.preventDefault();
      this.handleFormSubmit();
    };

    this._submitButton = this._popUpElement.querySelector('.popup__submit-button');
  }

  changeButtonText(text){
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', this._submitForm);
  }

  close() {
    super.close();
  }
}
