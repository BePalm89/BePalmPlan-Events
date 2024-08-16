import { required } from "../../utils/form.utils";
import { formattedId, toTitleCase } from "../../utils/format.utils";
import "./Autosuggest.css";

export const Autosuggest = (name, isRequired, hasLabel = false) => {
  return `
  <div class="autosuggest-container">
    <div class="form-item">
                ${
                  hasLabel
                    ? `<label for="${formattedId(name)}">${toTitleCase(
                        name
                      )} ${required(isRequired)}</label> `
                    : ""
                }
            <input type="text" id="locations-event"/>
        </div>
        <div class="suggestions-location-container">
            <ul class="suggestions-location-list"></ul>
        </div>
  </div>      

    `;
};
