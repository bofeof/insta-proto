const initialCards = [
  {
    photoName: 'Архыз',
    photoLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    photoName: 'Челябинская область',
    photoLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    photoName: 'Иваново',
    photoLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    photoName: 'Камчатка',
    photoLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    photoName: 'Холмогорский район',
    photoLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    photoName: 'Байкал',
    photoLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const buttonEditUser = document.querySelector('.user__edit-button');
const buttonAddCard = document.querySelector('.user__add-button');
const formUserInfoPopup = document.querySelector('.popup__form-userinfo');
const formCardPopup = document.querySelector('.popup__form-photocard');

const configAPI = {
    mestoUrl: 'https://nomoreparties.co/v1/cohort-51',
    headers: {
      authorization: '0aa0db8f-1663-456c-947a-270a3646c3a8',
      'Content-Type': 'application/json'
    }
  }

export {initialCards, validationConfig, buttonEditUser, buttonAddCard, formUserInfoPopup, formCardPopup, configAPI};
