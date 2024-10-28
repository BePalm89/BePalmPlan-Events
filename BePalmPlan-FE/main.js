import "./style.css";

import { Header } from "./src/components/Header/Header";
import { Home } from "./src/pages/Home/Home";
import { Main } from "./src/components/Main/Main";
import { Footer } from "./src/components/Footer/Footer";
import { router } from "./src/utils/routes/routes";

Header();
Main();
Footer();

const token = localStorage.getItem("token");

if (token) {
  router();
} else {
  Home();
}
