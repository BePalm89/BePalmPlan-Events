import { toTitleCase } from '../../utils/format.utils';
import './TextArea.css';

export const TextArea = (name, rows, cols, isRequired) => {
    
    const formattedName = name.includes("") ? name.replaceAll(" ", "-") : name;

    const required = isRequired ? '*' : '';

    return `
        <div class="form-item">
            <label for="${formattedName}">${toTitleCase(name)} ${required}</label>
            <textarea id="${formattedName}" rows="${rows}" cols="${cols}"></textarea>
            <span class="error-message" id="${formattedName}-error"></span>
        </div>
    `
}