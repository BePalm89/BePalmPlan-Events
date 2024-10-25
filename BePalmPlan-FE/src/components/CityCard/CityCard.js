import './CityCard.css';

export const CityCard = (city) => {
    return `
    <div class="city-card-container">
        <div class="city-card-img-container">
            <img src="${city.img}"/>
        </div>
        <h4>${city.name}</h4>
    </div>`
}