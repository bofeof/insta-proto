// gallery
const galleryTemplate = document.querySelector('#photocard').content;
const galleryContainer = document.querySelector('.gallery');

// zoom
const popUpImg = document.querySelector('.popup__img-container');
const popUpImgItem = popUpImg.closest('.popup_zoom_img');
const popUpCloseButtonZoom = popUpImgItem.querySelector('.popup__close-button');
const popUpImgCard = popUpImgItem.querySelector('.popup__img-card');
const popUpImgCaption = popUpImgItem.querySelector('.popup__img-caption');

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

popUpCloseButtonZoom.addEventListener('click', function(){closePopUp(popUpImgItem)});

cardFormPopup.addEventListener('submit', submitPhotoCard);

popUpCloseButtonAddCard.addEventListener('click', function(){closePopUp(popUpAddCard)});

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


function definePopUpOpened(){
  const popUpOpened = document.querySelector('.popup_opened');
  return popUpOpened
}

function closePopUpByEsc(evt){
  popUpOpened = definePopUpOpened();
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
  const galleryItemName =  galleryItem.querySelector('.gallery__item-name');
  const galleryItemPhoto = galleryItem.querySelector('.gallery__item-photo');

  galleryItemName.textContent = card.name;
  galleryItemPhoto.src = card.link;
  galleryItemPhoto.alt = card.name;

  handleListenerToItem(galleryItem, '.gallery__remove-button', removePhotoCard);

  handleListenerToItem(galleryItem,'.gallery__like-button', likePhotoCard);

  handleListenerToItem(galleryItem, '.gallery__item-photo', zoomPhotoCard);
  galleryItemPhoto.addEventListener('click', handlePreviewPicture);

  return galleryItem
}

function handlePreviewPicture() {
  showPopUp(popUpImgItem);
}

// set listener to any elem\selector
function handleListenerToItem(galleryItem, selector, itemFunction){
  galleryItem.querySelector(selector).addEventListener('click', function(evt){itemFunction(evt)});
  return galleryItem
}

// add photocard to html
function addItemToContainer(item, container) {
  container.prepend(item);
}

function zoomPhotoCard(item) {
  // get data from clicked card
  const currentCard = item.target.closest('.gallery__item');
  const imgLink = currentCard.querySelector('.gallery__item-photo').getAttribute('src');
  const imgCaption = currentCard.querySelector('.gallery__item-name').textContent;

  // set data to popup img
  popUpImgCard.src = imgLink;
  popUpImgCaption.textContent = imgCaption;
  popUpImgCard.alt = imgCaption;
}


// task 1 (sprint 5)
initialCards.forEach(function(cardData){
  const cardItem = generatePhotoCard(cardData);
  addItemToContainer(cardItem , galleryContainer);
});
