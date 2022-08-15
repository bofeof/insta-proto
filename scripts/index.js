const popUp = document.querySelector('.popup');

function definePopUpOpened(){
  const popUpOpened = document.querySelector('.popup_opened');
  return popUpOpened
}

// close popup - esc
document.addEventListener('keydown', function(evt){
  popUpOpened = definePopUpOpened();
  if ((evt.key==='Escape') && !(popUpOpened === null)){
    closePopUp(popUpOpened);
    }
})

// close popup - overlay-click
document.addEventListener('click', function(evt){
  popUpOpened = definePopUpOpened();
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__container') ||
    evt.target.classList.contains('popup__img-container')
    ) {
      closePopUp(popUpOpened);
  }
})

// gallery
const galleryTemplate = document.querySelector('#photocard').content;
const galleryContainer = document.querySelector('.gallery');

// zoom
const popUpImg = document.querySelector('.popup__img-container');
const popUpImgItem = popUpImg.closest('.popup_zoom_img');
const popUpCloseButtonZoom = popUpImgItem.querySelector('.popup__close-button');

popUpCloseButtonZoom.addEventListener('click', function(){closePopUp(popUpImgItem)});

// photocard
const popUpAddCard = document.querySelector('.popup_create_card');
const buttonAddCard = document.querySelector('.user__add-button');
const photoCard = document.querySelector('.popup__form-photocard');
const popUpCloseButtonAddCard = popUpAddCard.querySelector('.popup__close-button');
const popUpInputPhotoName = document.querySelector('.popup__input_form_photoname');
const popUpInputPhotoLink = document.querySelector('.popup__input_form_photolink');
const photoNameInput = document.querySelector('.popup__input_form_photoname');
const photoLinkInput = document.querySelector('.popup__input_form_photolink');

photoCard.addEventListener('submit', submitPhotoCard);
buttonAddCard.addEventListener('click', addPhotoCard);
popUpCloseButtonAddCard.addEventListener('click', function(){closePopUp(popUpAddCard)});

// user
const popUpEditInfo = document.querySelector('.popup_edit_user');
const buttonEditUser = document.querySelector('.user__edit-button');
const formUserInfo = document.querySelector('.popup__form-userinfo');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_job');
const userName = document.querySelector('.user__name');
const userJob = document.querySelector('.user__job');
const popUpCloseButtonEditUser = popUpEditInfo.querySelector('.popup__close-button');

formUserInfo.addEventListener('submit', submitEditedUserInfo);
buttonEditUser.addEventListener('click', editUserInfo);
popUpCloseButtonEditUser.addEventListener('click', function(){closePopUp(popUpEditInfo)});

// create some cards
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

// popup
function showPopUp (elem) {
  elem.classList.add('popup_opened');
}

function closePopUp(elem) {
  elem.classList.remove('popup_opened');
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
  photoCard.reset()
}

function removePhotoCard (item) {
    const cardItem = item.target.closest('.gallery__item');
    cardItem.remove();
  }

function likePhotoCard(item) {
    const likeButton = item.target.closest('.gallery__like-button');
    likeButton.classList.toggle('gallery__like-button_active');
  }

  function submitPhotoCard(evt){
    evt.preventDefault();

    const cardData = {'name': photoNameInput.value,
                      'link': photoLinkInput.value};

    const cardItem = generatePhotoCard(cardData);
    addItemToContainer(cardItem , galleryContainer);

    closePopUp(popUpAddCard);
  }

// generate card
function generatePhotoCard(card){
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__item-name').textContent = card.name;
  galleryItem.querySelector('.gallery__item-photo').src = card.link;
  galleryItem.querySelector('.gallery__item-photo').alt = card.name;

  setListenerToItem(galleryItem, '.gallery__remove-button', removePhotoCard);
  setListenerToItem(galleryItem,'.gallery__like-button', likePhotoCard);
  setListenerToItem(galleryItem, '.gallery__item-photo', zoomPhotoCard);

  return galleryItem
}

// set listener to any elem\selector
function setListenerToItem(galleryItem, selector, itemFunction){
  galleryItem.querySelector(selector).addEventListener('click', function(evt){itemFunction(evt)});
  return galleryItem
}

// add photocard to html
function addItemToContainer(item, container) {
  container.prepend(item);
}

function zoomPhotoCard(item) {
  showPopUp(popUpImgItem);
  // get data from clicked card
  const currentCard = item.target.closest('.gallery__item');
  const imgLink = currentCard.querySelector('.gallery__item-photo').getAttribute('src');
  const imgCaption = currentCard.querySelector('.gallery__item-name').textContent;

  // set data to popup img
  popUpImgItem.querySelector('.popup__img-card').src = imgLink;
  popUpImgItem.querySelector('.popup__img-caption').textContent = imgCaption;
  popUpImgItem.querySelector('.popup__img-card').alt = imgCaption;
}

// task 1 (sprint 5)
initialCards.forEach(function(cardData){
  const cardItem = generatePhotoCard(cardData);
  addItemToContainer(cardItem , galleryContainer);
});
