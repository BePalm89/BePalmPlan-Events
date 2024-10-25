import { openModal } from "../../utils/functions/openModal";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { Logo } from "../Logo/Logo";
import { Menu } from "../Menu/Menu";
import "./Header.css";

export const Header = () => {
  const appDiv = document.querySelector("#app");

  const existingHeader = document.querySelector("header");

  if (existingHeader) {
    existingHeader.remove();
  }

  const header = document.createElement("header");

  header.innerHTML = "";

  const token = localStorage.getItem("token");
  const userFromLocalStorage = localStorage.getItem("user");

  const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

  header.append(Logo({ justLogo: false }));

  if (token) {
    header.append(Avatar(user));
    header.append(Menu());
  } else {
    const ctaContainer = document.createElement("div");

    ctaContainer.classList.add("buttons-container");

    header.append(ctaContainer);

    ctaContainer.append(
      Button({
        label: "Login",
        className: "ghost",
        id: "login",
        fnc: () => openModal("login"),
      })
    );

    ctaContainer.append(
      Button({
        label: "Sign up",
        className: "filled",
        id: "sign-up",
        fnc: () => openModal("signup"),
      })
    );
  }

  appDiv.insertBefore(header, appDiv.firstChild);
};
