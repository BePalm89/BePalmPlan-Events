export const DatePicker = ({
  labelText,
  id,
  required = true,
  min,
  datePickerAction,
}) => {
  // Wrapper
  const div = document.createElement("div");
  div.classList.add("form-item");

  // Label
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = `${labelText} ${required ? "*" : ""}`;

  // Input
  const input = document.createElement("input");
  input.type = "datetime-local";
  input.id = id;
  input.min = min;

  //Error
  const error = document.createElement("span");
  error.classList.add("error-message");
  error.id = `${id}-error`;

  div.append(label, input, error);

  div.addEventListener("change", datePickerAction);

  return div;
};
