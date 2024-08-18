import { DEBOUNCE_TIME, debounce } from "./debounce.utils";
import { getAllEvents } from "./eventsList.utils";
import { makeRequest } from "./fetch.utils";
import { API_ENDPOINTS } from "./url.enum";

export const locationAutoSuggest = () => {
  const locationInput = document.querySelector("#locations");

  if (locationInput) {
    const suggestionsContainer = document.querySelector(
      `.suggestions-container`
    );
    const suggestionsList = document.querySelector(`.suggestions-list`);

    const debouncedHandleSearch = debounce(handleSearch, DEBOUNCE_TIME);

    locationInput.addEventListener("input", (event) =>
      debouncedHandleSearch(event, suggestionsList, suggestionsContainer, locationInput, true)
    );
  }
};

export const locationAutoSuggestEvents = () => {
  const locationInput = document.querySelector("#locations-event");

  if (locationInput) {
    const suggestionsList = document.querySelector(
      ".suggestions-location-list"
    );
    const suggestionsContainer = document.querySelector(
      ".suggestions-location-container"
    );

    const debounceHandleSearch = debounce(handleSearch, 1000);

    locationInput.addEventListener("input", (event) => {
      debounceHandleSearch(event, suggestionsList, suggestionsContainer, locationInput);
    });
  }
};

const handleSearch = async (event, suggestionsList, suggestionsContainer, locationInput, isAFilter = false) => {
  const rootStyle = getComputedStyle(document.documentElement);
  const query = event.target.value;
  const spanError = document.querySelector("#location-error");

  if (spanError) {
    spanError.innerHTML = "";
    locationInput.style.border = `1px solid ${rootStyle.getPropertyValue(
      "--gray-light-color"
    )}`;
  }

  if (query.length === 0) {
    suggestionsContainer.classList.remove("show");
    suggestionsList.innerHTML = "";
    spanError.innerHTML = "This field is required";
    locationInput.style.border = `1px solid ${rootStyle.getPropertyValue(
      "--error-color"
    )}`;
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const { status, data } = await makeRequest(
    `${API_ENDPOINTS.LOCATION_SEARCH}?city=${query}`,
    "GET",
    null,
    headers
  );

  suggestionsList.innerHTML = "";

  if (status === 200) {
    suggestionsContainer.classList.add("show");
    if (data.length) {
      generateListItemCityTemplate(data, suggestionsList, query, suggestionsContainer, locationInput, isAFilter);
      const noFoundResults = document.querySelector(".no-results");
      if (noFoundResults) suggestionsContainer.removeChild(noFoundResults);
    } else {
      handleNoResultsCity(data, suggestionsContainer);
    }
  }
};

const handleNoResultsCity = (data, suggestionsContainer) => {
  if (!data.length) {
    const noResults = document.createElement("p");
    noResults.classList.add("no-results");
    noResults.textContent = "No city found";
    suggestionsContainer.appendChild(noResults);
  }
};

const generateListItemCityTemplate = (data, suggestionsList, query, suggestionsContainer, locationInput, isAFilter) => {

  for (const item of data) {
    const { city, country } = item;

    const cityItem = document.createElement("li");
    cityItem.classList.add("suggestions-item");

    cityItem.innerHTML = `${highlightText(
      city,
      query
    )}, <span class="country">${country}</span>`;

    suggestionsList.appendChild(cityItem);

    suggestionsList.addEventListener("click", (event) =>
      useSuggestion(event, locationInput, suggestionsList, suggestionsContainer, isAFilter)
    );
  }
};

const useSuggestion = (event, locationInput, suggestionsList, suggestionsContainer, isAFilter = false) => {
  
  locationInput.value = event.target.innerText;
  locationInput.focus();
  suggestionsList.innerHTML = "";
  suggestionsContainer.classList.remove("show");
  const location = event.target.innerText;

  const queryInput = document.querySelector("#search-text");
  const query = queryInput.value;

  if(isAFilter) getAllEvents({query, location});
};

const highlightText = (text, query) => {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<strong>$1</strong>");
};
