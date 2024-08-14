import { NavbarTemplate } from "../components/Navbar/Navbar";
import { EventDetails } from "../pages/EventDetails/EventDetails";
import { EventsList } from "../pages/EventsList/EventsList";
import { Landing } from "../pages/Landing/Landing";
import { MyEvents } from "../pages/MyEvents/MyEvents";
import { locationAutoSuggest } from "../utils/auto-suggest-location.utils";
import { loginModal } from "../utils/login.utils";
import { signUpModal } from "../utils/signUp.utils";

const ROUTES = [
    {
        path: "/",
        component: Landing
    },
    {
        path: "/events",
        component: EventsList
    },
    {
        path: "/^\/events\/(\d+)$/",
        component: EventDetails
    },
    {
        path: "/my-events",
        component: MyEvents
    }
];

export const router = () => {
    
    const path = window.location.pathname;

    const { component } = ROUTES.find(route => route.path === path) || {};

    if(component) {
        document.querySelector("main").innerHTML = component();
    }
};

export const navigateTo = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    router();
}

export const handleNavbarWhenNavigate = () => {
    const headerElement = document.querySelector("header");
    const divApp = document.querySelector("#app");

    divApp.removeChild(headerElement);

    divApp.insertBefore(NavbarTemplate(), divApp.firstChild);

    loginModal();

    signUpModal();

    locationAutoSuggest();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", router);

