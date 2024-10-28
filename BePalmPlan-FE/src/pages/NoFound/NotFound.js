import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { navigate } from "../../utils/functions/navigate";
import { Home } from "../Home/Home";
import "./NotFound.css";

export const NotFound = () => {
  const div = document.createElement("div");
  div.classList.add("not-found");

  const main = document.querySelector("main");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  main.innerHTML = "";
  header.remove();
  footer.remove();
  main.appendChild(div);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-not-found-container");

  const img = document.createElement("img");
  img.src = "/images/not-found.png";
  img.alt = "not-found";

  imgContainer.append(img);

  const h4 = document.createElement("h4");
  h4.textContent = "go home";

  div.append(imgContainer);
  div.append(h4);

  h4.addEventListener("click", (e) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    navigate(e, { path: "/", page: Home });
    Header();
    Footer();
  });

  return div;
};
