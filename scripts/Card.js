import {showPopUp} from "./index.js";

export class Card {

  constructor(data, templateSelector) {

    this._templateSelector = templateSelector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const galleryItem = document.querySelector(this._templateSelector).content.querySelector('.gallery__item').cloneNode(true);
    return galleryItem
  }

  generatePhotoCard(){

    this._galleryItem = this._getTemplate();

    this._galleryItemName =  this._galleryItem.querySelector('.gallery__item-name');
    this._galleryItemPhoto = this._galleryItem.querySelector('.gallery__item-photo');

    this._galleryItemName.textContent = this._name;
    this._galleryItemPhoto.src = this._link;
    this._galleryItemPhoto.alt = this._name;

    // zoom
    this._popUpImg = document.querySelector('.popup__img-container');
    this._popUpImgItem = this._popUpImg.closest('.popup_zoom_img');
    this._popUpImgCard = this._popUpImgItem.querySelector('.popup__img-card');
    this._popUpImgCaption = this._popUpImgItem.querySelector('.popup__img-caption');

    // button
    this._likeButton = this._galleryItem.querySelector('.gallery__like-button');
    this._removeButton = this._galleryItem.querySelector('.gallery__remove-button');

    this._setEventListeners();

    return this._galleryItem;
  }

  _setEventListeners(){

    this._likeButton.addEventListener(
      'click', () => {this._likePhotoCard()}
    );

    this._removeButton.addEventListener(
      'click', () => {this._removePhotoCard()}
    );

    this._galleryItemPhoto.addEventListener(
      'click', () => {
        this._zoomPhotoCard();
        this._handlePreviewPicture();
      }
    );

  }


  _likePhotoCard() {
   this._likeButton.classList.toggle('gallery__like-button_active');
  }

  _removePhotoCard () {
    this._galleryItem.remove();
    this._galleryItem = null;
  }

  _zoomPhotoCard() {

    // set data to popup img
    this._popUpImgCard.src = this._link;
    this._popUpImgCaption.textContent = this._name;
    this._popUpImgCard.alt = this._name;
  }

  _handlePreviewPicture() {
    showPopUp(this._popUpImgItem);
  }

}
