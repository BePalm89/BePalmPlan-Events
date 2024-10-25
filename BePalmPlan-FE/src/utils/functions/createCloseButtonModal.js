import { closeModal } from "./closeModal";

export const createCloseButton = () => {
  const closeBtnContainer = document.createElement("div");
  closeBtnContainer.classList.add("close-icon-container");

  const closeIcon = document.createElement("img");
  closeIcon.src = "/icons/close.png";
  closeIcon.alt = "close-icon";
  closeIcon.id = "close-btn";

  closeIcon.addEventListener("click", closeModal);

  closeBtnContainer.append(closeIcon);
  return closeBtnContainer;
};
