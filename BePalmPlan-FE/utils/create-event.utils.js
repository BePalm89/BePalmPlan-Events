import { Banner } from "../components/Banner/Banner";
import { CreateEventTemplate } from "../pages/CreateEvent/CreateEvent";

import { locationAutoSuggestEvents } from "./auto-suggest-location.utils";
import { getAllEvents, handleDropdownToggle } from "./eventsList.utils";
import { makeRequest } from "./fetch.utils";
import {
  closeModal,
  handleInputValidationWithRules,
  isFormValid,
  selectFile,
} from "./form.utils";
import { API_ENDPOINTS } from "./url.enum";

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

  handleDropdownToggle("where");

  locationAutoSuggestEvents();

  const createEventForm = document.querySelector("form#form-create-event");

  const inputs = {
    title: document.querySelector("#title"),
    description: document.querySelector("#description"),
    where: document.querySelector("#where-dropdown-wrapper span"),
    when: document.querySelector("#when"),
    category: document.querySelector("#categories-dropdown-wrapper span"),
    imgEvent: document.querySelector("#upload-photo"),
  };

  inputs.title.addEventListener("input", (event) => {
    handleTitleInput(event, inputs.title);
  });

  inputs.description.addEventListener("input", (event) => {
    handleDescriptionInput(event, inputs.description);
  });

  inputs.when.addEventListener("input", (event) => {
    handleWhenInput(event, inputs.when);
  });

  // Submit the form
  createEventForm.addEventListener("submit", (event) => {
    handleCreateEvent(event, inputs, mainElement);
  });
};

const handleTitleInput = (event, titleInput) => {
  handleInputValidationWithRules(event, "title", titleInput, {
    required: true,
  });
};

const handleDescriptionInput = (event, descriptionInput) => {
  handleInputValidationWithRules(event, "description", descriptionInput, {
    required: true,
    maxLength: 150,
  });
};

const handleWhenInput = (event, whenInput) => {
  handleInputValidationWithRules(event, "when", whenInput, {
    required: true,
    noPastDate: true,
  });
};

const handleCreateEvent = async (event, inputs, mainElement) => {
  event.preventDefault();
  const rootStyle = getComputedStyle(document.documentElement);
  
  let isValid = false;

  //Validation for title, description and date
  const validationRules = {
    title: { required: true },
    description: { required: true, maxLength: 150},
    when: { required: true, noPastDate: true}
  }

  isValid = isFormValid(inputs, validationRules);
  
  //Validation for photo
  
  const isPhotoValid = !!inputs.imgEvent.files[0];
  
  if(!isPhotoValid) {
    isValid = false;
    const errorSpan = document.querySelector('#upload-photo-error');
    if (errorSpan) errorSpan.textContent = "This field is required";
  }

  // Validation for category
  const isCategoryValid = (inputs.category.textContent.toLowerCase() !== 'any categories');
  const errorSpan = document.querySelector("#categories-error");
  const dropdownWrapperElement = document.querySelector("#categories-dropdown-wrapper");

  if(!isCategoryValid) {
    isValid = false;
    if (errorSpan) errorSpan.textContent = "This field is required";
    dropdownWrapperElement.style.border = `1px solid ${rootStyle.getPropertyValue(
      "--error-color"
    )}`;
  }
  
  //Validation for where ( online or in person ) 
  const isWhereValid = (inputs.where.textContent.toLowerCase() !== 'any where');

  if(!isWhereValid) {
    isValid = false;
    const errorSpan = document.querySelector("#where-error");
    const dropdownWrapperElement = document.querySelector("#where-dropdown-wrapper");
    if (errorSpan) errorSpan.textContent = "This field is required";
    dropdownWrapperElement.style.border = `1px solid ${rootStyle.getPropertyValue(
      "--error-color"
    )}`; 
  } 
  
  const isWhereInPerson = inputs.where.textContent.toLowerCase() === 'in person';

  let locationValue = '';
  const locationInput = document.querySelector("#locations-event");

  if(locationInput) locationValue = locationInput.value;

  if(isWhereInPerson && !locationValue) { 
    isValid = false;
    const errorSpan = document.querySelector("#location-error");
    const locationInput = document.querySelector("#locations-event");
    if (errorSpan) errorSpan.textContent = "This field is required";
    locationInput.style.border = `1px solid ${rootStyle.getPropertyValue("--error-color")}`;
  }

  if(!isValid) return;

 const formData =  createPayloadCreateEvent(inputs);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  try {
    const { status, data } = await makeRequest(
      API_ENDPOINTS.CREATE_EVENT,
      "POST",
      formData,
      headers
    );
    handleCreateEventResponse(status, data, inputs, mainElement);
  } catch (error) {
    console.log(error);
  }
};

const createPayloadCreateEvent = (inputs) => {
  const userFromLocalStorage = localStorage.getItem("user");

  const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {};

  const { title, description, where, when, category, imgEvent } = inputs;

  const locationValue = formattedLocation(where);

  const categoryValue = formattedCategory(category);
  
  const formData = new FormData();

  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("location", locationValue);
  formData.append("date", when.value);
  formData.append("category", categoryValue);
  formData.append("createBy", user._id);
  formData.append("imgEvent", imgEvent.files[0]);

  return formData;
};

const formattedCategory = (category) => {
  return category.textContent
  .toLowerCase()
  .replaceAll(" ", "-")
  .replaceAll("-and", "");
}

const formattedLocation = (where) => {
  const locationInput = document.querySelector("#locations-event");
  
  let location = "";
  
  if (where.textContent.toLowerCase() === "online") {
    location = where.textContent.toLowerCase();
  } else if (where.textContent.toLowerCase() === "in person") {
    location = locationInput.value;
  }

  return location;
}

const handleCreateEventResponse = (status, data, inputs, mainElement) => {
  if(status === 201) {
    const createEventModal = document.querySelector("#create-event-modal-overlay");
    createEventModal.style.display = "none";
    mainElement.removeChild(createEventModal);

    const banner = Banner("Events created successfully", "SUCCESS")

    mainElement.appendChild(banner);

    setTimeout(() => {
      mainElement.removeChild(banner);
    }, 2000);

    getAllEvents();
  }
}