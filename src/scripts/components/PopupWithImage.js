import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    /** zoom  */
    this._popUpImgItem = this._popUpElement.closest('.popup_zoom_img');
    this._popUpImgCard = this._popUpImgItem.querySelector('.popup__img-card');
    this._popUpImgCaption = this._popUpImgItem.querySelector(
      '.popup__img-caption'
    );
  }

  open(data) {
    super.open();

    /** set data to popup img */
    this._popUpImgCard.src = data.link;
    this._popUpImgCaption.textContent = data.name;
    this._popUpImgCard.alt = data.name;
  }
}
