import {
  initialCards,
  validationConfig,
  buttonEditUser,
  buttonAddCard,
  formUserInfoPopup,
  formCardPopup,
} from './scripts/utils/constants.js';

import { Card } from './scripts/components/Card.js';
import { PopupWithImage } from './scripts/components/PopupWithImage.js';
import { PopupWithForm } from './scripts/components/PopupWithForm.js';
import { UserInfo } from './scripts/components/UserInfo.js';

import { Section } from './scripts/components/Section.js';

import { FormValidator } from './scripts/components/FormValidator.js';

import './styles/index.css';


/** init popup form with inputs: for card and user */
function initPopUp(selector, handleFormSubmit) {
  const popUp = new PopupWithForm({
    selector: selector,
    handleFormSubmit: handleFormSubmit,
  });

  return popUp;
}

/** init card section for new photo: (photodata, render func, section selector) */
function initCardSection(items, renderer, selector) {
  const cardSection = new Section({ items: items, renderer: renderer }, selector);
  return cardSection
}


/** EDIT USER */

const popUpEditUser = initPopUp('.popup_edit_user', handlePopUpUserSubmit);
popUpEditUser.setEventListeners();

const user = new UserInfo('.user__name', '.user__job');

/** set new user data after submit */
function handlePopUpUserSubmit(formData) {
  user.setUserInfo(formData);
  popUpEditUser.close();
  formUserValidation.resetValidation();
}

function openPopUpEditUser() {

  /**  open edit-user popup and set listeners */
  popUpEditUser.open();

  /** get inputs-value from dom-data */
  const userData = user.getUserInfo();

  /** set data {selector: data, selector: data} */
  const userInputData = {'.popup__input_form_name': userData.userName, '.popup__input_form_job': userData.jobInfo}
  popUpEditUser.setInputValues(userInputData);

  formUserValidation.resetValidation();
}

buttonEditUser.addEventListener('click', openPopUpEditUser);


/** ADD PHOTO */

const popUpAddCard = initPopUp('.popup_create_card', handlePopUpCardSubmit);

popUpAddCard.setEventListeners();

const popUpImage = new PopupWithImage('.popup.popup_zoom_img');
popUpImage.setEventListeners();

const cardAddSection = initCardSection([], renderCard, '.gallery');

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
  });

  return card.generatePhotoCard();
}

function handlePopUpCardSubmit(formData) {
  /** get generated card */
  const photoCard = createCard(formData);

  /** add dom */
  cardAddSection.addItem(photoCard);
  /** close popup add-card */
  popUpAddCard.close();

  formCardValidation.resetValidation();
}

function addPhotoCard() {
  popUpAddCard.open();
  formCardValidation.resetValidation();
}

buttonAddCard.addEventListener('click', addPhotoCard);


/** add photocards from initialCards */
cardAddSection._itemList = initialCards;
cardAddSection.renderItems();


/** validation */
const formUserValidation = new FormValidator(
  validationConfig,
  formUserInfoPopup
);
const formCardValidation = new FormValidator(validationConfig, formCardPopup);

formCardValidation.enableValidation();
formUserValidation.enableValidation();
