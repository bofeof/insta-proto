let editButton = document.querySelector(".user__edit-button");
let popUpWindowOpened = document.querySelector(".popup_opened");
let closePopUpButton = document.querySelector(".popup__close-button");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__name-input");
let jobInput = document.querySelector(".popup__job-input");

let nameValue = nameInput.value;
let jobValue = jobInput.value;

let userName = document.querySelector(".user__name");
let userJob = document.querySelector(".user__job");

function showPopUp() {
  popUpWindowOpened.style.display = "flex";
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopUp() {
  popUpWindowOpened.style.display = "none";
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameValue = nameInput.value;
  jobValue = jobInput.value;

  userName = document.querySelector(".user__name");
  userJob = document.querySelector(".user__job");

  userName.textContent = nameValue;
  userJob.textContent = jobValue;
  closePopUp();
}

editButton.addEventListener("click", showPopUp);
closePopUpButton.addEventListener("click", closePopUp);
formElement.addEventListener("submit", formSubmitHandler);
