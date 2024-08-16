import './TextArea.css';

import { required } from '../../utils/form.utils';
import { toTitleCase, formattedId } from '../../utils/format.utils';

export const TextArea = (name, rows, cols, isRequired) => {
    

    return `
        <div class="form-item">
            <label for="${formattedId(name)}">${toTitleCase(name)} ${required(isRequired)}</label>
            <textarea id="${formattedId(name)}" rows="${rows}" cols="${cols}"></textarea>
            <span class="error-message" id="${formattedId(name)}-error"></span>
        </div>
    `
}