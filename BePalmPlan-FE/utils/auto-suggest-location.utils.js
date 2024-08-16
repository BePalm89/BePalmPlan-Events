import { makeRequest } from "./fetch.utils";
import { API_ENDPOINTS } from "./url.enum";

export const locationAutoSuggest = () => {
  const locationInput = document.querySelector("#locations");

  if(locationInput) {
      const suggestionsList = document.querySelector(`.suggestions-list`);
      const suggestionsContainer = document.querySelector(`.suggestions-container`);
    
      const debouncedHandleSearch = debounce(handleSearch, 1000);
    
      locationInput.addEventListener("input", (event) =>
        debouncedHandleSearch(event, suggestionsList, suggestionsContainer)
      );
  }
};

const handleSearch = async (event, suggestionsList, suggestionsContainer) => {
  const query = event.target.value;

  if (query.length === 0) {
    suggestionsContainer.classList.remove("show");
    suggestionsList.innerHTML = "";
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
      generateListItemCityTemplate(data, suggestionsList, query);
      const noFoundResults = document.querySelector(".no-results");
      if (noFoundResults) suggestionsContainer.removeChild(noFoundResults);
    } else {
      handleNoResultsCity(data, suggestionsContainer);
    }
  }
};

let debounceTimeoutId;

const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => func(...args), delay);
  };
};

const handleNoResultsCity = (data, suggestionsContainer) => {
  if (!data.length) {
    const noResults = document.createElement("p");
    noResults.classList.add("no-results");
    noResults.textContent = "No city found";
    suggestionsContainer.appendChild(noResults);
  }
};

const generateListItemCityTemplate = (data, suggestionsList, query) => {
  for (const item of data) {
    const { city, country } = item;

    const cityItem = document.createElement("li");
    cityItem.classList.add("suggestions-item");

    cityItem.innerHTML = `${highlightText(
      city,
      query
    )}, <span class="country">${country}</span>`;

    suggestionsList.appendChild(cityItem);
  }
};

const highlightText = (text, query) => {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<strong>$1</strong>");
};


export const locationAutoSuggestEvents = ()  => { 
  const locationInput = document.querySelector("#locations-event");

  if(locationInput) {
    const suggestionsList = document.querySelector(".suggestions-location-list");
    const suggestionsContainer = document.querySelector(".suggestions-location-container");
    
    const debounceHandleSearch = debounce(handleSearch, 1000);

    locationInput.addEventListener("input", (event) => {
      debounceHandleSearch(event, suggestionsList, suggestionsContainer)
    })
  }
}