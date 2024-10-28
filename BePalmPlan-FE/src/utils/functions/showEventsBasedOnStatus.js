import { API_ENDPOINT } from "../api/url.enum";

import { makeRequest } from "../api/makeRequest";
import { displayEvents } from "./displayEvents";

import { NoResults } from "../../components/NoResults/NoResults";
export const showEventsBasedOnStatus = async (e, eventsContainer) => {
  const allItems = document.querySelectorAll(".status-item");
  allItems.forEach((item) => item.classList.remove("active"));

  e.target.classList.add("active");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const statusEndpoints = {
    attending: `${API_ENDPOINT.GET_ATTENDING_EVENTS}/${user._id}`,
    hosting: `${API_ENDPOINT.GET_HOSTING_EVENTS}/${user._id}`,
    favorite: `${API_ENDPOINT.GET_USER_BY_ID}/${user._id}`,
  };

  const statusEvent = e.target.textContent.toLowerCase();
  const endpoint = statusEndpoints[statusEvent];

  const { data } = await makeRequest({
    endpoint,
    token,
  });

  const events = statusEvent === "favorite" ? data.favoriteEvents : data;

  console.log(statusEvent);

  let textToDisplay;
  if (statusEvent === "attending") {
    textToDisplay = "You have not registered for any events";
  } else if (statusEvent === "hosting") {
    textToDisplay = "You are not hosting any events";
  } else if (statusEvent === "favorite") {
    textToDisplay = "Choose some events that you like";
  }

  displayEvents(events, eventsContainer);

  if (!events.length) {
    eventsContainer.innerHTML = "";
    eventsContainer.append(NoResults({ text: textToDisplay }));
  }
};
