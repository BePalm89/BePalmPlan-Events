import "./CreateEditEvent.css";

import { Input } from "../../components/Input/Input";
import { Logo } from "../../components/Logo/Logo";
import { createCloseButton } from "../../utils/functions/createCloseButtonModal";
import { handleErrors } from "../../utils/functions/handleErrors";
import { TextArea } from "../../components/TextArea/TextArea";
import { Select } from "../../components/Select/Select";
import { CATEGORIES } from "../../data/categories";
import { TYPE } from "../../data/locations";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { ISODate } from "../../utils/functions/formatDate";
import { Autosuggest } from "../../components/Autosuggest/Autosuggest";
import { Button } from "../../components/Button/Button";
import { handleCreateEvent } from "../../utils/functions/handleCreateEvent";

export const CreateEvent = (event, isEdit = false) => {
  const div = document.createElement("div");

  const pageId = isEdit ? "edit-event" : "create-event";

  div.classList.add("modal-content");
  div.id = pageId;

  const form = document.createElement("form");
  form.classList.add("create-event-form");
  form.noValidate = true;

  const titleInput = Input({
    labelText: "title",
    id: "title",
    required: true,
    inputAction: (e) => handleErrors(e, "text"),
    value: isEdit ? event.title : "",
  });

  const descriptionTextArea = TextArea({
    labelText: "description",
    id: "description",
    rows: 4,
    cols: 50,
    required: true,
    textAreaAction: (e) => handleErrors(e, "text"),
    value: isEdit ? event.description : "",
  });

  const selectedCategory =
    isEdit &&
    CATEGORIES.find((category) => category.value === event.category).label;

  const categorySelect = Select({
    labelText: "category",
    id: "categories",
    options: CATEGORIES,
    hasLabel: true,
    required: true,
    className: "form-dropdown-wrapper",
    value: isEdit ? selectedCategory : null,
  });

  let locationAutosuggest = null;

  const selectedType =
    isEdit && event.location === "online" ? TYPE[1].label : TYPE[2].label;

  const whereSelect = Select({
    labelText: "Where",
    id: "type",
    options: TYPE,
    hasLabel: true,
    required: true,
    className: "form-dropdown-wrapper",
    value: isEdit ? selectedType : null,
    selectAction: (e) => {
      if (e.target.textContent === "in person") {
        if (!locationAutosuggest) {
          locationAutosuggest = Autosuggest({
            labelText: "location",
            id: "locations",
          });
          whereSelect.insertAdjacentElement("afterend", locationAutosuggest);
        }
      } else {
        if (locationAutosuggest) {
          form.removeChild(locationAutosuggest);
          locationAutosuggest = null;
        }
      }
    },
  });

  const isInPerson = isEdit && event.location !== "online";

  form.append(titleInput, descriptionTextArea, categorySelect, whereSelect);

  if (isInPerson) {
    locationAutosuggest = Autosuggest({
      labelText: "location",
      id: "locations",
      value: isEdit ? event.location : null,
    });

    form.insertBefore(locationAutosuggest, whereSelect.nextSibling);
  }

  const today = new Date();

  const whenInput = DatePicker({
    labelText: "when",
    id: "when",
    min: ISODate(today),
    datePickerAction: (e) => handleErrors(e, "date"),
    value: isEdit ? event.date : null,
  });

  const photoValue = event?.imgEvent.split("/").pop();

  const uploadPhotoInput = Input({
    labelText: "upload photo",
    id: "upload-photo",
    required: true,
    type: "file",
    value: isEdit ? photoValue : null,
  });

  const createEventButton = Button({
    label: isEdit ? "Edit" : "create",
    className: "filled",
    id: isEdit ? "edit-event" : "create-event",
  });

  div.append(
    createCloseButton(),
    Logo({ justLogo: true }),
    createTitle(),
    form
  );

  form.append(uploadPhotoInput, whenInput, createEventButton);

  form.addEventListener("submit", (e) =>
    handleCreateEvent(e, isEdit, photoValue, event)
  );

  return div;
};

const createTitle = () => {
  const title = document.createElement("h2");
  title.textContent = "create your event";

  return title;
};
