import { EventCard } from "../EventCard/EventCard";
import { Filters } from "../Filters/Filters";
import { Title } from "../Title/Title";
import "./EventsSection.css";

export const EventsSection = (data) => {
    
    return `
        <div class="event-header">
            ${Title("Upcoming events")}
            ${Filters()}
        </div>
        <div>
            ${data
            .map((event) => {
                return `${EventCard(event)}`;
            })
            .join("")}
        </div>
        `;
};
