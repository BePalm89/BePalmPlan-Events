import { ISODate, toTitleCase } from '../../utils/format.utils';
import './DatePicker.css';

const today = new Date();
export const DatePicker = (name, min, isRequired ,value = ISODate(today)) => {
   
    const formattedName = name.includes("") ? name.replaceAll(" ", "-") : name;

    const required = isRequired ? '*' : '';

    return `
        <div class="form-item">
            <label for="${formattedName}">${toTitleCase(name)} ${required}</label>
            <input type="datetime-local" id="${formattedName}" value="${value}" min="${min}"/>
            <span class="error-message" id="${formattedName}-error"></span>
        </div>
    `
}