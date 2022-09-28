import {initialCards, validationElements} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

import {Section} from '../components/Section.js';

import {FormValidator} from '../components/FormValidator.js';


// gallery
const galleryContainer = document.querySelector('.gallery');

// formCardPopup
// const popUpAddCard = document.querySelector('.popup_create_card');
const buttonAddCard = document.querySelector('.user__add-button');
// const formCardPopup = document.querySelector('.popup__form-photocard');
// const popUpCloseButtonAddCard = popUpAddCard.querySelector('.popup__close-button');
// const photoNameInput = document.querySelector('.popup__input_form_photoname');
// const photoLinkInput = document.querySelector('.popup__input_form_photolink');

// user
// const popUpEditInfo = document.querySelector('.popup_edit_user');
// const buttonEditUser = document.querySelector('.user__edit-button');
// const formUserInfoPopup = document.querySelector('.popup__form-userinfo');
// const nameInput = document.querySelector('.popup__input_form_name');
// const jobInput = document.querySelector('.popup__input_form_job');
// const userName = document.querySelector('.user__name');
// const userJob = document.querySelector('.user__job');
// const popUpCloseButtonEditUser = popUpEditInfo.querySelector('.popup__close-button');

// zoom
// const popUpImg = document.querySelector('.popup__img-container');
// const popUpImgItem = popUpImg.closest('.popup_zoom_img');
// const popUpCloseButtonZoom = popUpImgItem.querySelector('.popup__close-button');

// listeners
// popUpCloseButtonZoom.addEventListener('click', function(){closePopUp(popUpImgItem)});

// отправка данных пользователя
// formUserInfoPopup.addEventListener('submit', submitEditedUserInfo);


// EDIT USER

const buttonEditUser = document.querySelector('.user__edit-button');
buttonEditUser.addEventListener('click', function(){

  // editUserInfo(); old

  const popUpUser = new PopupWithForm({selector: '.popup_edit_user',

    // действия при сабмите
    handleFormSubmit: (formData) => {
      // username, jobinfo = {formData};



    }});


    // установка значений как на сайте
    const user = new UserInfo('.user__name', '.user__job');
    const userData = user.getUserInfo();

    popUpUser.setInputValues(userData)

    popUpUser.open();
    popUpUser.setEventListeners();


});

buttonAddCard.addEventListener('click', function(){
  addPhotoCard();
});

// popUpCloseButtonEditUser.addEventListener('click', function(){closePopUp(popUpEditInfo)});

// formCardPopup.addEventListener('submit', submitPhotoCard);

// popUpCloseButtonAddCard.addEventListener('click', function(){closePopUp(popUpAddCard)});

//overlay-click
// function closePopUpByClick(evt){
//   if (
//     evt.target.classList.contains('popup') ||
//     evt.target.classList.contains('popup__container') ||
//     evt.target.classList.contains('popup__img-container')
//     ) {
//       const popUpOpened = evt.currentTarget;
//       closePopUp(popUpOpened);
//     }
// }

// function closePopUpByEsc(evt){
//   if (evt.key ==='Escape') {
//     const popUpOpened = document.querySelector('.popup_opened');
//     closePopUp(popUpOpened)
//   }
// }

// export function showPopUp (elem) {

//   elem.classList.add('popup_opened');
//   elem.addEventListener('click', closePopUpByClick);
//   document.addEventListener('keydown', closePopUpByEsc);
// }

// function closePopUp(elem) {
//   elem.classList.remove('popup_opened');
//   elem.removeEventListener('click', closePopUpByClick);
//   document.removeEventListener('keydown', closePopUpByEsc);
// }

// function editUserInfo() {
//   showPopUp(popUpEditInfo);
//   nameInput.value = userName.textContent;
//   jobInput.value = userJob.textContent;
//   formUserValidation.resetValidation();
// }

// function submitEditedUserInfo(evt) {
//   evt.preventDefault();
//   userName.textContent = nameInput.value;
//   userJob.textContent = jobInput.value;
//   closePopUp(popUpEditInfo);
// }

// function addPhotoCard(){
//   showPopUp(popUpAddCard);
//   formCardPopup.reset()
//   formCardValidation.resetValidation();
// }

// function createCard(cardData){
//   const card = new Card(cardData, '#photocard');
//   return card.generatePhotoCard();
// }

// // function addItemToContainer(item, container) {
// //   container.prepend(item);
// // }

// function submitPhotoCard(evt){
//   evt.preventDefault();

//   const cardData = {'name': photoNameInput.value,
//                     'link': photoLinkInput.value};

//   const cardItem = createCard(cardData);

//   addItemToContainer(cardItem , galleryContainer);

//   closePopUp(popUpAddCard);
// }

// // create card from const arr
// initialCards.forEach(function(cardData){
//   const cardItem = createCard(cardData);
//   addItemToContainer(cardItem , galleryContainer);
// });

// // validation
// const formUserValidation = new FormValidator(validationElements, formUserInfoPopup);
// const formCardValidation = new FormValidator(validationElements, formCardPopup );

// formUserValidation.enableValidation();
// formCardValidation.enableValidation();

// formUserValidation.resetValidation();
// formCardValidation.resetValidation();
