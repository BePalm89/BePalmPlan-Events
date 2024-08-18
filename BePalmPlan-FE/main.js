import "./style.css";
import { NavbarTemplate } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";

import { router } from "./router/router";
import { signUpModal } from "./utils/signUp.utils";
import { loginModal } from './utils/login.utils';
import { toggleMenu } from './utils/menu.utils';
import { locationAutoSuggest } from "./utils/auto-suggest-location.utils";
import { getAllEvents, searchByText } from './utils/eventsList.utils';

const divApp = document.querySelector("#app");

const mainElement = document.createElement("main");

divApp.innerHTML = '';

divApp.appendChild(NavbarTemplate())

divApp.appendChild(mainElement);

divApp.innerHTML += Footer();

router();

signUpModal();

loginModal();

toggleMenu();

locationAutoSuggest();

getAllEvents();

searchByText();



