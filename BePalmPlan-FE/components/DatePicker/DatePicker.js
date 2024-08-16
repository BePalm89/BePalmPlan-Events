import './DatePicker.css';

import { required } from '../../utils/form.utils';
import { ISODate, toTitleCase, formattedId } from '../../utils/format.utils';

const today = new Date();

export const DatePicker = (name, min, isRequired ,value = ISODate(today)) => {
   
    return `
        <div class="form-item">
            <label for="${formattedId(name)}">${toTitleCase(name)} ${required(isRequired)}</label>
            <input type="datetime-local" id="${formattedId(name)}" value="${value}" min="${min}"/>
            <span class="error-message" id="${formattedId(name)}-error"></span>
        </div>
    `
}