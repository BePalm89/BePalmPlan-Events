import { EventStatusItem } from "../EventStatusItem/EventStatusItem";
import "./EventStatusBar.css";

const status = ["attending", "hosting", "favorite"];

export const EventStatusBar = ({ statusFcn }) => {
  const div = document.createElement("div");
  div.classList.add("event-status-container");

  const nav = document.createElement("nav");
  div.append(nav);

  const ul = document.createElement("ul");
  nav.append(ul);

  for (const item of status) {
    const li = EventStatusItem({
      status: item,
      fnc: statusFcn,
    });
    ul.append(li);
  }

  return div;
};
