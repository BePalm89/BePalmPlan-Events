import { CreateEventTemplate } from "../pages/CreateEvent/CreateEvent";

export const createEventModal = () => {
  const btn = document.querySelector("#create-event");
  btn.addEventListener("click", openCreateEventModal);
};

const openCreateEventModal = () => {

  const mainElement = document.querySelector("main");

  mainElement.appendChild(CreateEventTemplate());
  console.log(mainElement);
};
