import "./Button.css";

export const Button = ({ label, className, id, fnc }) => {
  const button = document.createElement("button");

  button.id = id;
  button.classList.add("btn");
  button.classList.add(className);
  button.textContent = label;

  button.addEventListener("click", fnc);

  return button;
};
