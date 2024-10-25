import { Header } from "../../components/Header/Header";
import { Home } from "../../pages/Home/Home";
import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";
import { navigate } from "./navigate";

export const handleLogout = (e) => {
  const token = localStorage.getItem("token");

  makeRequest({
    endpoint: API_ENDPOINT.LOGOUT_USER,
    method: "POST",
    token: token,
    showSpinner: false,
  });

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate(e, { path: "/", page: Home });
  Header();
};
