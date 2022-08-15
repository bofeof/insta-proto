const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationElements.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(validationElements.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
};


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationElements.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationElements.inputErrorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
  const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);

  inputList.forEach((inputElement) => {

    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);

    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });

  });

};

function enableValidation(validationElements) {
  const formList = Array.from(document.querySelectorAll(validationElements.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {evt.preventDefault()});
    setEventListeners(formElement);
  }
  );
};


buttonAddCard.addEventListener('click', function(){
  enableValidation(validationElements)});

buttonEditUser.addEventListener('click', function(){
  enableValidation(validationElements)});

enableValidation(validationElements);
