import './FeatureContainer.css';
import { Title } from '../Title/Title';
import { Subtitle } from '../Subtitle/Subtitle';
import { FEATURES } from './FeaturesData';
import { FeatureCard } from '../FeatureCard/FeatureCard';

export const FeatureContainer = () => {
    
    return `
        <section id="feature-container">    
            ${Title("Friendships are made on BePalmPlan")}
            ${Subtitle("Since 2023, member have used BePalmPlan to make new friend, spend time on hobbies and  connect with locals")}
            <div class="feature-cards-container">
                ${FEATURES.map((feature) => {
                    return `${FeatureCard(feature)}`;
                    }).join("")}
            </div>
        </section>
    `
}