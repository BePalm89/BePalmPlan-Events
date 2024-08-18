import './Filters.css';

import { FILTERS } from './Filters.data';

import { Dropdown } from '../Dropdown/Dropdown';
import { Button } from '../Button/Button';

export const Filters = () => {
    
    return `
    <div class="action-header">
        <div class="filter-wrapper">
        ${FILTERS.map((filter) => {
            return `${Dropdown(filter.name, filter.options, 'filter-dropdown-wrapper')}`
            }).join("")}
        
    </div> 
    ${Button("Reset filters", "ghost")}
    </div>`

}
