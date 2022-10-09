import {
  initialCards,
  validationConfig,
  buttonEditUser,
  buttonAddCard,
  editAvatar,
  formUserInfoPopup,
  formCardPopup,
  formAvatarPopup,
  configAPI,
  userId,
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

// get current user info, cards from server
Promise.all([api.getUserData(), api.getGalleryData()])
  .then(([userData, cardsData]) => {
    // user
    user.setUserInfo({ name: userData.name, about: userData.about });
    user.setUserAvatar({ avatar: userData.avatar });

    // cards
    cardAddSection.renderItems(cardsData);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

/** init popup form with inputs: for card and user */
function initPopUp(selector, handleFormSubmit) {
  const popUp = new PopupWithForm({
    selector: selector,
    handleFormSubmit: handleFormSubmit,
  });
  return popUp;
}

/** init popup confirm for removing */
function initPopUpConfirm(selector, handleFormSubmit) {
  const popUp = new PopupConfirm({
    selector: selector,
    handleFormSubmit: handleFormSubmit,
  });
  return popUp;
}

/** EDIT USER */
const user = new UserInfo('.user__name', '.user__job', '.user__avatar');
const popUpEditUser = initPopUp('.popup_edit_user', handleUserFormSubmit);
popUpEditUser.setEventListeners();
buttonEditUser.addEventListener('click', openPopUpEditUser);

/** action after submitting user-form*/
function handleUserFormSubmit(formData) {
  popUpEditUser.changeButtonText('Сохранение...');
  /** set data to server and update dom */
  api
    .setUserData(formData)
    .then((data) => {
      user.setUserInfo({ name: data.name, about: data.about });
      user.setUserAvatar(data);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popUpEditUser.close();
      popUpEditUser.changeButtonText('Сохранить');
    });

  formUserValidation.resetValidation();
}

function openPopUpEditUser() {
  /**  open edit-user popup and set listeners */
  popUpEditUser.open();

  /** get inputs-value from dom-data */
  const userData = user.getUserInfo();

  /** set user data to DOM*/
  popUpEditUser.setInputValues(userData);

  formUserValidation.resetValidation();
}

/** EDIT AVATAR */
const popUpEditAvatar = new initPopUp(
  '.popup_change_avatar',
  handleAvatarFormSubmit
);
popUpEditAvatar.setEventListeners();
editAvatar.addEventListener('click', openPopUpEditAvatar);

/**  submit new avatar to server and dom */
function handleAvatarFormSubmit(formData) {
  popUpEditAvatar.changeButtonText('Сохранение...');

  /** set data to server and update dom */
  api
    .changeUserAvatar(formData)
    .then((data) => {
      api.changeUserAvatar(formData);
      user.setUserAvatar(formData);
      popUpEditAvatar.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => popUpEditAvatar.changeButtonText('Сохранить'));

  formUserValidation.resetValidation();
}

function openPopUpEditAvatar() {
  /**  open edit-user popup and set listeners */
  popUpEditAvatar.open();

  /** get inputs-value from dom-data */
  const userData = user.getUserInfo();

  /** set data to input form (current link) */
  popUpEditAvatar.setInputValues(userData);

  formAvatarValidation.resetValidation();
}

/** ADD PHOTO */

const popUpAddCard = initPopUp('.popup_create_card', handleCardFormSubmit);
popUpAddCard.setEventListeners();

// submit popUpAddCard
function handleCardFormSubmit(formData) {
  popUpAddCard.changeButtonText('Создание...');

  api
    .addPhotoCard(formData)
    .then((cardData) => {
      /** get generated card */
      const photoCard = createCard(cardData);

      cardAddSection.addToBegin(photoCard);

      /** close popup add-card */
      popUpAddCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popUpAddCard.changeButtonText('Создать');
    });

  formCardValidation.resetValidation();
}

const popUpImage = new PopupWithImage('.popup.popup_zoom_img');
popUpImage.setEventListeners();

const confirmPopup = initPopUpConfirm('.popup_confirm', handleConfirmSubmit);
confirmPopup.setEventListeners();

function handleConfirmSubmit() {
  const photoCard = handleConfirmSubmit.photoCard;
  const photoCardId = photoCard.photoCardId;

  confirmPopup.changeButtonText('Удаление...');
  /**  remove from server */
  api
    .removePhotoCard(photoCardId)
    .then(() => {
      // remove dom
      photoCard.deletePhotoCard();
      confirmPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(confirmPopup.changeButtonText('Да'));
}

const cardAddSection = initCardSection([], renderCard, '.gallery');

/** init card section for new photo: ({list of items(cards), render func}, section selector) */
function initCardSection(itemList, renderer, selector) {
  const cardSection = new Section(renderer, selector);
  return cardSection;
}

function renderCard(cardData) {
  const photoCard = createCard(cardData);
  /** add dom */
  cardAddSection.addToEnd(photoCard);
}

// create new card with listeners
function createCard(formData) {
  const photoCard = new Card({
    data: formData,

    templateSelector: '#photocard',

    handleCardClick: (cardData) => {
      popUpImage.open(cardData);
    },

    handleCardRemove: () => {
      confirmPopup.open();
      /**  set property to func */
      handleConfirmSubmit.photoCard = photoCard;
    },

    handleCardLike: (photoCardId) => {
      if (photoCard.isLiked()) {
        api
          .removePhotoLike(photoCardId)
          .then((res) => photoCard.setCardLikes(res.likes))
          .catch((err) => console.log(`Ошибка: ${err}`));
      } else {
        api
          .addPhotoLike(photoCardId)
          .then((res) => photoCard.setCardLikes(res.likes))
          .catch((err) => console.log(`Ошибка: ${err}`));
      }
    },

    userId: userId,
  });

  const newCard = photoCard.generatePhotoCard();
  return newCard;
}

function openPopUpAddCard() {
  popUpAddCard.open();
  formCardValidation.resetValidation();
}

buttonAddCard.addEventListener('click', openPopUpAddCard);

/** validation */
const formUserValidation = new FormValidator(
  validationConfig,
  formUserInfoPopup
);
const formCardValidation = new FormValidator(validationConfig, formCardPopup);
const formAvatarValidation = new FormValidator(
  validationConfig,
  formAvatarPopup
);

formCardValidation.enableValidation();
formUserValidation.enableValidation();
formAvatarValidation.enableValidation();
