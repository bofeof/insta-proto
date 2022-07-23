let editButton = document.querySelector(".user__edit-button");
let popUpWindow = document.querySelector(".popup");
let closePopUpButton = document.querySelector(".popup__close-button");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup_name-input");
let jobInput = document.querySelector(".popup_job-input");

let nameValue = nameInput.value;
let jobValue = jobInput.value;

let userName = document.querySelector(".user__name");
let userJob = document.querySelector(".user__job");

function showPopUp() {
  popUpWindow.classList.add("popup_opened");
  popUpWindow.style.display = "flex";

  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopUp() {
  popUpWindow.classList.remove("popup_opened");
  popUpWindow.style.display = "none";
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameValue = nameInput.value;
  jobValue = jobInput.value;

  userName.textContent = nameValue;
  userJob.textContent = jobValue;

  closePopUp();
}

editButton.addEventListener("click", showPopUp);
closePopUpButton.addEventListener("click", closePopUp);
formElement.addEventListener("submit", formSubmitHandler);
