import "./Link.css";

export const Link = ({ label, className, fcn, hasIcon = false, fcnIcon }) => {
  const fragment = document.createDocumentFragment();

  const link = document.createElement("span");
  link.textContent = label;
  link.classList.add("btn-link", className);

  if (hasIcon) {
    const icon = document.createElement("img");
    icon.src = "/icons/back.png";
    icon.alt = "back-icon";
    icon.classList.add("icon-link");

    fragment.appendChild(icon);

    icon.addEventListener("click", fcnIcon);
  }

  fragment.appendChild(link);

  link.addEventListener("click", fcn);

  return hasIcon ? fragment : link;
};
