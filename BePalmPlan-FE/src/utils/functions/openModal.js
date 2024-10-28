import { CreateEvent } from "../../pages/CreateEditEvent/CreateEditEvent";
import { DeleteEvent } from "../../pages/DeleteEvent/DeleteEvent";
import { LoginOrRegister } from "../../pages/LoginOrRegister/LoginOrRegister";

export const openModal = (btn, event) => {
  const mainElement = document.querySelector("main");

  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  if (btn === "create") {
    modal.append(CreateEvent());
  } else if (btn === "edit") {
    modal.append(CreateEvent(event, true));
  } else if (btn === "delete") {
    modal.append(DeleteEvent());
  } else {
    modal.append(LoginOrRegister(btn));
  }

  mainElement.append(modal);
};
