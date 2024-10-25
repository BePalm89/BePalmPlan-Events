import "./Autosuggest.css";

import { makeRequest } from "../../utils/api/makeRequest";
import { API_ENDPOINT } from "../../utils/api/url.enum";

export const Autosuggest = ({
  labelText,
  id,
  required = true,
  hasLabel = true,
  hasIcon = false,
  autosuggestAction,
}) => {
  // Container
  const div = document.createElement("div");
  div.classList.add("autosuggest-container");

  // Form item
  const formItemDiv = document.createElement("div");
  formItemDiv.classList.add("form-item");

  div.append(formItemDiv);

  // Label
  if (hasLabel) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = required ? labelText + "*" : labelText;

    formItemDiv.append(label);
  }

  // Input
  const input = document.createElement("input");
  input.type = "text";
  input.id = id;

  formItemDiv.append(input);

  const listContainer = document.createElement("div");
  listContainer.classList.add(`suggestions-${id}-container`);

  if (hasIcon) {
    formItemDiv.remove();
    const inputIconContainer = document.createElement("div");
    inputIconContainer.style.display = "flex";
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("search-icon-container");

    const imgIcon = document.createElement("img");
    imgIcon.alt = "search-icon";
    imgIcon.src = "/icons/loupe-white.png";

    iconContainer.append(imgIcon);

    input.classList.add("filter-locations");
    listContainer.style.top = "45px";

    inputIconContainer.append(input);
    inputIconContainer.append(iconContainer);
    div.append(inputIconContainer);

    inputIconContainer.addEventListener("click", autosuggestAction);
  }

  // Error
  const error = document.createElement("span");
  error.classList.add("error-message");
  error.id = `${id}-error`;

  formItemDiv.append(error);

  // List of location

  div.append(listContainer);

  const ul = document.createElement("ul");
  ul.classList.add(`suggestions-${id}-list`);

  listContainer.append(ul);

  input.addEventListener("input", (e) => {
    handleAutosuggestList(e, ul, listContainer, error, input, required, id);
  });

  return div;
};

const highlightText = (text, query) => {
  const regex = new RegExp(`(${query})`, "gi");

  const parts = text.split(regex);

  const fragment = document.createDocumentFragment();

  parts.forEach((part) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      const span = document.createElement("span");
      span.classList.add("highlight");
      span.textContent = part;
      fragment.appendChild(span);
    } else {
      fragment.appendChild(document.createTextNode(part));
    }
  });

  return fragment;
};

let debounceTime;

const handleAutosuggestList = (
  e,
  ul,
  listContainer,
  error,
  input,
  required,
  id
) => {
  const token = localStorage.getItem("token");
  const query = e.target.value;

  error.textContent = "";
  input.classList.remove("error-input");

  clearTimeout(debounceTime);

  debounceTime = setTimeout(async () => {
    if (query) {
      const { status, data } = await makeRequest({
        endpoint: `${API_ENDPOINT.LOCATION_SEARCH}?city=${query}`,
        token,
      });

      if (status === 200) {
        ul.innerHTML = "";
        listContainer.classList.add("show");

        if (!data.length) {
          const noResult = document.createElement("p");
          noResult.textContent = "No results!";
          noResult.classList.add("no-results");
          ul.append(noResult);
        }

        for (const location of data) {
          createLocationList(location, ul, query, id);
        }
      }
    } else {
      listContainer.classList.remove("show");
      if (required) {
        error.textContent = "This field is required";
        input.classList.add("error-input");
      }
    }
  }, 500);
};

const createLocationList = (location, ul, query, id) => {
  const li = document.createElement("li");
  li.classList.add("suggestions-item");
  li.textContent = "";
  const highlightedCity = highlightText(location.city, query);
  li.append(highlightedCity);
  li.appendChild(document.createTextNode(", "));
  li.append(document.createTextNode(`${location.country}`));
  li.addEventListener("click", (e) => selectLocation(e, id));
  ul.append(li);
};

const selectLocation = (e, id) => {
  const listContainer = document.querySelector(`.suggestions-${id}-container`);
  const input = document.querySelector(`#${id}`);
  input.value = e.target.textContent;
  listContainer.classList.remove("show");
};
