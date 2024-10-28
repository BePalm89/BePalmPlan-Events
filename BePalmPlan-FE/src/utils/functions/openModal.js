import { CreateEvent } from "../../pages/CreateEvent/CreateEvent";
import { LoginOrRegister } from "../../pages/LoginOrRegister/LoginOrRegister";

export const openModal = (btn, event) => {
  const mainElement = document.querySelector("main");

  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  if (btn === "create") {
    modal.append(CreateEvent());
  } else if (btn === "edit") {
    modal.append(CreateEvent(event, true));
  } else {
    modal.append(LoginOrRegister(btn));
  }

  mainElement.append(modal);
};
