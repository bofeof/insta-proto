import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{

  constructor({selector, handleFormSubmit}){
    super(selector);

    this._popUpElement = document.querySelector(selector);

    // submit form callback
    this._handleFormSubmit = handleFormSubmit;
};

_getInputValues(){

  this._inputList = this._popUpElement.querySelector('.popup__form').querySelectorAll('.popup__input');
  this._formValues = {};

  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  return this._formValues;
}


// *custom, set user data to input (when pop up is opened)
setInputValues(data){
  this._popUpElement.querySelector('.popup__input_form_name').value = data.username;
  this._popUpElement.querySelector('.popup__input_form_job').value = data.userjob;
}


setEventListeners(){
  super.setEventListeners();

  this._FormSubmitFunc = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  this._popUpElement.querySelector('.popup__submit-button').addEventListener('click', this._FormSubmitFunc)
}

removeEventListeners(){
  this._popUpElement.querySelector('.popup__submit-button').removeEventListener('click', this._FormSubmitFunc)
}


close(){
  super.close();

  this._popUpElement.querySelector('.popup__form-inputs').reset();

  this.removeEventListeners();
}

}
