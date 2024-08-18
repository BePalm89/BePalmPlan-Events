import { API_ENDPOINTS } from "./url.enum";
import { makeRequest } from "./fetch.utils";

import { EventsSection } from "../components/EventsSection/EventsSection";
import { createEventModal } from "./create-event.utils";
import { Autosuggest } from "../components/Autosuggest/Autosuggest";
import { locationAutoSuggestEvents } from "./auto-suggest-location.utils";
import { DEBOUNCE_TIME, debounce } from "./debounce.utils";

export const getAllEvents = async (params = null) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  let endpoint = API_ENDPOINTS.GET_ALL_EVENTS;

  const queryString = new URLSearchParams(params).toString();
  if(params) {
    endpoint = `${API_ENDPOINTS.SEARCH_EVENT}?${queryString}`;
  } 

  const { status, data } = await makeRequest(
    endpoint,
    "GET",
    null,
    headers
  );

  if (status === 200) {
    eventListTemplate(data);

    handleDropdownToggle("date");
    handleDropdownToggle("type");
    handleDropdownToggle("category");
    handleDropdownToggle("sorting");
    createEventModal();
  }
};

export const eventListTemplate = (data) => {
  const wrapperElement = document.querySelector(".events-list-container");
  wrapperElement.innerHTML = "";
  wrapperElement.innerHTML += EventsSection(data);
};

export const handleDropdownToggle = (dropdownName) => {
  const rootStyle = getComputedStyle(document.documentElement);

  const dropdownElement = document.querySelector(
    `#${dropdownName}-dropdown-wrapper`
  );
  const items = document.querySelectorAll(`#${dropdownName}-dropdown-list li`);
  const span = document.querySelector(`#${dropdownName}-dropdown-wrapper span`);

  const errorSpan = document.querySelector(`#${dropdownName}-error`);

  if (dropdownElement.id.includes("sorting")) {
    span.innerHTML = items[0].textContent;
    dropdownElement.style.backgroundColor =
      rootStyle.getPropertyValue("--secondary-color");
  }

  dropdownElement.addEventListener("click", () => {
    dropdownElement.classList.toggle("is-active");
  });

  items.forEach((item) => {
    item.addEventListener("click", (event) => {
      span.innerHTML = event.currentTarget.textContent;
      if (span.innerHTML.includes("Any")) {
        dropdownElement.style.backgroundColor =
          rootStyle.getPropertyValue("--gray-light-color");
        if (errorSpan) {
          errorSpan.innerHTML = "This field is required";
          dropdownElement.style.border = `1px solid ${rootStyle.getPropertyValue(
            "--error-color"
          )}`;
        }
      } else {
        dropdownElement.style.backgroundColor =
          rootStyle.getPropertyValue("--secondary-color");
        if (errorSpan) errorSpan.innerHTML = "";
        dropdownElement.style.border = "none";
      }

      if (dropdownName === "where") {
        const optionSelected = document.querySelector(
          "#where-dropdown-wrapper span"
        );
        const autosuggestionLocationDiv = document.querySelector(
          "#autosuggest-locations-wrapper"
        );

        if (optionSelected.textContent === "In Person") {
          autosuggestionLocationDiv.innerHTML = Autosuggest(
            "location",
            true,
            true
          );

          locationAutoSuggestEvents();
        } else {
          autosuggestionLocationDiv.innerHTML = "";
        }
      }
    });
  });
};

export const searchByText = () => {

  const queryInput = document.querySelector("#search-text");

  const debounceSearch = debounce((event) => {
    handleSearchByText(event)
  }, DEBOUNCE_TIME)

  queryInput.addEventListener("input", debounceSearch);
};

const handleSearchByText = (event) => {
  const locationInput = document.querySelector("#locations");
  const location = locationInput.value
  const query = event.target.value;
  getAllEvents({query, location});
}