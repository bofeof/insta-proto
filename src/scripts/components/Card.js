export class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    handleCardRemove,
    handleCardLike,
    userId,
  }) {
    this._templateSelector = templateSelector;

    this._data = data;

    /** open image popup by click */
    this._handleCardClick = handleCardClick;

    this._handleCardRemove = handleCardRemove;

    this._handleCardLike = handleCardLike;

    this._userId = userId;

    this._galleryItem = this._getTemplate();

    this.photoCardId = this._data._id;

    this._galleryItemName = this._galleryItem.querySelector(
      '.gallery__item-name'
    );
    this._galleryItemPhoto = this._galleryItem.querySelector(
      '.gallery__item-photo'
    );
    this._galleryItemLikeCounter = this._galleryItem.querySelector(
      '.gallery__like-counter'
    );
    this._likeButton = this._galleryItem.querySelector('.gallery__like-button');
    this._removeButton = this._galleryItem.querySelector(
      '.gallery__remove-button'
    );
  }

  _getTemplate() {
    const galleryItem = document
      .querySelector(this._templateSelector)
      .content.querySelector('.gallery__item')
      .cloneNode(true);
    return galleryItem;
  }

  generatePhotoCard() {
    this._galleryItemName.textContent = this._data.name;
    this._galleryItemPhoto.src = this._data.link;
    this._galleryItemPhoto.alt = this._data.name;

    this.setCardLikes(this._data.likes);

    /** basket should be available for cards (created by current user)*/
    this._hideRemoveBasketCard();

    this._setEventListeners();

    return this._galleryItem;
  }

  _hideRemoveBasketCard() {
    if (this._data.owner._id !== this._userId) {
      this._removeButton.style.display = 'none';
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this._data._id);
    });

    this._removeButton.addEventListener('click', () => {
      this._removePhotoCard();
    });

    /** zoom */
    this._galleryItemPhoto.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  /** check if card is liked by current user */
  isLiked() {
    return !!this._data.likes.find((user) => user._id === this._userId);
  }

  /** set likes after icon click */
  setCardLikes(likes) {
    this._galleryItemLikeCounter.textContent = likes.length;
    this._data.likes = likes;

    if (this.isLiked()) {
      if (!this._likeButton.classList.contains('gallery__like-button_active')) {
        this._likeButton.classList.add('gallery__like-button_active');
      }
    } else {
      if (this._likeButton.classList.contains('gallery__like-button_active')) {
        this._likeButton.classList.remove('gallery__like-button_active');
      }
    }
  }

  _removePhotoCard() {
    this._handleCardRemove(this._data._id);
  }

  deletePhotoCard() {
    this._galleryItem.remove();
    this._galleryItem = null;
  }
}
