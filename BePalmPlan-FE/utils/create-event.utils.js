import { CreateEventTemplate } from "../pages/CreateEvent/CreateEvent";
import { locationAutoSuggestEvents } from "./auto-suggest-location.utils";
import { handleDropdownToggle } from "./eventsList.utils";
import { closeModal, selectFile } from "./form.utils";

export const createEventModal = () => {
  const btn = document.querySelector("#create-event");
  btn.addEventListener("click", openCreateEventModal);
};

const openCreateEventModal = () => {

  const mainElement = document.querySelector("main");

  mainElement.appendChild(CreateEventTemplate());
  
  setupEventListeners(mainElement);
};


const setupEventListeners = (mainElement) => {

  closeModal(mainElement);

  selectFile("form-create-event", "upload-photo");

  handleDropdownToggle("categories");

  locationAutoSuggestEvents("");

};
