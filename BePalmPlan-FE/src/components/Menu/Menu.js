import "./Menu.css";

import { MENU_ITEMS } from "./MenuData";

import { navigate } from "../../utils/functions/navigate";

import { MyEvents } from "../../pages/MyEvents/MyEvents";
import { handleLogout } from "../../utils/functions/handleLogout";

export const Menu = () => {
  const menu = document.createElement("div");
  menu.id = "menu";

  const ul = document.createElement("ul");
  menu.append(ul);

  for (const item of MENU_ITEMS) {
    const li = document.createElement("li");
    li.textContent = item.label;
    li.addEventListener("click", (e) => {
      if (item.label === "logout") {
        handleLogout(e);
      } else if (item.label === "my events") {
        navigate(e, { path: "/my-events", page: MyEvents });
      }
      menu.classList.remove("show");
    });

    ul.append(li);
  }

  return menu;
};
