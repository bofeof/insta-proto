export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationElements = validationConfig;
    this._formElement = formElement;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._validationElements.inactiveButtonClass
      );
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._validationElements.inactiveButtonClass
      );
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _showInputError() {
    this._errorMessage = this._inputElement.validationMessage;
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._inputElement.classList.add(this._validationElements.inputErrorClass);
    this._errorElement.textContent = this._errorMessage;
  }

  _hideInputError() {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._inputElement.classList.remove(
      this._validationElements.inputErrorClass
    );
    this._errorElement.textContent = '';
  }

  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationElements.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._validationElements.submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;

      this._toggleButtonState();

      this._inputElement.addEventListener('input', (evt) => {
        this._inputElement = evt.target;
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });

    this._toggleButtonState();
  }
}
