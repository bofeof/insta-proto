const galleryTemplate = document.querySelector('#photocard').content;
const galleryContainer = document.querySelector('.gallery');

// zoom
const popUpImg = document.querySelector('.popup__img-container');
const popUpImgItem = popUpImg.closest('.popup_zoom_img');
const popUpCloseButtonZoom = popUpImgItem.querySelector('.popup__close-button');

popUpCloseButtonZoom.addEventListener('click', closePopUp);

// photocard
const popUpAddCard = document.querySelector('.popup_create_card');
const buttonAddCard = document.querySelector('.user__add-button');
const photoCard = document.querySelector('.popup__form-photocard');
const popUpCloseButtonAddCard = popUpAddCard.querySelector('.popup__close-button');

popUpCloseButtonAddCard.addEventListener('click', closePopUp);
photoCard.addEventListener('submit', submitPhotoCard);
buttonAddCard.addEventListener('click', addPhotoCard);

// user
const popUpEditInfo = document.querySelector('.popup_edit_user');
const buttonEditUser = document.querySelector('.user__edit-button');
const formUserInfo = document.querySelector('.popup__form-userinfo');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_job');
const userName = document.querySelector('.user__name');
const userJob = document.querySelector('.user__job');
const popUpCloseButtonEditUser = popUpEditInfo.querySelector('.popup__close-button');

popUpCloseButtonEditUser.addEventListener('click', closePopUp);
formUserInfo.addEventListener('submit', submitEditedUserInfo);
buttonEditUser.addEventListener('click', editUserInfo);

// task1
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
  elem.target.closest('.popup_opened').classList.remove('popup_opened');
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
  closePopUp(evt);
}

// photocard func
function addPhotoCard(){
  showPopUp(popUpAddCard);
  document.querySelector('.popup__input_form_photoname').value = '';
  document.querySelector('.popup__input_form_photolink').value = '';
}

function removePhotoCard (item) {
    const cardItem = item.target.closest('.gallery__item');
    cardItem.remove();
  }

function likePhotoCard(item) {
    const card = item.target.closest('.gallery__item');
    const likeButton = card.querySelector('.gallery__like-button');
    likeButton.classList.toggle('gallery__like-button_active');
  }

  function submitPhotoCard(evt){
    evt.preventDefault();

    const photoNameInput = document.querySelector('.popup__input_form_photoname').value;
    const photoLinkInput = document.querySelector('.popup__input_form_photolink').value;

    const cardData = {'name': photoNameInput,
                      'link': photoLinkInput};

    const cardItem = generatePhotoCard(cardData);
    addItemToContainer(cardItem , galleryContainer);

    closePopUp(evt);
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
