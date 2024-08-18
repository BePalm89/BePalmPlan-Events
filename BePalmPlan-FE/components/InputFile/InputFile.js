import { required } from "../../utils/form.utils";
import { formattedId, toTitleCase } from "../../utils/format.utils";
import "./InputFile.css";

export const InputFile = (name, isRequired = false) => {
  return `
    <div class="form-item">
        <label for="${formattedId(name)}">${toTitleCase(name)} ${required(
    isRequired
  )}</label>
        <input id="${formattedId(name)}" type="file" style="display: none;">
        <div>
            <label for="${formattedId(
              name
            )}" class="custom-file-upload">Choose File</label>
            <span id="file-chosen">No file chosen</span>
        </div>
      ${
        isRequired
          ? `<span class="error-message" id="${formattedId(
              name
            )}-error"></span>
`
          : ""
      }
    </div>
    `;
};
