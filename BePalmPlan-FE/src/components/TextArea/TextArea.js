import "./TextArea.css";

export const TextArea = ({
  labelText,
  id,
  rows,
  cols,
  required = true,
  textAreaAction,
}) => {
  const div = document.createElement("div");
  div.classList.add("form-item");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = `${labelText} ${required ? "*" : ""}`;

  div.append(label);

  const textArea = document.createElement("textarea");
  textArea.setAttribute("id", id);
  textArea.setAttribute("rows", rows);
  textArea.setAttribute("cols", cols);

  div.append(textArea);

  const error = document.createElement("span");
  error.classList.add("error-message");
  error.id = `${id}-error`;

  div.append(error);

  textArea.addEventListener("input", textAreaAction);

  return div;
};
