import "./Select.css";

export const Select = ({
  labelText,
  id,
  options,
  hasLabel = false,
  required = false,
  className,
  selectAction,
  itemAction,
  value,
}) => {
  const div = document.createElement("div");
  div.classList.add("select-container");

  // Label
  if (hasLabel) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = required ? labelText + " *" : labelText;
    label.classList.add("dropdown-label");

    div.append(label);
  }

  // Select
  const selectWrapper = document.createElement("div");
  selectWrapper.classList.add("dropdown-wrapper");
  const classes = className.split(" ");
  classes.forEach((cls) => selectWrapper.classList.add(cls));
  selectWrapper.id = `${id}-dropdown-wrapper`;

  div.append(selectWrapper);

  // Placeholder and selected item
  const span = document.createElement("span");
  selectWrapper.append(span);
  span.textContent = value ?? `Any ${labelText}`;

  // Options
  const ul = document.createElement("ul");
  ul.id = `${id}-dropdown-list`;
  ul.classList.add("dropdown-list");
  selectWrapper.append(ul);

  // Error
  const error = document.createElement("span");
  error.classList.add("error-message");
  error.id = `${id}-error`;

  div.append(error);

  // Options with error and event listener
  for (const option of options) {
    const li = document.createElement("li");
    li.id = option.value;
    li.textContent = option.label;
    li.addEventListener("click", (e) => {
      span.textContent = e.target.textContent;
      if (itemAction) {
        itemAction();
      }
      if (span.textContent.includes("any") && required) {
        error.textContent = "This field is required";
        selectWrapper.classList.add("error");
      } else {
        error.textContent = "";
        selectWrapper.classList.remove("error");
      }
    });
    ul.append(li);
  }

  // Show/hide dropdown
  selectWrapper.addEventListener("click", () => {
    selectWrapper.classList.toggle("is-active");
  });

  div.addEventListener("click", selectAction);

  return div;
};
