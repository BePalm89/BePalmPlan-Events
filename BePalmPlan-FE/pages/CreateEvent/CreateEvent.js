import "./CreateEvent.css";

import { ISODate } from "../../utils/format.utils";

import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/Title";
import { Input } from "../../components/Input/Input";
import { TextArea } from "../../components/TextArea/TextArea";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { InputFile } from "../../components/InputFile/InputFile";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { FILTERS } from "../../components/Filters/Filters.data";
import { Button } from "../../components/Button/Button";

export const CreateEventTemplate = () => {
  const modalContainer = document.createElement("div");

  modalContainer.classList.add("modal-overlay");
  modalContainer.id = "create-event-modal-overlay";

  modalContainer.innerHTML += createEventModalTemplate();

  return modalContainer;
};

const createEventModalTemplate = () => {
  const categoryOption = FILTERS.find((filter) => filter.name === "category");

  const whereOption = {
    name: "where",
    options: [
      { label: "any where", value: "" },
      {
        label: "online",
        value: "online",
      },
      {
        label: "In person",
        value: "in-person",
      },
    ],
  };

  const today = new Date();

  return `
    <div class="modal-content">
        <div class="close-icon-container">
            <img  src="/icons/close.png" alt="close-icon" id="close-btn"/>
        </div>
        ${Logo()}
        ${Title("Create your event")}
        <form id="form-create-event" novalidate>
            <div class="m-b-m create-event-form m-t-s">
                ${Input("title", true)}
                ${TextArea("description", 4, 50, true)}
                ${Dropdown(
                  "categories",
                  categoryOption.options,
                  "form-dropdown-wrapper",
                  true,
                  "Category",
                  true
                )}
                ${Dropdown(
                  "where",
                  whereOption.options,
                  "form-dropdown-wrapper",
                  true,
                  "Where",
                  true
                )}
                <div id="autosuggest-locations-wrapper">      
    
                </div>
                ${DatePicker("when", ISODate(today), true)}
                ${InputFile("upload photo", true)}
            </div>
            ${Button("create", "filled", true)}
        </form>
    </div>`;
};
