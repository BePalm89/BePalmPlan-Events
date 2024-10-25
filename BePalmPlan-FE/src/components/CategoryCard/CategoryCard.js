import './CategoryCard.css';

export const CategoryCard = (card, backgroundClass) => {
    return `
        <div class="card-container ${backgroundClass}">
            <div class="card-img-container"> 
                <img src="${card.icon}" alt="${card.label}"/>
            </div>
            <h3>${card.label}</h3>
        </div>
    `
}
