import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{

  constructor({selector, handleFormSubmit}){
    super(selector);

    this._popUpElement = document.querySelector(selector);

    // колбэк сабмита формы
    this._handleFormSubmit = handleFormSubmit;
};

_getInputValues(){

  this._inputList = this._popUpElement.querySelectorAll('.form__input');
  this._formValues = {};

  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  return this._formValues;
}


// set user data to input
setInputValues(data){

  this._popUpElement.querySelector('.popup__input_form_name').value = data.username;
  this._popUpElement.querySelector('.popup__input_form_job').value = data.userjob;

}


setEventListeners(){
  super.setEventListeners();

  //submit
  // this._submitButton = this._popUpElement.querySelector('popup__button-submit');
  this._popUpElement.querySelector('popup__button-submit').setEventListeners('submit', this._handleFormSubmit(this._getInputValues()))
}

close(){
  super.close();

  this._popUpElement.querySelector('.popup__form-inputs').reset();
}

}
