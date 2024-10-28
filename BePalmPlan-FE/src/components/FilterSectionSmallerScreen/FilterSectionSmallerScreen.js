import { createFilters } from "../FiltersSection/FilterSection";
import "./FilterSectionSmallerScreen.css";

export const FilterSectionSmallerScreen = () => {
  const div = document.createElement("div");
  div.classList.add("filter-container-small-screen");

  const iconFilter = document.createElement("img");
  iconFilter.src = "/icons/filters.png";
  iconFilter.alt = "filters icon";

  const panel = document.createElement("div");
  panel.classList.add("filter-panel");

  const filterContainer = document.createElement("div");
  filterContainer.classList.add("filters-container-small-screen");

  const actionDiv = document.createElement("div");
  actionDiv.classList.add("actions-small-screen");

  div.append(iconFilter, panel);

  iconFilter.addEventListener("click", () => {
    panel.classList.toggle("show");
    if (panel.className.includes("show")) {
      panel.innerHTML = "";
      filterContainer.innerHTML = "";
      actionDiv.innerHTML = "";
      panel.append(filterContainer);
      panel.append(actionDiv);
      createFilters(filterContainer, actionDiv);
    }
  });

  return div;
};
