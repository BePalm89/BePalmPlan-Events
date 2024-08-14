import { Dropdown } from '../Dropdown/Dropdown';
import './Filters.css';
import { FILTERS } from './Filters.data';

export const Filters = () => {
    
    return `
    <div>
        ${FILTERS.map((filter) => {
            return `${Dropdown(filter.name, filter.options)}`
            }).join("")}
    </div>`
}

// `<div>${Dropdown("date", dateOptions)}</div>`