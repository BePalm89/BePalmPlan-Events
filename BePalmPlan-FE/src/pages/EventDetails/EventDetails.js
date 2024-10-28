import "./EventDetails.css";

import { API_ENDPOINT } from "../../utils/api/url.enum";

import { makeRequest } from "../../utils/api/makeRequest";
import { createPage } from "../../utils/functions/createPage";
import { longFormatDate } from "../../utils/functions/formatDate";

import { AttendeesSection } from "../../components/AttendeesSection/AttendessSection";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { attendEvent } from "../../utils/functions/attendEvent";
import { notGoingToEvent } from "../../utils/functions/notGoingToEvent";
import { openModal } from "../../utils/functions/openModal";
export const EventDetails = async () => {
  const div = createPage("event-details");

  const path = window.location.pathname;
  const segments = path.split("/");
  const eventId = segments[segments.length - 1];

  const token = localStorage.getItem("token");

  const { data, status } = await makeRequest({
    endpoint: `${API_ENDPOINT.GET_EVENT_BY_ID}/${eventId}`,
    token,
  });

  const userFromLocalStorage = localStorage.getItem("user");
  const user = JSON.parse(userFromLocalStorage);

  const isAlreadyAttendingEvent = data.attendees.find(
    (attendee) => attendee._id === user._id
  );

  const visibilityButton =
    user._id !== data.createBy._id && !isAlreadyAttendingEvent;

  const isEventCreatedByTheLoggedUser = user._id === data.createBy._id;

  div.append(
    PageHeader({
      titleLabel: data.title,
      buttons: [
        {
          isButtonVisible: visibilityButton,
          btnLabel: "attend event",
          btnFnc: (e) => attendEvent(e, data),
          btnId: "attend",
        },
        {
          isButtonVisible: isAlreadyAttendingEvent,
          btnLabel: "not going",
          btnFnc: (e) => notGoingToEvent(e, data),
          btnId: "attend",
          btnStyle: "outline",
        },
        {
          isButtonVisible: isEventCreatedByTheLoggedUser,
          btnLabel: "edit event",
          btnFnc: () => openModal("edit", data),
          btnId: "edit",
        },
        {
          isButtonVisible: isEventCreatedByTheLoggedUser,
          btnLabel: "delete event",
          btnFnc: (e) => console.log(e),
          btnId: "attend",
          btnStyle: "outline",
        },
      ],
    })
  );

  // Img
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  div.append(imgContainer);

  const img = document.createElement("img");
  img.src = data.imgEvent;
  img.alt = data.title;

  imgContainer.append(img);

  // Info

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");

  div.append(infoContainer);

  // Time
  const timeContainer = document.createElement("div");
  timeContainer.classList.add("time-container");
  infoContainer.append(timeContainer);

  const timeIcon = document.createElement("img");
  timeIcon.src = "/icons/clock.png";

  timeContainer.append(timeIcon);

  const timeInfo = document.createElement("p");
  timeInfo.textContent = longFormatDate(data.date);

  timeContainer.append(timeInfo);

  // Location
  const locationContainer = document.createElement("div");
  locationContainer.classList.add("location-container");
  infoContainer.append(locationContainer);

  const locationContainerIcon = document.createElement("img");
  locationContainerIcon.src = "/icons/map-pin.png";

  locationContainer.append(locationContainerIcon);

  const locationInfo = document.createElement("p");
  locationInfo.textContent = data.location;

  locationContainer.append(locationInfo);

  // Description

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container");

  const descriptionIcon = document.createElement("img");
  descriptionIcon.src = "/icons/info.png";

  descriptionContainer.append(descriptionIcon);

  const descriptionInfo = document.createElement("p");
  descriptionInfo.textContent = data.description;

  descriptionContainer.append(descriptionInfo);

  div.append(descriptionContainer);

  // Attendees
  div.append(AttendeesSection(data.attendees, data.createBy));
};
