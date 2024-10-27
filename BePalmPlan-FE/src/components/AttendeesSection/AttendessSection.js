import { AttendeesCard } from "../AttendeesCard/AttendeesCard";
import "./AttendeesSection.css";

export const AttendeesSection = (attendees, createBy) => {
  const div = document.createElement("div");
  div.classList.add("attendees-section");

  const numberOfAttendees = document.createElement("h4");
  numberOfAttendees.textContent = `Attendees (${attendees.length + 1})`;

  div.append(numberOfAttendees);

  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("att-cards-container");
  div.append(cardsContainer);

  cardsContainer.append(AttendeesCard({ attendee: createBy, isHost: true }));

  for (const attendee of attendees) {
    cardsContainer.append(AttendeesCard({ attendee: attendee }));
  }

  return div;
};
