import { hideError, showError, validateEmail } from "./handleErrors";

export const isFormValid = (inputs, validationRules, photoValue) => {
  let isValid = true;
  Object.keys(inputs).forEach((key) => {
    const input = inputs[key];
    const rules = validationRules[key];

    if (!rules) return;

    const errorSpan = document.getElementById(`${input.id}-error`);

    if (
      (rules.required && !input.value) ||
      (input.type === "file" && rules.hasFile && !input.files[0] && !photoValue)
    ) {
      showError(errorSpan, input, "This field is required");
      isValid = false;
    } else if (rules.email && !validateEmail(input.value)) {
      showError(errorSpan, input, "Please enter a valid email address");
      isValid = false;
    } else if (rules.minLength && input.value.length < 8) {
      showError(
        errorSpan,
        input,
        "The password must have at least 8 characters"
      );
      isValid = false;
    } else if (rules.noPastDate) {
      const dateInput = new Date(input.value);
      const today = new Date();
      if (dateInput < today) {
        showError(errorSpan, input, "The date cannot be in the past");
      }
    } else {
      hideError(errorSpan, input);
    }
  });
  return isValid;
};
