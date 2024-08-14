import { toTitleCase } from '../../utils/format.utils';
import './Input.css';

export const Input = (name, isRequired, type = 'text') => {
    
    const required = isRequired ? '*' : '';

    const formattedName = name.includes("") ? name.replaceAll(" ", "-") : name;

    return `
        <div class="form-item">
            <label for="${formattedName}">${toTitleCase(name)} ${required}</label>
            <input id="${formattedName}" type="${type}"/>
            <span class="error-message" id="${formattedName}-error"></span>
        </div>`
}