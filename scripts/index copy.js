const popUpWindow = document.querySelector('.popup');

// Img zoom
const popUpZoomImg =  document.querySelector('.popup_zoom_img');

// USER info
const popUpEditInfo = document.querySelector('.popup_edit_user');
const buttonEditUser = document.querySelector('.user__edit-button');

const formUserInfo = document.querySelector('.popup__form-userinfo');
const nameInput = document.querySelector('.popup__input_form_name');
const jobInput = document.querySelector('.popup__input_form_job');
const userName = document.querySelector('.user__name');
const userJob = document.querySelector('.user__job');

// CARD info
const popUpAddCard = document.querySelector('.popup_create_card');
const buttonAddCard = document.querySelector('.user__add-button');
const photoCard = document.querySelector('.popup__form-photocard');

const galleryContainer = document.querySelector('.gallery');

// f
// const popUpImg = document.querySelector('.popup__img-container');
// const form = document.querySelector('.popup_opened');

const popUpOpened = document.querySelector('.popup_opened');

// const photoNameInput = document.querySelector('.popup__input_form_photoname').value;
// const photoLinkInput = document.querySelector('.popup__input_form_photolink').value;


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

function removePhotoCard (item) {
    const cardItem = item.target.closest('.gallery__item');
    cardItem.remove();
  }

function likePhotoCard(item) {
    const card = item.target.closest('.gallery__item');
    const likeButton = card.querySelector('.gallery__like-button');

    likeButton.classList.toggle('gallery__like-button_active');

  }

  function zoomPhotoCard(item) {
      const popUpImg = document.querySelector('.popup__img-container');
      const popUpImgItem = popUpImg.closest('.popup_zoom_img');
      closePopUpButton = popUpImgItem.querySelector('.popup__close-button');

      showPopUp(popUpImgItem);

      // get data from clicked card
      const currentCard = item.target.closest('.gallery__item');
      const imgLink = currentCard.querySelector('.gallery__item-photo').getAttribute('src');
      const imgCaption = currentCard.querySelector('.gallery__item-name').textContent;

      // set data to popup img
      popUpImgItem.querySelector('.popup__img-card').src = imgLink;
      popUpImgItem.querySelector('.popup__img-caption').textContent = imgCaption;
      popUpImgItem.querySelector('.popup__img-card').alt = imgCaption;

      closePopUpButton.addEventListener('click', closePopUp);
    }

// POPUP
function showPopUp (elem) {
  elem.classList.add('popup_opened');
}

function closePopUp(item) {
  // const form = document.querySelector('.popup_opened');
  console.log(item);
  item.classList.remove('popup_opened');
}


const testClose = document.querySelector('.popup__close-button');
testClose.addEventListener('click', function(evt){closePopUp(evt.target)});



// USER
// open form
buttonEditUser.addEventListener('click', function(){
  showPopUp(popUpEditInfo);

  // const form = document.querySelector('.popup_opened');
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
buttonAddCard.addEventListener('click', function(){
  showPopUp(popUpAddCard);

  // const form = document.querySelector('.popup_opened');
  closePopUpButton = form.querySelector('.popup__close-button');

  document.getElementsByClassName('.popup__input_form_photoname').reset;
  document.getElementsByClassName('.popup__input_form_photolink').reset;

  closePopUpButton.addEventListener('click', closePopUp);
});


function submitPhotoCard(evt){
  evt.preventDefault();

  const photoNameInput = document.querySelector('.popup__input_form_photoname').value;
  const photoLinkInput = document.querySelector('.popup__input_form_photolink').value;

  const card = {'name': photoNameInput,
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
  galleryItem.querySelector('.gallery__item-photo').alt = card.name;
  // set listeners
  galleryItem.querySelector('.gallery__remove-button').addEventListener('click', function(evt){removePhotoCard(evt)});
  galleryItem.querySelector('.gallery__like-button').addEventListener('click', function(evt){likePhotoCard(evt)});
  galleryItem.querySelector('.gallery__item-photo').addEventListener('click', function(evt){zoomPhotoCard(evt)});

  addPhotoCard(galleryItem, galleryContainer);
}

// add photocard to html
function addPhotoCard(item, container) {
  container.prepend(item);
}

// submit photocard
photoCard.addEventListener('submit', submitPhotoCard)

// task 1 (sprint 5)
initialCards.forEach(generatePhotoCard);

