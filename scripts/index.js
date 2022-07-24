let editButton = document.querySelector('.user__edit-button');
let popUpWindow = document.querySelector('.popup');
let closePopUpButton = document.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form-userinfo');

let nameInput = document.querySelector('.popup__input_form_name');
let jobInput = document.querySelector('.popup__input_form_job');

let userName = document.querySelector('.user__name');
let userJob = document.querySelector('.user__job');

function showPopUp() {
  popUpWindow.classList.add('popup_opened');

  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopUp() {
  popUpWindow.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopUp();
}

editButton.addEventListener('click', showPopUp);
closePopUpButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', formSubmitHandler);
