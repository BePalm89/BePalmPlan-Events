import "./FiltersSection.css";

import { CATEGORIES } from "../../data/categories";
import { TYPE } from "../../data/locations";
import { SORTING } from "../../data/sorting";
import { TIME } from "../../data/time";

import { Autosuggest } from "../Autosuggest/Autosuggest";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";

import {
  filter,
  resetFilters,
  handleSorting,
} from "../../utils/functions/filters";

export const FiltersSection = () => {
  const div = document.createElement("div");
  div.classList.add("action-header");

  const filterContainer = document.createElement("div");
  filterContainer.classList.add("filter-container");

  const searchTextInput = Input({
    id: "search",
    required: false,
    placeholder: "Search for events",
    hasIcon: true,
    hasLabel: false,
    inputAction: filter,
  });

  const categories = Select({
    labelText: "categories",
    id: "categories-filter",
    options: CATEGORIES,
    className: "form-dropdown-wrapper dark",
    itemAction: filter,
  });

  const type = Select({
    labelText: "type",
    id: "type-filter",
    options: TYPE,
    className: "form-dropdown-wrapper dark",
    itemAction: filter,
  });

  const time = Select({
    labelText: "time",
    id: "time",
    options: TIME,
    className: "form-dropdown-wrapper dark",
    itemAction: filter,
  });

  const location = Autosuggest({
    id: "locations-filter",
    hasLabel: false,
    hasIcon: true,
    required: false,
    autosuggestAction: filter,
    placeholder: "Search for location",
  });

  filterContainer.append(searchTextInput, categories, type, time, location);

  const actionDiv = document.createElement("div");
  actionDiv.classList.add("actions");

  const sorting = Select({
    labelText: "sorting",
    id: "sorting",
    options: SORTING,
    className: "form-dropdown-wrapper dark",
    selectAction: handleSorting,
  });

  const checkFilters = () => {
    const queryElement = document.querySelector("#search");

    const categoriesElement = document.querySelector(
      "#categories-filter-dropdown-wrapper span"
    );
    const typeElement = document.querySelector(
      "#type-filter-dropdown-wrapper span"
    );
    const dateElement = document.querySelector("#time-dropdown-wrapper span");

    const locationElement = document.querySelector("#locations-filter");

    return !!(
      queryElement?.value ||
      !categoriesElement?.textContent.toLocaleLowerCase().includes("any") ||
      !typeElement?.textContent.toLocaleLowerCase().includes("any") ||
      !dateElement?.textContent.toLocaleLowerCase().includes("any") ||
      locationElement?.value
    );
  };

  const resetFilterButton = Button({
    label: "reset filters",
    className: "filled",
    id: "reset",
    fnc: resetFilters,
    disabled: true,
  });

  actionDiv.append(sorting, resetFilterButton);

  div.append(filterContainer);
  div.append(actionDiv);

  const updateButtonState = () => {
    resetFilterButton.disabled = !checkFilters();
    checkFilters()
      ? resetFilterButton.classList.remove("disabled")
      : resetFilterButton.classList.add("disabled");
  };

  searchTextInput.addEventListener("input", updateButtonState);
  categories.addEventListener("click", updateButtonState);
  type.addEventListener("click", updateButtonState);
  time.addEventListener("click", updateButtonState);
  location.addEventListener("input", updateButtonState);

  setTimeout(() => {
    const sortingDropdown = document.querySelector(
      "#sorting-dropdown-wrapper span"
    );
    sortingDropdown.textContent = SORTING[0].label;
  }, 500);

  return div;
};
