import { EventCard } from "../EventCard/EventCard";
import "./EventsSection.css";

export const EventsSection = (data) => {
  return `
            ${data
              .map((event) => {
                return `${EventCard(event)}`;
              })
              .join("")}
        `;
};
