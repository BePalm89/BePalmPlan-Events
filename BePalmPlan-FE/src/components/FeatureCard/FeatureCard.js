import "./FeatureCard.css";

export const FeatureCard = (feature) => {
  return `
  <div class="feature-card-container">
        <div class="feature-card-img-container">
            <img src="${feature.img}" alt=""/>
        </div>
        <div class="feature-card-body">
            <h4>${feature.title}</h4>
            <p>${feature.description}</p>
        </div> 
    </div>`;
};
