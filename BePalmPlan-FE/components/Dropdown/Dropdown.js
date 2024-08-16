import { required } from '../../utils/form.utils';
import { toTitleCase } from '../../utils/format.utils';
import './Dropdown.css';

export const Dropdown = (name,options, style="dropdown-wrapper", hasLabel = false, label= "", isRequired = false) => {
    return `
        ${hasLabel ? `<label class="dropdown-label">${toTitleCase(label)} ${required(isRequired)}</label>` : ''}
        <div id="${name}-dropdown-wrapper" class="dropdown-wrapper ${style}">
            <span>Any ${toTitleCase(name)}</span>

            <ul id="${name}-dropdown-list" class="dropdown-list">
                ${options.map((option) => {
                    return `<li id="${option.value}">${toTitleCase(option.label)}</li>`
                    }).join("")}
            </ul>
        </div>
    `
}
