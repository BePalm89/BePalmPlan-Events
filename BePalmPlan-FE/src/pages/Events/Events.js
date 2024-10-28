import "./Events.css";

import { createPage } from "../../utils/functions/createPage";
import { makeRequest } from "../../utils/api/makeRequest";
import { API_ENDPOINT } from "../../utils/api/url.enum";
import { Title } from "../../components/Title/Title";
import { Button } from "../../components/Button/Button";
import { displayEvents } from "../../utils/functions/displayEvents";
import { openModal } from "../../utils/functions/openModal";
import { FiltersSection } from "../../components/FiltersSection/FilterSection";

export const Events = async () => {
  const div = createPage("events");

  const data = await getAllEvents();

  const user = JSON.parse(localStorage.getItem("user"));

  const eventsNotCreated = data.filter(
    (event) => event.createBy !== user._id.toString()
  );

  const actionDiv = document.createElement("div");
  actionDiv.classList.add("events-page-header-filters");

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("events-page-header");

  headerDiv.innerHTML += `
    ${Title("Upcoming events")}
    `;

  headerDiv.append(
    Button({
      label: "create event",
      className: "filled",
      id: "create-event",
      fnc: () => openModal("create"),
    })
  );

  actionDiv.append(headerDiv);
  actionDiv.append(FiltersSection());

  const eventListContainer = document.createElement("div");
  eventListContainer.classList.add("events-list-container");

  displayEvents(eventsNotCreated, eventListContainer);

  div.append(actionDiv);
  div.append(eventListContainer);
};

const getAllEvents = async () => {
  const token = localStorage.getItem("token");

  const { data, status } = await makeRequest({
    endpoint: API_ENDPOINT.GET_ALL_EVENTS,
    token: token,
  });

  return data;
};
