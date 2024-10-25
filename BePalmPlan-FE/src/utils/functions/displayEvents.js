import { EventCard } from "../../components/EventCard/EventCard";

export const displayEvents = (events, container) => {
  container.innerHTML = "";
  for (const event of events) {
    container.append(EventCard(event));
  }
};
