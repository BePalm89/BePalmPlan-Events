import { EventDetails } from "../../pages/EventDetails/EventDetails";
import { formatDate } from "../../utils/functions/formatDate";
import { navigate } from "../../utils/functions/navigate";
import { Link } from "../Link/Link";
import "./EventCard.css";

export const EventCard = (event) => {
  const isOnline = event.location.toLowerCase() === "online";

  const div = document.createElement("div");
  div.classList.add("event-card-container");

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("event-card-img-container");

  const img = document.createElement("img");
  img.src = event.imgEvent;
  img.alt = event.title;

  if (isOnline) {
    const onlineDiv = document.createElement("div");
    onlineDiv.classList.add("online");
    onlineDiv.textContent = event.location.toUpperCase();
    div.append(onlineDiv);
  }

  const bodyDiv = document.createElement("div");
  bodyDiv.classList.add("event-card-body");

  const h4 = document.createElement("h4");
  h4.textContent = event.title;

  bodyDiv.appendChild(h4);

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = event.description;
  bodyDiv.appendChild(description);

  const info = document.createElement("p");
  info.classList.add("info");
  bodyDiv.append(info);

  const dateSpan = document.createElement("span");

  dateSpan.textContent = formatDate(event.date);
  info.append(dateSpan);

  if (!isOnline) {
    const locationSpan = document.createElement("span");
    locationSpan.textContent = event.location;
    info.append(locationSpan);
  }

  imgDiv.append(img);

  div.append(imgDiv);
  div.append(bodyDiv);

  div.append(
    Link({
      label: "See the events",
      className: "secondary",
      fcn: (e) =>
        navigate(e, { path: `/events/${event._id}`, page: EventDetails }),
    })
  );

  return div;
};