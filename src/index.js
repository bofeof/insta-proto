import {initialCards, validationElements, buttonEditUser, buttonAddCard, formUserInfoPopup, formCardPopup} from './scripts/utils/constants.js';

import {Card} from './scripts/components/Card.js';
import {PopupWithImage} from './scripts/components/PopupWithImage.js';
import {PopupWithForm} from './scripts/components/PopupWithForm.js';
import {UserInfo} from './scripts/components/UserInfo.js';

import {Section} from './scripts/components/Section.js';

import {FormValidator} from './scripts/components/FormValidator.js';

import './styles/index.css';


// EDIT USER
buttonEditUser.addEventListener('click', function(){

  const popUpEditUser = new PopupWithForm({selector: '.popup_edit_user',

  // user submit -> set new user data
  handleFormSubmit: (formData) => {
      user.setUserInfo(formData);
      popUpEditUser.close();
      formUserValidation.resetValidation();
  }});

  // open edit-user popup and set listeners
  popUpEditUser.open();
  popUpEditUser.setEventListeners();

  // set inputs-value from dom-data
  const user = new UserInfo('.user__name', '.user__job');
  const userData = user.getUserInfo();
  popUpEditUser.setInputValues(userData);

  formUserValidation.resetValidation();

});


// ADD PHOTO
buttonAddCard.addEventListener('click', function(){

  const addPhotoCard = new PopupWithForm(
    {selector: '.popup_create_card',


    // submit\add new photo
    handleFormSubmit: (formData) => {

      const card = new Card(
        {data: formData,
        templateSelector: '#photocard',

        // img popup
        handleCardClick:(photoData) => {
          const popUpImage = new PopupWithImage({data: photoData, selector:'.popup_zoom_img'});
          popUpImage.Open();
          popUpImage.setEventListeners();
        }
      })

      const cardAddSection = new Section(
        {items: [],
          renderer: (item) => {}
        },
        '.gallery')


      // generate card
      const photoCard = card.generatePhotoCard();
      // add dom
      cardAddSection.addItem(photoCard);
      // close popup add-card
      addPhotoCard.close();

      formCardValidation.resetValidation();

    }
  }
  );

  addPhotoCard.open();
  addPhotoCard.setEventListeners();

  formCardValidation.resetValidation();

})

// add photocards from initialCards
const cardsAddSection = new Section(
    {items: initialCards,
      renderer: (item) => {

        const card = new Card(
          {data: item,
          templateSelector: '#photocard',

          // img popup
          handleCardClick:(photoData) => {
            const popUpImage = new PopupWithImage({data: photoData, selector:'.popup_zoom_img'});
            popUpImage.Open();
            popUpImage.setEventListeners();
          }
        });

        // generate card
        const photoCard = card.generatePhotoCard();
        // add dom
        cardsAddSection.addItem(photoCard);

      }
    },
  '.gallery')

cardsAddSection.renderItem()

// validation
const formUserValidation = new FormValidator(validationElements, formUserInfoPopup);
const formCardValidation = new FormValidator(validationElements, formCardPopup);

formCardValidation.enableValidation();
formUserValidation.enableValidation();
