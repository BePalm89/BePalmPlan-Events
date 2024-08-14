import "./CreateEvent.css";

import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/Title";
import { Input } from "../../components/Input/Input";
import { TextArea } from "../../components/TextArea/TextArea";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { ISODate } from "../../utils/format.utils";

export const CreateEventTemplate = () => {
  const modalContainer = document.createElement("div");

  modalContainer.classList.add("modal-overlay");
  modalContainer.id = "create-event-modal-overlay";

  modalContainer.innerHTML += createEventModalTemplate();

  return modalContainer;
};

const createEventModalTemplate = () => {
    
  const today = new Date();
  console.log(today);
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
                ${DatePicker("when", ISODate(today), true)}
                ${Input("description", true)}
                ${Input("location", true)}
            </div>
        </form>
    </div>`;
};
