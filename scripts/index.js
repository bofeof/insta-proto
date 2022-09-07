import {initialCards} from './constants.js';
import {Card} from './Card.js';
export {showPopUp, closePopUp, buttonAddCard, buttonEditUser};


// gallery
const galleryContainer = document.querySelector('.gallery');

// cardFormPopup
const popUpAddCard = document.querySelector('.popup_create_card');
const buttonAddCard = document.querySelector('.user__add-button');
const cardFormPopup = document.querySelector('.popup__form-photocard');
const popUpCloseButtonAddCard = popUpAddCard.querySelector('.popup__close-button');
const popUpInputPhotoName = document.querySelector('.popup__input_form_photoname');
const popUpInputPhotoLink = document.querySelector('.popup__input_form_photolink');
const photoNameInput = document.querySelector('.popup__input_form_photoname');
const photoLinkInput = document.querySelector('.popup__input_form_photolink');

// user
const popUpEditInfo = document.querySelector('.popup_edit_user');
const buttonEditUser = document.querySelector('.user__edit-button');
const formUserInfo = document.querySelector('.popup__form-userinfo');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_job');
const userName = document.querySelector('.user__name');
const userJob = document.querySelector('.user__job');
const popUpCloseButtonEditUser = popUpEditInfo.querySelector('.popup__close-button');


// listeners
formUserInfo.addEventListener('submit', submitEditedUserInfo);

buttonEditUser.addEventListener('click', function(){
  editUserInfo();
});

buttonAddCard.addEventListener('click', function(){
  addPhotoCard()});

popUpCloseButtonEditUser.addEventListener('click', function(){closePopUp(popUpEditInfo)});


cardFormPopup.addEventListener('submit', submitPhotoCard);

popUpCloseButtonAddCard.addEventListener('click', function(){closePopUp(popUpAddCard)});

// close popup - overlay-click
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

// popup
function showPopUp (elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpByEsc);
}

function closePopUp(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpByEsc);
}

// user func
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


// photocard func
function addPhotoCard(){
  showPopUp(popUpAddCard);
  cardFormPopup.reset()
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


// add photocard to html
function addItemToContainer(item, container) {
  container.prepend(item);
}

initialCards.forEach(function(cardData){

  const card = new Card(cardData, '#photocard');

  const cardItem = card.generatePhotoCard();

  addItemToContainer(cardItem , galleryContainer);
});
