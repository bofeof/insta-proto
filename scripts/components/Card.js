export class Card {

  constructor({data, templateSelector, handleCardClick}) {

    this._templateSelector = templateSelector;


    this._data = data;
    this._link = data.photolink;
    this._name = data.photoname;

    //  open image popup by click
    this._handleCardClick = handleCardClick;
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

    // zoom
    this._galleryItemPhoto.addEventListener('click', () => {this._handleCardClick(this._data)});

  }


  _likePhotoCard() {
    this._likeButton.classList.toggle('gallery__like-button_active');
  }

  _removePhotoCard () {
    this._galleryItem.remove();
    this._galleryItem = null;
  }

}
