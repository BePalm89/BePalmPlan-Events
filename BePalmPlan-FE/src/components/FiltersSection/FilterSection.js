import "./FiltersSection.css";

import { CATEGORIES } from "../../data/categories";
import { TYPE } from "../../data/locations";
import { SORTING } from "../../data/sorting";
import { TIME } from "../../data/time";

import { Autosuggest } from "../Autosuggest/Autosuggest";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";

import { filter } from "../../utils/functions/filters";

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
  });

  filterContainer.append(searchTextInput, categories, type, time, location);

  const actionDiv = document.createElement("div");
  actionDiv.classList.add("actions");

  const sorting = Select({
    labelText: "sorting",
    id: "sorting",
    options: SORTING,
    className: "form-dropdown-wrapper dark",
  });

  const resetFilterButton = Button({
    label: "reset filters",
    className: "filled",
    id: "reset",
  });

  actionDiv.append(sorting, resetFilterButton);

  div.append(filterContainer);
  div.append(actionDiv);

  return div;
};
