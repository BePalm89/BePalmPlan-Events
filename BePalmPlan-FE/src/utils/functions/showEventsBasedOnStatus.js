import { API_ENDPOINT } from "../api/url.enum";

import { makeRequest } from "../api/makeRequest";
import { displayEvents } from "./displayEvents";
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

  const { data, status } = await makeRequest({
    endpoint,
    token,
  });

  const events = statusEvent === "favorite" ? data.favoriteEvents : data;

  displayEvents(events, eventsContainer);
};
