import {Popup} from './Popup.js';

export class PopupWithImage extends Popup{
  constructor(data){

    super(selector, this._popUpElement);

    // this._popUpElement = document.querySelector(selector);

    this._link = data.link;
    this._name = data.name;

    // zoom
    this._popUpImgItem = super._popUpElement.closest('.popup_zoom_img');
    this._popUpImgCard = this._popUpImgItem.querySelector('.popup__img-card');
    this._popUpImgCaption = this._popUpImgItem.querySelector('.popup__img-caption');
};

Open() {

    super.Open();

    // set data to popup img
    this._popUpImgCard.src = this._link;
    this._popUpImgCaption.textContent = this._name;
    this._popUpImgCard.alt = this._name;

}

}
