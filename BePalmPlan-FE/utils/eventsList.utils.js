import { API_ENDPOINTS } from "./url.enum";
import { makeRequest } from "./fetch.utils";

import { EventsSection } from "../components/EventsSection/EventsSection";

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
  }
};

export const eventListTemplate = (data) => {
  const wrapperElement = document.querySelector(".events-container");

  wrapperElement.innerHTML += EventsSection(data)

};
