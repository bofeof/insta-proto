const popUpWindow = document.querySelector('.popup');

// USER info
let popUpEditInfo = document.querySelector('.popup_edit_user');
const editButton = document.querySelector('.user__edit-button');

let formUserInfo = document.querySelector('.popup__form-userinfo');
let nameInput = document.querySelector('.popup__input_form_name');
let jobInput = document.querySelector('.popup__input_form_job');
let userName = document.querySelector('.user__name');
let userJob = document.querySelector('.user__job');

// CARD info
let popUpAddCard = document.querySelector('.popup_create_card');
const addButton = document.querySelector('.user__add-button');
let photoCard = document.querySelector('.popup__form-photocard');

let galleryContainer = document.querySelector('.gallery');

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


function addRemoveEvtListener(item) {
  item.querySelector('.gallery__remove-button').addEventListener('click', function(evt){
    let listItem = evt.target.closest('.gallery__item');
    listItem.remove();
  })}

function addLikeEvtListener(item) {
  item.querySelector('.gallery__like-button').addEventListener('click', function(evt){
    evt.preventDefault();
    let card = evt.target.closest('.gallery__item');

    let likeButton = card.querySelector('.gallery__like-button');
    likeButton.classList.toggle('gallery__like-button_active');

    if (likeButton.classList.contains('gallery__like-button_active')){
      likeButton.style.backgroundImage = 'url(../images/like/like-active.svg)';
    } else {
      likeButton.style.backgroundImage = 'url(../images/like/like-disabled.svg)';
    }

  })}

  function addImgEvtListener(item) {
    item.querySelector('.gallery__item-photo').addEventListener('click', function(evt){
      let popUpImg = document.querySelector('.popup__img-container');
      let imgItem = popUpImg.parentElement;
      closePopUpButton = imgItem.querySelector('.popup__close-button');

      showPopUp(imgItem);

      // get data from clicked card
      let currentCard = evt.target.parentElement;
      let imgLink = currentCard.querySelector('.gallery__item-photo').getAttribute('src');
      let imgCaption  =currentCard.querySelector('.gallery__item-name').textContent;

      // set data to popup img
      imgItem.querySelector('.popup__img-card').src = imgLink;
      imgItem.querySelector('.popup__img-caption').textContent = imgCaption;

      closePopUpButton.addEventListener('click', closePopUp);

    })
}

// POPUP
function showPopUp (elem) {
  elem.classList.add('popup_opened');
}

function closePopUp() {
  let form = document.querySelector('.popup_opened');
  form.classList.remove('popup_opened');
}

// USER
// open form
editButton.addEventListener('click', function(){
  showPopUp(popUpEditInfo);

  let form = document.querySelector('.popup_opened');
  closePopUpButton = form.querySelector('.popup__close-button')
  closePopUpButton.addEventListener('click', closePopUp);

  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
})

// submit user info
formUserInfo.addEventListener('submit', formSubmitHandler);
function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopUp();
}

// CARD
// open form
addButton.addEventListener('click', function(){
  showPopUp(popUpAddCard);

  let form = document.querySelector('.popup_opened');
  closePopUpButton = form.querySelector('.popup__close-button');

  document.querySelector('.popup__input_form_photoname').value = '';
  document.querySelector('.popup__input_form_photolink').value = '';

  closePopUpButton.addEventListener('click', closePopUp);
});


function submitPhotoCard(evt){
  evt.preventDefault();

  let photoNameInput = document.querySelector('.popup__input_form_photoname').value;
  let photoLinkInput = document.querySelector('.popup__input_form_photolink').value;

  let card = {'name': photoNameInput,
              'link': photoLinkInput};

  generatePhotoCard(card);

  closePopUp();
};

// generate card from input form
function generatePhotoCard(card){
  const galleryTemplate = document.querySelector('#photocard').content;
  const galleryItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);

  galleryItem.querySelector('.gallery__item-name').textContent = card.name;
  galleryItem.querySelector('.gallery__item-photo').src = card.link;

  addRemoveEvtListener(galleryItem);
  addLikeEvtListener(galleryItem);
  addImgEvtListener(galleryItem);

  addPhotoCard(galleryItem, galleryContainer);
}

// add photocard to html
function addPhotoCard(item, container) {
  container.prepend(item);
}

// submit photocard
photoCard.addEventListener('submit', submitPhotoCard)

// event-lis for default photocards - remove, likes, img
galleryContainer.querySelectorAll('.gallery__item').forEach(addRemoveEvtListener);
galleryContainer.querySelectorAll('.gallery__item').forEach(addImgEvtListener);
galleryContainer.querySelectorAll('.gallery__item').forEach(addLikeEvtListener);

// task 1 (sprint 5)
initialCards.forEach(generatePhotoCard);

