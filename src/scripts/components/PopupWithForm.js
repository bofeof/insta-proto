import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);

    /**  submit form callback */
    this._handleFormSubmit = handleFormSubmit;

    this._popUpForm = this._popUpElement.querySelector('.popup__form-inputs');
    this._inputList = this._popUpForm.querySelectorAll('.popup__input')


    this._submitForm = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    };

    this._submitButton = this._popUpElement.querySelector(
      '.popup__submit-button'
    );
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  /** custom, set user data to input (when pop up is opened) */
  setInputValues(data) {
    Object.entries(data).forEach(([input, val]) => {
      this._popUpElement.querySelector(input).value = val;
    });
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
    this._popUpForm.reset();
  }
}
