import "./Home.css";

import { HeroBox } from "../../components/HeroBox/HeroBox";
import { CategoriesSection } from "../../components/CategoriesContainer/CategoriesSection";
import { CitiesContainer } from "../../components/CitiesContainer/CitiesContainer";
import { FeatureContainer } from "../../components/FeaturesContainer/FeatureContainer";

import { createPage } from "../../utils/functions/createPage";

export const Home = () => {
  const div = createPage("home");

  div.append(
    HeroBox(),
    CategoriesSection(),
    CitiesContainer(),
    FeatureContainer()
  );
};
