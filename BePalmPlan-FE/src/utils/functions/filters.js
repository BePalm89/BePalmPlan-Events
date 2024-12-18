import { API_ENDPOINT } from "../api/url.enum";

import { makeRequest } from "../api/makeRequest";
import { displayEvents } from "./displayEvents";
import { formattedCategory } from "./formatting";

import { NoResults } from "../../components/NoResults/NoResults";

export const filter = async () => {
  //Filter elements:
  const queryElement = document.querySelector("#search");

  const categoriesElement = document.querySelector(
    "#categories-filter-dropdown-wrapper span"
  );
  const typeElement = document.querySelector(
    "#type-filter-dropdown-wrapper span"
  );
  const dateElement = document.querySelector("#time-dropdown-wrapper span");

  const locationElement = document.querySelector("#locations-filter");

  const sortingElement = document.querySelector(
    "#sorting-dropdown-wrapper span"
  );

  // Filter values
  let query;
  if (queryElement.value) {
    query = queryElement.value;
  } else {
    query = undefined;
  }

  let category;
  if (categoriesElement.textContent.toLocaleLowerCase().includes("any")) {
    category = undefined;
  } else {
    category = formattedCategory(categoriesElement);
  }

  let location;
  const type = typeElement.textContent;

  if (type === "online") {
    location = "online";
  } else if (type === "in person") {
    location = locationElement.value
      ? locationElement.value?.split(",")[0]
      : "in-person";
  } else {
    location = locationElement.value?.split(",")[0] ?? undefined;
  }

  let date;

  if (dateElement.textContent.toLocaleLowerCase().includes("any time")) {
    date = undefined;
  } else {
    date = dateElement.textContent.toLocaleLowerCase().replace(" ", "-");
  }
  //const date = dateElement.textContent.toLocaleLowerCase().replace(" ", "-");

  // Sorting

  const sortText = sortingElement.textContent;
  const sortIndexOf = sortText.indexOf(":");
  const sort = sortText.substring(sortIndexOf + 1).trim();

  // Create params for BE
  const params = {};

  if (query) params.query = query;
  if (category) params.category = category;
  if (location) params.location = location;
  if (date) params.date = date;
  if (sort === "relevance") params.sort = sort;

  const queryString = new URLSearchParams(params).toString();

  console.log(queryString);

  if (queryString) {
    const { data } = await makeRequest({
      endpoint: `${API_ENDPOINT.SEARCH_EVENT}?${queryString}`,
      hasToken: true,
    });
    const container = document.querySelector(".events-list-container");

    const user = JSON.parse(localStorage.getItem("user"));

    const eventsNotCreated = data.filter(
      (event) => event.createBy !== user._id.toString()
    );

    displayEvents(eventsNotCreated, container);

    if (!eventsNotCreated.length) {
      container.innerHTML = "";
      container.append(NoResults({ text: "No events found" }));
    }
  }
};

export const resetFilters = () => {
  // Filter elements
  const queryElement = document.querySelector("#search");

  const categoriesElement = document.querySelector(
    "#categories-filter-dropdown-wrapper span"
  );
  const typeElement = document.querySelector(
    "#type-filter-dropdown-wrapper span"
  );
  const dateElement = document.querySelector("#time-dropdown-wrapper span");

  const locationElement = document.querySelector("#locations-filter");

  // Reset elements
  queryElement.value = "";
  categoriesElement.textContent = "Any Categories";
  typeElement.textContent = "Any Type";
  dateElement.textContent = "Any Date";
  locationElement.value = "";

  // Style button to be disabled
  const filterButton = document.querySelector("#reset");
  filterButton.disabled = true;
  filterButton.classList.add("disabled");

  // get all events
  filter();
};
