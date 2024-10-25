export const handleErrors = (e, type) => {
  const input = e.target;

  const errorSpan = document.getElementById(`${input.id}-error`);

  const errorMessage = getValidationError(input.value, type);

  if (errorMessage) {
    return showError(errorSpan, input, errorMessage);
  }

  hideError(errorSpan, input);
};

export const showError = (errorSpan, input, errorMessage) => {
  errorSpan.textContent = errorMessage;
  input.classList.add("error-input");
};

export const hideError = (errorSpan, input) => {
  errorSpan.textContent = "";
  input.classList.remove("error-input");
};

export const validateEmail = (email) => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
};

const getValidationError = (value, type) => {
  if (!value) {
    return "This field is required";
  }

  if (type === "email" && !validateEmail(value)) {
    return "Please enter a valid email address";
  }

  if (type === "password" && value.length < 8) {
    return "The password must have at least 8 characters";
  }

  const dateInput = new Date(value);
  const today = new Date();

  if (type === "date" && dateInput < today) {
    return "The date cannot be in the past";
  }

  return null;
};
