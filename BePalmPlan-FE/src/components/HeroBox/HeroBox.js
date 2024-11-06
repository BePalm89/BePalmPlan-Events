import { Events } from "../../pages/Events/Events";
import { navigate } from "../../utils/functions/navigate";
import { Button } from "../Button/Button";
import "./HeroBox.css";

export const HeroBox = () => {
  const section = document.createElement("section");
  section.id = "hero-box-container";

  const h1 = document.createElement("h1");
  h1.innerHTML = `Discover <span>amazing events</span> and make some friends`;

  section.append(h1);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("hero-box-img-container");

  const heroImg = document.createElement("img");
  heroImg.src = "/images/hero-img.png";
  heroImg.alt = "hero img";

  imgContainer.append(heroImg);

  const token = localStorage.getItem("token");

  if (token) {
    imgContainer.append(
      Button({
        label: "Go to Events",
        className: "outline",
        id: "go-to-events",
        fnc: (e) => navigate(e, { path: "/events", page: Events }),
      })
    );
  }

  section.append(imgContainer);

  return section;
};
