import "./CategoriesSection.css";

import { CATEGORIES } from "./CategoriesData";

import { CategoryCard } from "../CategoryCard/CategoryCard";
import { Title } from "../Title/Title";

export const CategoriesSection = () => {
  
  return `
        <section id="categories-container">
            ${Title("Explore categories")}
            <div class="categories-wrapper">
              ${CATEGORIES.map((category, index) => {
                const backgroundClass = index % 2 === 0 ? 'bgn-left' : 'bgn-right';
                return `${CategoryCard(category, backgroundClass)}`;
              }).join("")}
            </div>
        </section>
    `;
};
