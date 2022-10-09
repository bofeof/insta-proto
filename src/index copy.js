import {
  initialCards,
  validationConfig,
  buttonEditUser,
  buttonAddCard,
  editAvatar,
  formUserInfoPopup,
  formCardPopup,
  formAvatarPopup,
  configAPI
} from './scripts/utils/constants.js';

import { Card } from './scripts/components/Card.js';
import { PopupWithImage } from './scripts/components/PopupWithImage.js';
import { PopupWithForm } from './scripts/components/PopupWithForm.js';
import { PopupConfirm } from './scripts/components/PopupConfirm';
import { UserInfo } from './scripts/components/UserInfo.js';

import { Section } from './scripts/components/Section.js';

import { API } from './scripts/components/API.js';

import { FormValidator } from './scripts/components/FormValidator.js';

import './styles/index.css';


const api = new API(configAPI);


/** init popup form with inputs: for card and user */
function initPopUp(selector, handleFormSubmit) {
  const popUp = new PopupWithForm({
    selector: selector,
    handleFormSubmit: handleFormSubmit,
  });

  return popUp;
}


/** EDIT USER */
const user = new UserInfo('.user__name', '.user__job', '.user__avatar');
const popUpEditUser = initPopUp('.popup_edit_user', handlePopUpUserSubmit);
popUpEditUser.setEventListeners();

// get current user info from server
api.getUserData()
.then((data) => {
  user.setUserInfo({name: data.name, about : data.about});
  user.setUserAvatar({avatar: data.avatar});
})

/** set new user data after submit */
function handlePopUpUserSubmit(formData) {

  popUpEditUser.changeButtonText('Сохранение...');

  /** set data to server and update dom */
  api.setUserData(formData)
  .then((data) => {
    user.setUserInfo({name: data.name, about : data.about});
    user.setUserAvatar({avatar: data.avatar});
    popUpEditUser.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => popUpEditUser.changeButtonText('Сохранить'))

  formUserValidation.resetValidation();

}

function openPopUpEditUser() {

  /**  open edit-user popup and set listeners */
  popUpEditUser.open();

  /** get inputs-value from dom-data */
  const userData = user.getUserInfo();

  /** set data {selector: data, selector: data} */
  const userInputData = {'.popup__input_form_name': userData.name, '.popup__input_form_job': userData.about}
  popUpEditUser.setInputValues(userInputData);

  formUserValidation.resetValidation();
}

buttonEditUser.addEventListener('click', openPopUpEditUser);


/** EDIT AVATAR */
const popUpEditAvatar = new initPopUp('.popup_change_avatar', handlePopUpAvatarSubmit)
popUpEditAvatar.setEventListeners();

function handlePopUpAvatarSubmit(formData){

  popUpEditAvatar.changeButtonText('Сохранение...');

  // set data to server and update dom
  api.changeUserAvatar(formData)
  .then((data) => {
    api.changeUserAvatar({avatar: formData.avatar});
    user.setUserAvatar({avatar: formData.avatar});
    popUpEditAvatar.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => popUpEditAvatar.changeButtonText('Сохранить'))

  formUserValidation.resetValidation();

};

function openPopUpEditAvatar(){

  /**  open edit-user popup and set listeners */
  popUpEditAvatar.open();

/** get inputs-value from dom-data */
  const userData = user.getUserInfo();

  /** set data {selector: data, selector: data} */
  popUpEditAvatar.setInputValues({'.popup__input_form_avatar' : userData.avatar})

  formAvatarValidation.resetValidation();
}

editAvatar.addEventListener('click', openPopUpEditAvatar);



/** ADD PHOTO */

const popUpAddCard = initPopUp('.popup_create_card', handlePopUpCardSubmit);
popUpAddCard.setEventListeners();

const popUpImage = new PopupWithImage('.popup.popup_zoom_img');
popUpImage.setEventListeners();

const cardAddSection = initCardSection(initialCards, renderCard, '.gallery');

/** init card section for new photo: ({list of items(cards), render func}, section selector) */
function initCardSection(itemList, renderer, selector) {
  const cardSection = new Section({items: itemList, renderer: renderer}, selector);
  return cardSection
}

function renderCard(item) {
  const photoCard = createCard(item);
  /** add dom */
  cardAddSection.addItem(photoCard);
}

function createCard(formData) {
  const card = new Card({
    data: formData,
    templateSelector: '#photocard',

    /** img popup func */
    handleCardClick: (cardData) => {
      popUpImage.open(cardData);
    },

    handleCardRemove: handleCardRemove,
    handleCardLike: ()=>{},
  });

  return card.generatePhotoCard();
}


function handlePopUpCardSubmit(formData) {
  popUpAddCard.changeButtonText('Создание...');

  api.addPhotoCard(formData)
  .then((cardData)=>{

    /** get generated card */
    const photoCard = createCard(cardData);

    /** add dom */
    cardAddSection.addItem(photoCard);
    /** close popup add-card */
    popUpAddCard.close();
  })
  .catch((err)=>{console.log(`Ошибка: ${err}`)})
  .finally(()=>{ popUpAddCard.changeButtonText('Создать')})

  formCardValidation.resetValidation();
}



// confirm popup
const confirmPopup = new PopupConfirm({selector:'.popup_confirm'});
confirmPopup.setEventListeners();


function handleCardRemove(photoCardId) {

  confirmPopup.open();

  confirmPopup.handleFormSubmit = () => {
    confirmPopup.changeButtonText('Удаление...')
    // remove from server
    api.removePhotoCard(photoCardId)
    .then(() =>
      // remove dom
      card.deletePhotoCard()
    )
    .catch((err)=> {console.log(`Ошибка: ${err}`)})
    .finally(confirmPopup.changeButtonText('Да'))

    confirmPopup.close()

  }

}


function handleCardLike(){}

function addPhotoCard() {
  popUpAddCard.open();
  formCardValidation.resetValidation();
}

buttonAddCard.addEventListener('click', addPhotoCard);


/** add photocards from initialCards */
// api.getGalleryData((cardList)=>{
//   cardAddSection.itemList = cardList
// })

// cardAddSection.renderItems();


/** validation */
const formUserValidation = new FormValidator(validationConfig, formUserInfoPopup);
const formCardValidation = new FormValidator(validationConfig, formCardPopup);
const formAvatarValidation = new FormValidator(validationConfig, formAvatarPopup);

formCardValidation.enableValidation();
formUserValidation.enableValidation();
formAvatarValidation.enableValidation();
