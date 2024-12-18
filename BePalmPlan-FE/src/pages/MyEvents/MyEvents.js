import "./MyEvents.css";

import { PageHeader } from "../../components/PageHeader/PageHeader";
import { createPage } from "../../utils/functions/createPage";
import { EventStatusBar } from "../../components/EventStatusBar/EventStatusBar";
import { showEventsBasedOnStatus } from "../../utils/functions/showEventsBasedOnStatus";
import { makeRequest } from "../../utils/api/makeRequest";
import { API_ENDPOINT } from "../../utils/api/url.enum";
import { displayEvents } from "../../utils/functions/displayEvents";
import { NoResults } from "../../components/NoResults/NoResults";
export const MyEvents = async () => {
  const div = createPage("my-events");

  const user = JSON.parse(localStorage.getItem("user"));

  const { data } = await makeRequest({
    endpoint: `${API_ENDPOINT.GET_ATTENDING_EVENTS}/${user._id}`,
    hasToken: true,
  });

  const header = PageHeader({
    titleLabel: "My events",
    isButtonVisible: true,
    btnLabel: "Edit event",
    btnFnc: () => console.log("click"),
    btnId: "edit",
  });

  const eventStatusBar = EventStatusBar({
    statusFcn: (e) => showEventsBasedOnStatus(e, eventsContainer),
  });

  const eventsContainer = document.createElement("div");
  eventsContainer.classList.add("events-list-container");

  displayEvents(data, eventsContainer);

  if (!data.length) {
    eventsContainer.innerHTML = "";
    eventsContainer.append(
      NoResults({ text: "You have not registered for any events" })
    );
  }

  div.append(header, eventStatusBar, eventsContainer);

  const attendingItem = document.querySelector(".status-item");
  attendingItem.classList.add("active");

  return div;
};
