import {showPopUp, closePopUp} from "./index.js";

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
    this._popUpCloseButtonZoom = this._popUpImgItem.querySelector('.popup__close-button');
    this._popUpImgCard = this._popUpImgItem.querySelector('.popup__img-card');
    this._popUpImgCaption = this._popUpImgItem.querySelector('.popup__img-caption');

    this._setEventListeners();

    return this._galleryItem;
  }

  _setEventListeners(){

    this._galleryItem.querySelector('.gallery__like-button').addEventListener(
      'click', () => {this._likePhotoCard()}
    );

    this._galleryItem.querySelector('.gallery__remove-button').addEventListener(
      'click', () => {this._removePhotoCard()}
    );

    this._galleryItem.querySelector('.gallery__item-photo').addEventListener(
      'click', () => {this._zoomPhotoCard()}
    );

    // show and close zoom-img
    this._galleryItemPhoto.addEventListener('click', () => {this._handlePreviewPicture()});
    this._popUpCloseButtonZoom.addEventListener('click', () => {closePopUp(this._popUpImgItem)})

  }


  _likePhotoCard() {
    const likeButton = this._galleryItem.querySelector('.gallery__like-button');
    likeButton.classList.toggle('gallery__like-button_active');
  }

  _removePhotoCard () {
    const cardItem = this._galleryItem.closest('.gallery__item');
    cardItem.remove();
  }

  _zoomPhotoCard() {

    // get data from clicked card
    this._imgLink = this._galleryItem.querySelector('.gallery__item-photo').getAttribute('src');
    this._imgCaption = this._galleryItem.querySelector('.gallery__item-name').textContent;

    // set data to popup img
    this._popUpImgCard.src = this._imgLink;
    this._popUpImgCaption.textContent = this._imgCaption;
    this._popUpImgCard.alt = this._imgCaption;
  }

  _handlePreviewPicture() {
    showPopUp(this._popUpImgItem);
  }

}
