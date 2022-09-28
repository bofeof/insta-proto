export class Popup{

  constructor({selector}){
    this._popUpElement = document.querySelector(selector);
  };

  open(){
      this._popUpElement.classList.add('popup_opened');
      this._popUpElement.addEventListener('click', (evt) => {this._handleClickClose(evt)});
      document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
  };

  close(){
      this._popUpElement.classList.remove('popup_opened');
      this._popUpElement.removeEventListener('click', (evt) => {this._handleClickClose(evt)});
      document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
  };


  // esc click
  _handleEscClose(evt){

      if (evt.key ==='Escape') {
        // this._popUpOpened = document.querySelector('.popup_opened');
        this.close();
      }

  };

  // overlay click
  _handleClickClose(evt){
      if (
        evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__container') ||
        evt.target.classList.contains('popup__img-container')
        ) {
          this.close();
        }

  }

  setEventListeners(){
    this._popUpElement.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));

    // this._PopUpCloseButton = this._popUpElement.querySelector('.popup__close-button');
    // this._PopUpCloseButton.addEventListener('click', this._PopUpCloseButton.close.bind(this._PopUpCloseButton));
  }

}
