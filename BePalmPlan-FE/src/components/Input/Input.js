import "./Input.css";

export const Input = ({
  labelText,
  id,
  inputAction,
  required = true,
  type = "text",
  placeholder,
  hasIcon = false,
  iconAction,
  hasLabel = true,
  value,
}) => {
  const div = document.createElement("div");
  div.classList.add("form-item");

  if (hasLabel) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = `${labelText} ${required ? "*" : ""}`;

    div.append(label);
  }

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.placeholder = placeholder ?? "";
  input.value = value && type !== "file" ? value : "";

  div.append(input);

  if (hasIcon) {
    const rootStyle = getComputedStyle(document.documentElement);

    const inputIconContainer = document.createElement("div");
    inputIconContainer.style.display = "flex";
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("search-icon-container");

    const imgIcon = document.createElement("img");
    imgIcon.alt = "search-icon";
    imgIcon.src = "/icons/loupe-white.png";

    iconContainer.append(imgIcon);

    input.style.border = `1px solid ${rootStyle.getPropertyValue(
      "--gray-dark-color"
    )}`;

    inputIconContainer.append(input);
    inputIconContainer.append(iconContainer);
    inputIconContainer.addEventListener("click", iconAction);
    div.append(inputIconContainer);
  }

  const error = document.createElement("span");
  error.classList.add("error-message");
  error.id = `${id}-error`;

  // File type

  if (type === "file") {
    input.style.display = "none";

    const divFile = document.createElement("div");

    const labelFile = document.createElement("label");
    labelFile.classList.add("custom-file-upload");
    labelFile.setAttribute("for", id);
    labelFile.textContent = "Choose file";

    const spanFile = document.createElement("span");
    spanFile.id = "file-chosen";
    spanFile.textContent = value ?? "No file chosen";

    input.addEventListener("change", () => {
      spanFile.textContent = input.files[0].name;
      error.textContent = "";
      input.classList.remove("error-message");
    });

    divFile.append(labelFile);
    divFile.append(spanFile);
    div.append(divFile);
  }

  div.append(error);

  input.addEventListener("input", inputAction);

  return div;
};
