import "./Navbar.css";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { Avatar } from "../Avatar/Avatar";
import { SearchBar } from "../SearchBar/SearchBar";

export const NavbarTemplate = () => {
  const hasToken = !!localStorage.getItem("token");
  const userFromLocalStorage = localStorage.getItem("user");

  const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {};

  const header = document.createElement("header");

  header.innerHTML += Navbar(hasToken, user);

  return header;
};

const Navbar = (hasToken, user) => {
  
  return `
        ${Logo(true)}
        
        ${
          hasToken
            ? `${SearchBar()} ${Avatar(user)}`
            : `<div class="buttons-container">
                    ${Button("Login", "ghost")}
            ${Button("Sign up", "filled")}
            </div>`
        }    
        `;
};


