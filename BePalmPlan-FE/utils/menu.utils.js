import { handleNavbarWhenNavigate, navigateTo } from "../router/router";
import { makeRequest } from "./fetch.utils";
import { API_ENDPOINTS } from "./url.enum";

export const toggleMenu = () => {
  const btn = document.querySelector("#down-btn");
  if (btn) btn.addEventListener("click", () => handleMenu());
};

const handleMenu = () => {
  const menu = document.querySelector("#menu");
  menu.classList.toggle("show");

  const logoutBtn = document.querySelector(".logout");
  logoutBtn.addEventListener("click", () => handleLogout());

  const myEventsBtn = document.querySelector(".my-events");
  myEventsBtn.addEventListener("click", redirectToMyEventsPage)
};

const handleLogout = () => {
    
    const headers = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
    
    makeRequest(API_ENDPOINTS.LOGOUT_USER, "POST", null, headers);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigateTo("/");

    handleNavbarWhenNavigate();
}

const redirectToMyEventsPage = () => {
  navigateTo("/my-events");
}
