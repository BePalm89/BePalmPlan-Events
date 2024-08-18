export const addErrorToInput = (
  field,
  input,
  text = "This field is required"
) => {
  const error = document.querySelector(`#${field}-error`);
  error.innerHTML = text;
  input.classList.add("error-input");
};

export const removeErrorToInput = (field, input) => {
  const error = document.querySelector(`#${field}-error`);
  error.innerHTML = "";
  input.classList.remove("error-input");
};

export const validateEmail = (email) => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
};

export const closeModal = (mainElement) => {
  const modal = document.querySelector(".modal-overlay");
  const closeBtn = document.querySelector(".close-icon-container");

  closeBtn.addEventListener("click", () =>
    handleCloseModal(modal, mainElement)
  );
};

const handleCloseModal = (modal, mainElement) => {
  modal.style.display = "none";
  mainElement.removeChild(modal);

  const errorBanner = document.querySelector(".banner.error");
  const successBanner = document.querySelector(".banner.success");

  if (errorBanner) {
    errorBanner.style.display = "none";
    mainElement.removeChild(errorBanner);
  }

  if (successBanner) {
    successBanner.style.display = "none";
    mainElement.removeChild(successBanner);
  }
};

export const handleEmailInput = (emailInput) => {
  const emailValue = emailInput.value;

  if (!emailValue) {
    addErrorToInput("email", emailInput);
  } else if (!validateEmail(emailValue)) {
    addErrorToInput("email", emailInput, "Please enter a valid email address");
  } else {
    removeErrorToInput("email", emailInput);
  }
};

export const handlePasswordInput = (passwordInput) => {
  const passwordValue = passwordInput.value;

  if (!passwordValue) {
    addErrorToInput("password", passwordInput);
  } else {
    removeErrorToInput("password", passwordInput);
  }
};

export const isFormValid = (inputs, validationRules) => {
  let isValid = true;

  Object.keys(inputs).forEach((key) => {
    const input = inputs[key];
    const rules = validationRules[key];

    if (!rules) return;

    if (rules.required && !input.value) {
      addErrorToInput(key, input);
      isValid = false;
    } else if (rules.email && !validateEmail(input.value)) {
      addErrorToInput(key, input, "Please enter a valid email address");
      isValid = false;
    } else if (rules.maxLength && input.value.length > rules.maxLength) {
      addErrorToInput(key, input, `This field must be less than ${rules.maxLength} characters`);
      isValid = false;
    } else if (rules.noPastDate) {
      const dateInput = new Date(input.value);
      const today = new Date();
      if (dateInput < today) {
        addErrorToInput(key, input, "The date cannot be in the past");
        isValid = false;
      }
    } else {
      removeErrorToInput(key, input);
    }
  });

  return isValid;
};

export const required = (isRequired) => {
  return isRequired ? "*" : "";
};

export const selectFile = (formId, inputId) => {
  const photoInput = document.querySelector(`#${formId} #${inputId}`);
  const fileChosenText = document.querySelector(`#${formId} #file-chosen`);
  const errorSpan = document.querySelector(`#${inputId}-error`);


  photoInput.addEventListener("change", () => {
    if (photoInput.files.length > 0) {
      fileChosenText.textContent = photoInput.files[0].name;
      if(errorSpan) errorSpan.textContent = "";
    } else {
      fileChosenText.textContent = "No file chosen";
      if (errorSpan) errorSpan.textContent = "This field is required";
      
    }
  });
};

export const handleInputValidationWithRules = (
  event,
  inputName,
  input,
  rules
) => {
  let isValid = true;
  let errorMessage = "";

  const inputValue = event.target.value;

  if (!inputValue && rules.required) {
    isValid = false;
    errorMessage = "This field is required";
  }

  if (isValid && rules.maxLength && inputValue.length > rules.maxLength) {
    isValid = false;
    errorMessage = `This field must be less than ${rules.maxLength} characters`;
  }

  if (isValid && rules.noPastDate) {
    const dateInput = new Date(inputValue);
    const today = new Date();

    if (dateInput < today) {
      isValid = false;
      errorMessage = "The date cannot be in the past";
    }
  }

  if (!isValid) {
    addErrorToInput(inputName, input, errorMessage);
  } else {
    removeErrorToInput(inputName, input);
  }
};
