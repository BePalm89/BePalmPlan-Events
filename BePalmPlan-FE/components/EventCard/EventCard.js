import './EventCard.css';

export const EventCard = (event) => {
    return `
    <div class="event-card-container">
        <div class="event-card-img-container">
            <img src="${event.imgEvent}"  alt="${event.title}"/>
        </div>
        <div class="event-card-body">
            <h4>${event.title}</h4>
            <p>${event.description}</p>
            <p><span>${event.date}</span> <span>${event.location}</span></p>
        </div>
    </div>`
} 