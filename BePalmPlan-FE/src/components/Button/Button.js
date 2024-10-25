import "./Button.css";

export const Button = ({ label, className, id, fnc, disabled }) => {
  const button = document.createElement("button");

  button.id = id;
  button.classList.add("btn");
  button.classList.add(className);
  button.textContent = label;
  button.disabled = disabled;

  if (disabled) {
    button.classList.add("disabled");
  }

  button.addEventListener("click", fnc);

  return button;
};
