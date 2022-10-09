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
    cardAddSection.itemList = cardsData;
    cardAddSection.renderItems();
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

/** init popup form with inputs: for card and user */
function initPopUp(selector) {
  const popUp = new PopupWithForm({
    selector: selector,
    // handleFormSubmit: ()=>{}),
  });
  return popUp;
}

/** EDIT USER */
const user = new UserInfo('.user__name', '.user__job', '.user__avatar');
const popUpEditUser = initPopUp('.popup_edit_user');
popUpEditUser.setEventListeners();

function openPopUpEditUser() {
  /**  open edit-user popup and set listeners */
  popUpEditUser.open();

  /** get inputs-value from dom-data */
  const userData = user.getUserInfo();

  /** set data {selector: data, selector: data} to DOM*/
  const userInputData = {
    '.popup__input_form_name': userData.name,
    '.popup__input_form_job': userData.about,
  };
  popUpEditUser.setInputValues(userInputData);

  /** set new user data after submit (server, dom) */
  popUpEditUser.handleFormSubmit = (formData) => {
    popUpEditUser.changeButtonText('Сохранение...');

    /** set data to server and update dom */
    api
      .setUserData(formData)
      .then((data) => {
        user.setUserInfo({ name: data.name, about: data.about });
        user.setUserAvatar({ avatar: data.avatar });
        popUpEditUser.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => popUpEditUser.changeButtonText('Сохранить'));

    formUserValidation.resetValidation();
  };
  formUserValidation.resetValidation();
}

buttonEditUser.addEventListener('click', openPopUpEditUser);

/** EDIT AVATAR */
const popUpEditAvatar = new initPopUp('.popup_change_avatar');
popUpEditAvatar.setEventListeners();

function openPopUpEditAvatar() {
  /**  open edit-user popup and set listeners */
  popUpEditAvatar.open();

  /** get inputs-value from dom-data */
  const userData = user.getUserInfo();

  /** set data to input form (current link) */
  popUpEditAvatar.setInputValues({
    '.popup__input_form_avatar': userData.avatar,
  });

  /**  submit new avatar to server and dom */
  popUpEditAvatar.handleFormSubmit = (formData) => {
    popUpEditAvatar.changeButtonText('Сохранение...');

    /** set data to server and update dom */
    api
      .changeUserAvatar(formData)
      .then((data) => {
        api.changeUserAvatar({ avatar: formData.avatar });
        user.setUserAvatar({ avatar: formData.avatar });
        popUpEditAvatar.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => popUpEditAvatar.changeButtonText('Сохранить'));

    formUserValidation.resetValidation();
  };

  formAvatarValidation.resetValidation();
}

editAvatar.addEventListener('click', openPopUpEditAvatar);

/** ADD PHOTO */

const popUpAddCard = initPopUp('.popup_create_card');
popUpAddCard.setEventListeners();

const popUpImage = new PopupWithImage('.popup.popup_zoom_img');
popUpImage.setEventListeners();

const confirmPopup = new PopupConfirm({ selector: '.popup_confirm' });
confirmPopup.setEventListeners();

const cardAddSection = initCardSection([], renderCard, '.gallery');

/** init card section for new photo: ({list of items(cards), render func}, section selector) */
function initCardSection(itemList, renderer, selector) {
  const cardSection = new Section(
    { items: itemList, renderer: renderer },
    selector
  );
  return cardSection;
}

function renderCard(item) {
  const photoCard = createCard(item);
  /** add dom */
  cardAddSection.addItem(photoCard);
}

// create new card with listeners
function createCard(formData) {
  const photoCard = new Card(formData, '#photocard');
  photoCard.userId = userId;

  /** CARDS ACTIONS */
  /** zoom card*/
  photoCard.handleCardClick = (cardData) => {
    popUpImage.open(cardData);
  };

  /** remove card */
  photoCard.handleCardRemove = (photoCardId) => {
    confirmPopup.open();

    confirmPopup.handleFormSubmit = () => {
      confirmPopup.changeButtonText('Удаление...');
      /**  remove from server */
      api
        .removePhotoCard(photoCardId)
        .then(() =>
          /** remove dom */
          photoCard.deletePhotoCard()
        )
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(confirmPopup.changeButtonText('Да'));

      confirmPopup.close();
    };
  };

  // like card
  photoCard.handleCardLike = (photoCardId) => {
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
  };

  const newCard = photoCard.generatePhotoCard();
  return newCard;
}

function openPopUpAddCard() {
  popUpAddCard.open();

  // submit card
  popUpAddCard.handleFormSubmit = (formData) => {
    popUpAddCard.changeButtonText('Создание...');

    api
      .addPhotoCard(formData)
      .then((cardData) => {
        /** get generated card */
        const photoCard = createCard(cardData);

        cardAddSection.addNewItem(photoCard);

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
  };

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
