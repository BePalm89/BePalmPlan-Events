import "./style.css";

import { Header } from "./src/components/Header/Header";
import { Home } from "./src/pages/Home/Home";
import { Main } from "./src/components/Main/Main";
import { Footer } from "./src/components/Footer/Footer";
import { Events } from "./src/pages/Events/Events";

Header();
Main();

const token = localStorage.getItem("token");

if (token) {
  Events(); // handle routes correctly
} else {
  Home();
}

Footer();
