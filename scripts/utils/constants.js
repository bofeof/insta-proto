const initialCards = [
  {
    photoname: 'Архыз',
    photolink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    photoname: 'Челябинская область',
    photolink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    photoname: 'Иваново',
    photolink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    photoname: 'Камчатка',
    photolink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    photoname: 'Холмогорский район',
    photolink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    photoname: 'Байкал',
    photolink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationElements = {
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



export {initialCards, validationElements, buttonEditUser, buttonAddCard, formUserInfoPopup, formCardPopup};
