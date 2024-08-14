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
    } else {
      removeErrorToInput(key, input);
    }
  });

  return isValid;
};
