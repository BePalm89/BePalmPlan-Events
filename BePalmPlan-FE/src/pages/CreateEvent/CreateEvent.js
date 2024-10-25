import "./CreateEvent.css";

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

export const CreateEvent = () => {
  const div = document.createElement("div");

  div.classList.add("modal-content");
  div.id = "create-event";

  const form = document.createElement("form");
  form.classList.add("create-event-form");
  form.noValidate = true;

  const titleInput = Input({
    labelText: "title",
    id: "title",
    required: true,
    inputAction: (e) => handleErrors(e, "text"),
  });

  const descriptionTextArea = TextArea({
    labelText: "description",
    id: "description",
    rows: 4,
    cols: 50,
    required: true,
    textAreaAction: (e) => handleErrors(e, "text"),
  });

  const categorySelect = Select({
    labelText: "category",
    id: "categories",
    options: CATEGORIES,
    hasLabel: true,
    required: true,
    className: "form-dropdown-wrapper",
  });

  let locationAutosuggest = null;

  const whereSelect = Select({
    labelText: "Where",
    id: "type",
    options: TYPE,
    hasLabel: true,
    required: true,
    className: "form-dropdown-wrapper",
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

  const today = new Date();

  const whenInput = DatePicker({
    labelText: "when",
    id: "when",
    min: ISODate(today),
    datePickerAction: (e) => handleErrors(e, "date"),
  });

  const uploadPhotoInput = Input({
    labelText: "upload photo",
    id: "upload-photo",
    required: true,
    type: "file",
  });

  const createEventButton = Button({
    label: "create",
    className: "filled",
    id: "create-event",
  });

  div.append(
    createCloseButton(),
    Logo({ justLogo: true }),
    createTitle(),
    form
  );

  form.append(
    titleInput,
    descriptionTextArea,
    categorySelect,
    whereSelect,
    uploadPhotoInput,
    whenInput,
    createEventButton
  );

  form.addEventListener("submit", handleCreateEvent);

  return div;
};

const createTitle = () => {
  const title = document.createElement("h2");
  title.textContent = "create your event";

  return title;
};
