import './DatePicker.css';

import { required } from '../../utils/form.utils';
import { toTitleCase, formattedId } from '../../utils/format.utils';

export const DatePicker = (name, min, isRequired) => {
   
    return `
        <div class="form-item">
            <label for="${formattedId(name)}">${toTitleCase(name)} ${required(isRequired)}</label>
            <input type="datetime-local" id="${formattedId(name)}" min="${min}"/>
            <span class="error-message" id="${formattedId(name)}-error"></span>
        </div>
    `
}