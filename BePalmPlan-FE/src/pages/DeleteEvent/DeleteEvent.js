import { Button } from "../../components/Button/Button";
import { Logo } from "../../components/Logo/Logo";
import { closeModal } from "../../utils/functions/closeModal";
import { createCloseButton } from "../../utils/functions/createCloseButtonModal";
import { deleteEvent } from "../../utils/functions/deleteEvent";
import "./DeleteEvent.css";

export const DeleteEvent = () => {
  const div = document.createElement("div");
  div.classList.add("modal-content");
  div.id = "delete";

  div.append(createCloseButton(), Logo({ justLogo: true }), createTitle());

  const ctaContainer = document.createElement("div");
  ctaContainer.classList.add("cta-container");

  const confirmButton = Button({
    label: "confirm",
    className: "filled",
    id: "confirm",
    fnc: deleteEvent,
  });

  const cancelButton = Button({
    label: "cancel",
    className: "outline",
    id: "cancel",
    fnc: closeModal,
  });

  ctaContainer.append(confirmButton, cancelButton);

  div.append(ctaContainer);

  return div;
};

const createTitle = () => {
  const title = document.createElement("h4");
  title.textContent = "Are you sure you want to delete this event?";

  return title;
};
