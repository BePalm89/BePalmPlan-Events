import "./AttendeesCard.css";

import { Avatar } from "../Avatar/Avatar";

export const AttendeesCard = ({ attendee, isHost = false }) => {
  const div = document.createElement("div");
  div.classList.add("att-card-container");

  if (isHost) {
    const hostContainer = document.createElement("div");
    hostContainer.classList.add("host");
    hostContainer.textContent = "host";
    div.append(hostContainer);
  }

  div.append(Avatar(attendee));
  const userName = document.createElement("p");
  userName.textContent = attendee.username;

  div.append(userName);

  return div;
};
