import "./Link.css";

export const Link = ({ label, className, fcn }) => {
  const link = document.createElement("span");
  link.textContent = label;
  link.classList.add("btn-link", className);

  link.addEventListener("click", fcn);

  return link;
};
