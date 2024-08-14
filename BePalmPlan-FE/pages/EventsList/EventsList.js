import { Button } from "../../components/Button/Button";
import { Filters } from "../../components/Filters/Filters";
import { Title } from "../../components/Title/Title";
import "./EventsList.css";



export const EventsList = () => {
  return `
  <div class="events-page-container">
    <div class="events-page-header-filters">
      <div class="events-page-header">
        ${Title("Upcoming events")}
        ${Button("create event", "filled")}
      </div>
        ${Filters()}
      </div>
      <div class="events-list-container">
    </div>
  </div>
 `;
};
