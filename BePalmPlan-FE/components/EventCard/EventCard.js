import './EventCard.css';

import { ButtonLink } from '../Button/Button';

import { formatDate } from '../../utils/format.utils';

export const EventCard = (event) => {

    const isOnline = event.location.toLowerCase() === 'online';
    return `
    <div class="event-card-container">
        <div class="event-card-img-container">
            <img src="${event.imgEvent}"  alt="${event.title}"/>
        </div>
        ${isOnline ? `<div class="online">${event.location.toUpperCase()}</div>` : ''}
        <div class="event-card-body">
            <h4>${event.title}</h4>
            <p class="description">${event.description}</p>
            <p class="info"><span>${formatDate(event.date)}</span> ${!isOnline ? `<span>${event.location}</span>` : ``} </p>
        </div>
        <div>
        ${ButtonLink("See the events", "secondary")}
        </div>
    </div>`
} 