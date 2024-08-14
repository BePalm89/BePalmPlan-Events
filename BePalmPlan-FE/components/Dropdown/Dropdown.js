import { toTitleCase } from '../../utils/format.utils';
import './Dropdown.css';

export const Dropdown = (name,options) => {

    return `
    <div class="dropdown-container">
        <select name="${name}" id="${name}-select">
            ${options.map((option) => {
                return `<option value="${option.value}">${toTitleCase(option.label)}</option>`})}
        </select>
    </div>`
}