import { API_ENDPOINTS } from "./url.enum";
import { makeRequest } from "./fetch.utils";

import { EventsSection } from "../components/EventsSection/EventsSection";
import { createEventModal } from "./create-event.utils";

export const getAllEvents = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const { status, data } = await makeRequest(
    API_ENDPOINTS.GET_ALL_EVENTS,
    "GET",
    null,
    headers
  );

  if (status === 200) {
    eventListTemplate(data);

    handleDropdownToggle('date');
    handleDropdownToggle('type');
    handleDropdownToggle('category');
    handleDropdownToggle('sorting');
    createEventModal();


  }
};

export const eventListTemplate = (data) => {
  const wrapperElement = document.querySelector(".events-list-container");

  wrapperElement.innerHTML += EventsSection(data)

};

const handleDropdownToggle = (dropdownName) => {
  const rootStyle = getComputedStyle(document.documentElement);
  
  const dropdownElement = document.querySelector(`#${dropdownName}-dropdown-wrapper`);
  const items = document.querySelectorAll(`#${dropdownName}-dropdown-list li`);
  const span = document.querySelector(`#${dropdownName}-dropdown-wrapper span`);

  if(dropdownElement.id.includes("sorting")) {
    span.innerHTML = items[0].textContent;
    dropdownElement.style.backgroundColor = rootStyle.getPropertyValue('--secondary-color');
  }

  dropdownElement.addEventListener("click", () => {
    dropdownElement.classList.toggle("is-active");
  });

  items.forEach((item) => {
    item.addEventListener('click', (event) => {
      span.innerHTML = event.currentTarget.textContent;
      if(span.innerHTML.includes('Any')) {
        dropdownElement.style.backgroundColor = rootStyle.getPropertyValue('--gray-light-color');
      } else {
        dropdownElement.style.backgroundColor = rootStyle.getPropertyValue('--secondary-color');
      }
    })
  })


}
