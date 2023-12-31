const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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
const editAvatar = document.querySelector('.user__avatar-editor');
const formUserInfoPopup = document.querySelector('.popup__form-userinfo');
const formCardPopup = document.querySelector('.popup__form-photocard');
const formAvatarPopup = document.querySelector('.popup__form-avatar');


const configAPI = {
    mestoUrl: 'https://nomoreparties.co/v1/cohort-51',
    headers: {
      authorization: '0aa0db8f-1663-456c-947a-270a3646c3a8',
      'Content-Type': 'application/json'
    }
  }

const userId = 'c0fe93bd02816e72b575c7ab'

export {initialCards, validationConfig, buttonEditUser, buttonAddCard, editAvatar, formUserInfoPopup, formCardPopup, formAvatarPopup, configAPI, userId};
