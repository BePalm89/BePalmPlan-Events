import { Title } from "../Title/Title";
import "./CitiesContainer.css";
import { CITIES } from "./CitiesData";
import { CityCard } from "../CityCard/CityCard";
import { Subtitle } from "../Subtitle/Subtitle";

export const CitiesContainer = () => {
  const section = document.createElement("section");
  section.id = "cities-container";

  section.innerHTML += `
            ${Title("Popular cities")}
            ${Subtitle("Looking up fun things to do near you?")}
            <div class="cities-wrapper">
                ${CITIES.map((city) => {
                  return `${CityCard(city)}`;
                }).join("")}
            </div>`;

  return section;
};
