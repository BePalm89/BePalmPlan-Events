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
import { Autosuggest } from "../../components/Autosuggest/Autosuggest";
import { Button } from "../../components/Button/Button";

export const CreateEventTemplate = () => {
  const modalContainer = document.createElement("div");

  modalContainer.classList.add("modal-overlay");
  modalContainer.id = "create-event-modal-overlay";

  modalContainer.innerHTML += createEventModalTemplate();

  return modalContainer;
};

const createEventModalTemplate = () => {

  const categoryOption = FILTERS.find((filter) => filter.name === 'category');

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
                ${Dropdown("categories", categoryOption.options, "form-dropdown-wrapper", true, "Category", true)}
                ${Autosuggest("location", true, true)}
                ${DatePicker("when", ISODate(today), true)}
                ${InputFile("upload photo", true)}
            </div>
            ${Button("create", "filled", true)}
        </form>
    </div>`;
};
