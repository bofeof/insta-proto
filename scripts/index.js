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

// listeners
formUserInfoPopup.addEventListener('submit', submitEditedUserInfo);

buttonEditUser.addEventListener('click', function(){
  editUserInfo();
});

buttonAddCard.addEventListener('click', function(){
  addPhotoCard()});

popUpCloseButtonEditUser.addEventListener('click', function(){closePopUp(popUpEditInfo)});

formCardPopup.addEventListener('submit', submitPhotoCard);

popUpCloseButtonAddCard.addEventListener('click', function(){closePopUp(popUpAddCard)});

//overlay-click
document.addEventListener('click', function(evt){
  const popUpOpened = definePopUpOpened();
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__container') ||
    evt.target.classList.contains('popup__img-container')
    ) {
      closePopUp(popUpOpened);
    }
})


function definePopUpOpened(){
  const popUpOpened = document.querySelector('.popup_opened');
  return popUpOpened
}

function closePopUpByEsc(evt){
  const popUpOpened = definePopUpOpened();
  if ((evt.key==='Escape') && !(popUpOpened === null)){
    closePopUp(popUpOpened);
    };
}

export function showPopUp (elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpByEsc);
}

export function closePopUp(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpByEsc);
}

function editUserInfo() {
  showPopUp(popUpEditInfo);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
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
}

function submitPhotoCard(evt){
  evt.preventDefault();

  const cardData = {'name': photoNameInput.value,
                    'link': photoLinkInput.value};

  const card = new Card(cardData, '#photocard');
  const cardItem = card.generatePhotoCard();

  addItemToContainer(cardItem , galleryContainer);

  closePopUp(popUpAddCard);
}

function addItemToContainer(item, container) {
  container.prepend(item);
}

// create card from const arr
initialCards.forEach(function(cardData){
  const card = new Card(cardData, '#photocard');
  const cardItem = card.generatePhotoCard();
  addItemToContainer(cardItem , galleryContainer);
});

// validation
buttonAddCard.addEventListener('click', function(){
  const formUserValidation = new FormValidator(validationElements, formCardPopup);
  formUserValidation.enableValidation()});

buttonEditUser.addEventListener('click', function(){
  const formCardValidation = new FormValidator(validationElements, formUserInfoPopup);
  formCardValidation.enableValidation()});

formUserValidation.enableValidation();
formCardValidation.enableValidation();
