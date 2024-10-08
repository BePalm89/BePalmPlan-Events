import { Banner } from "../components/Banner/Banner";
import { Spinner } from "../components/Spinner/Spinner";
import { handleNavbarWhenNavigate, navigateTo } from "../router/router";
import { getAllEvents } from "./eventsList.utils";
import { toggleMenu } from "./menu.utils";
import { API_ENDPOINTS } from "./url.enum";

export const makeRequest = async (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  const options = {
    method,
    body,
    headers,
  };

  try {
    const res = await fetch(url, options);

    const data = await res.json();

    return { status: res.status, data };
  } catch (error) {
    console.log(error);
  } 
};

export const login = async (email, password, mainElement) => {

  try {
    const payload = JSON.stringify({
      email,
      password,
    });
    
    const headers = { "Content-Type": "application/json" };

    const { status, data } = await makeRequest(
      API_ENDPOINTS.LOGIN_USER,
      "POST",
      payload,
      headers
    );

    if (status === 200) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigateTo("/events");

      handleNavbarWhenNavigate();

      toggleMenu();

      getAllEvents();

    } else if (status === 401) {
      mainElement.appendChild(Banner(data, "ERROR"));
    }

  } catch (error) {
    console.log(error);
  }
}
