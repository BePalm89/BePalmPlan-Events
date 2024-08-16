import './Input.css';

import { required } from '../../utils/form.utils';
import { formattedId, toTitleCase } from '../../utils/format.utils';

export const Input = (name, isRequired, type = 'text') => {
    
    return `
        <div class="form-item">
            <label for="${formattedId(name)}">${toTitleCase(name)} ${required(isRequired)}</label>
            <input id="${formattedId(name)}" type="${type}"/>
            <span class="error-message" id="${formattedId(name)}-error"></span>
        </div>`
}