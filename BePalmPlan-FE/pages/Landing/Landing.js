import "./Landing.css";
import { CitiesContainer } from "../../components/CitiesContainer/CitiesContainer";
import { HeroBox } from "../../components/HeroBox/HeroBox";
import { FeatureContainer } from "../../components/FeaturesContainer/FeatureContainer";
import { CategoriesSection } from "../../components/CategoriesContainer/CategoriesSection";

export const Landing = () => {

  return `
    ${HeroBox()}
    ${CategoriesSection()}
    ${CitiesContainer()}
    ${FeatureContainer()}
    `;
};
