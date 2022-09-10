import {initialCards, validationElements} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// gallery
const galleryContainer = document.querySelector('.gallery');

// formCardPopup
const popUpAddCard = document.querySelector('.popup_create_card');
const buttonAddCard = document.querySelector('.user__add-button');
const formCardPopup = document.querySelector('.popup__form-photocard');
const popUpCloseButtonAddCard = popUpAddCard.querySelector('.popup__close-button');
const photoNameInput = document.querySelector('.popup__input_form_photoname');
const photoLinkInput = document.querySelector('.popup__input_form_photolink');

// user
const popUpEditInfo = document.querySelector('.popup_edit_user');
const buttonEditUser = document.querySelector('.user__edit-button');
const formUserInfoPopup = document.querySelector('.popup__form-userinfo');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_job');
const userName = document.querySelector('.user__name');
const userJob = document.querySelector('.user__job');
const popUpCloseButtonEditUser = popUpEditInfo.querySelector('.popup__close-button');

// zoom
const popUpImg = document.querySelector('.popup__img-container');
const popUpImgItem = popUpImg.closest('.popup_zoom_img');
const popUpCloseButtonZoom = popUpImgItem.querySelector('.popup__close-button');

// listeners
popUpCloseButtonZoom.addEventListener('click', function(){closePopUp(popUpImgItem)});

formUserInfoPopup.addEventListener('submit', submitEditedUserInfo);

buttonEditUser.addEventListener('click', function(){
  editUserInfo();
});

buttonAddCard.addEventListener('click', function(){
  addPhotoCard();
});

popUpCloseButtonEditUser.addEventListener('click', function(){closePopUp(popUpEditInfo)});

formCardPopup.addEventListener('submit', submitPhotoCard);

popUpCloseButtonAddCard.addEventListener('click', function(){closePopUp(popUpAddCard)});

//overlay-click
function closePopUpByClick(evt, popUpOpened){
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__container') ||
    evt.target.classList.contains('popup__img-container')
    ) {
      closePopUp(popUpOpened);
    }
}

function closePopUpByEsc(evt, popUpOpened){
  if (evt.key ==='Escape') {
    closePopUp(popUpOpened)
  }
}

export function showPopUp (elem) {

  formUserValidation.resetValidation();
  formCardValidation.resetValidation();

  elem.classList.add('popup_opened');
  const popUpOpened = document.querySelector('.popup_opened');

  popUpOpened.addEventListener('click', (evt) => {closePopUpByClick(evt, popUpOpened)});
  document.addEventListener('keydown', (evt) => {closePopUpByEsc(evt, popUpOpened)})
}

function closePopUp(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpByEsc);
}

function editUserInfo() {
  showPopUp(popUpEditInfo);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  formUserValidation.resetValidation();
}

function submitEditedUserInfo(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopUp(popUpEditInfo);

}

function addPhotoCard(){
  showPopUp(popUpAddCard);
  formCardPopup.reset()
  formCardValidation.resetValidation();
}

function createCard(cardData){
  const card = new Card(cardData, '#photocard');
  return card.generatePhotoCard();
}

function addItemToContainer(item, container) {
  container.prepend(item);
}

function submitPhotoCard(evt){
  evt.preventDefault();

  const cardData = {'name': photoNameInput.value,
                    'link': photoLinkInput.value};

  const cardItem = createCard(cardData);

  addItemToContainer(cardItem , galleryContainer);

  closePopUp(popUpAddCard);
}

// create card from const arr
initialCards.forEach(function(cardData){

  const cardItem = createCard(cardData);

  addItemToContainer(cardItem , galleryContainer);
});

// validation
const formUserValidation = new FormValidator(validationElements, formCardPopup);
const formCardValidation = new FormValidator(validationElements, formUserInfoPopup);

formUserValidation.enableValidation();
formCardValidation.enableValidation();

formUserValidation.resetValidation();
formCardValidation.resetValidation();
