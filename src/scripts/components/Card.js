export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleCardRemove,
    handleCardLike,
    userId
  ) {
    this._templateSelector = templateSelector;

    this._data = data;

    /** open image popup by click */
    this.handleCardClick = handleCardClick;

    this.handleCardRemove = handleCardRemove;

    this.handleCardLike = handleCardLike;

    this.userId = userId;

    this._galleryItem = this._getTemplate();

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
    // this._galleryItemLikeCounter.textContent = this._data.likes.length;

    /**  show remove-basket */
    if (this._data.owner._id !== this.userId) {
      this._removeButton.style.display = 'none';
    }

    this._setEventListeners();

    return this._galleryItem;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this.handleCardLike(this._data._id);
    });

    this._removeButton.addEventListener('click', () => {
      this._removePhotoCard();
    });

    /** zoom */
    this._galleryItemPhoto.addEventListener('click', () => {
      this.handleCardClick(this._data);
    });
  }

  _activateLike() {
    if (!this._likeButton.classList.contains('gallery__like-button_active')) {
      this._likeButton.classList.add('gallery__like-button_active');
    }
  }

  _deactivateLike() {
    if (this._likeButton.classList.contains('gallery__like-button_active')) {
      this._likeButton.classList.remove('gallery__like-button_active');
    }
  }

  isLiked() {
    if (this._data.likes.find((user) => user._id === this.userId)) {
      return true;
    }
  }

  /** set likes after icon click */
  setCardLikes(likes) {
    this._galleryItemLikeCounter.textContent = likes.length;
    this._data.likes = likes;
    this.isLiked() ? this._activateLike() : this._deactivateLike();
  }

  _removePhotoCard() {
    this.handleCardRemove(this._data._id);
  }

  deletePhotoCard() {
    this._galleryItem.remove();
    this._galleryItem = null;
  }
}
