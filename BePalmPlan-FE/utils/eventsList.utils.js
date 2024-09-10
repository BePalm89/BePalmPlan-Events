import { API_ENDPOINTS } from "./url.enum";
import { makeRequest } from "./fetch.utils";

import { EventsSection } from "../components/EventsSection/EventsSection";
import { createEventModal } from "./create-event.utils";
import { Autosuggest } from "../components/Autosuggest/Autosuggest";
import { locationAutoSuggestEvents } from "./auto-suggest-location.utils";
import { DEBOUNCE_TIME, debounce } from "./debounce.utils";
import { formatCategory } from "./format.utils";

export const getAllEvents = async (params = null) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  let endpoint = API_ENDPOINTS.GET_ALL_EVENTS;

  const queryString = new URLSearchParams(params).toString();
  if (params) {
    endpoint = `${API_ENDPOINTS.SEARCH_EVENT}?${queryString}`;
  }

  const { status, data } = await makeRequest(endpoint, "GET", null, headers);

  if (status === 200) {
    eventListTemplate(data);
    handleAllDropdown();
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
    item.addEventListener("click", (event) =>
      handleDropdown(
        event,
        span,
        dropdownElement,
        errorSpan,
        rootStyle,
        dropdownName
      )
    );
  });
};

export const searchByText = () => {
  const queryInput = document.querySelector("#search-text");

  const debounceSearch = debounce((event) => {
    handleSearchByText(event);
  }, DEBOUNCE_TIME);

  queryInput.addEventListener("input", debounceSearch);
  handleAllDropdown();
};

const handleSearchByText = (event) => {
  const locationInput = document.querySelector("#locations");
  const location = locationInput.value;
  const query = event.target.value;
  const categoryFilter = document.querySelector(
    "#category-dropdown-wrapper span"
  );
  const category = formatCategory(categoryFilter.innerHTML);
  getAllEvents({ query, location, category });
};
const searchEventsByFilter = (selectedFilter, dropdownId) => {
  const formattedId = dropdownId.split("-")[0].toLowerCase();
  const query = document.querySelector("#search-text").value;
  const location = document.querySelector("#locations").value;

  const filters = { query };

  if (formattedId === "type") {
    filters.location =
      selectedFilter.toLowerCase() === "online"
        ? selectedFilter.toLowerCase()
        : location.toLowerCase();
  }

  if (formattedId === "category") {
    const categoryMap = {
      "Art And Culture": "art-culture",
      "Health And Wellbeing": "health-wellbeing",
      "Hobbies And Passions": "hobbies-passions",
      "Travel And Outdoor": "travel-outdoor",
      "Sport And Fitness": "sport-fitness",
      "Social Activities": "social-activities",
      Technology: "technology",
    };

    filters.category =
      categoryMap[selectedFilter] ||
      selectedFilter.toLowerCase().replaceAll(" ", "-");
  }

  getAllEvents(filters);
  handleAllDropdown();
};

export const handleAllDropdown = () => {
  handleDropdownToggle("date");
  handleDropdownToggle("type");
  handleDropdownToggle("category");
  handleDropdownToggle("sorting");
  searchByCategory()
};

const searchByCategory = () => {
  const items = document.querySelectorAll("#category-dropdown-list li");

  items.forEach(item => {
    item.addEventListener("click", () => {

      const categoryValue = item.innerHTML;
      const category = formatCategory(categoryValue);
      getAllEvents({category});
    })
  })


}

const handleDropdown = (
  event,
  span,
  dropdownElement,
  errorSpan,
  rootStyle,
  dropdownName
) => {
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
      autosuggestionLocationDiv.innerHTML = Autosuggest("location", true, true);

      locationAutoSuggestEvents();
    } else {
      autosuggestionLocationDiv.innerHTML = "";
    }
  }
};
