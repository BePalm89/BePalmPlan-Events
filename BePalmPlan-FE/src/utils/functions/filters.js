import { API_ENDPOINT } from "../api/url.enum";

import { makeRequest } from "../api/makeRequest";
import { displayEvents } from "./displayEvents";
import { formattedCategory } from "./formatting";

export const filter = async () => {
  const token = localStorage.getItem("token");

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

  const date = dateElement.textContent.toLocaleLowerCase().replace(" ", "-");
  console.log(date);

  // Create params for BE
  const params = {};

  if (query) params.query = query;
  if (category) params.category = category;
  if (location) params.location = location;
  if (date) params.date = date;

  const queryString = new URLSearchParams(params).toString();

  if (queryString) {
    const { data, status } = await makeRequest({
      endpoint: `${API_ENDPOINT.SEARCH_EVENT}?${queryString}`,
      token,
    });
    const container = document.querySelector(".events-list-container");
    displayEvents(data, container);
  }
};
