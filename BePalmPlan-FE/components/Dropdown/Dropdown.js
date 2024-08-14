import { toTitleCase } from '../../utils/format.utils';
import './Dropdown.css';

export const Dropdown = (name,options) => {

    return `
        <div id="${name}-dropdown-wrapper" class="dropdown-wrapper">
            <span>Any ${toTitleCase(name)}</span>

            <ul id="${name}-dropdown-list" class="dropdown-list">
                ${options.map((option) => {
                    return `<li id="${option.value}">${toTitleCase(option.label)}</li>`
                    }).join("")}
            </ul>
        </div>
    `
}
