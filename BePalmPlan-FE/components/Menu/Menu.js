import "./Menu.css";
import { MENU_ITEMS } from "./MenuData";
import { toTitleCase } from "../../utils/format.utils";

export const Menu = () => {
  return `
    <div id="menu">
        <ul>
        ${MENU_ITEMS.map((item) => {
          const formattedLabel = toTitleCase(item.label);
          return `<li class="${item.value.toLowerCase()}">${formattedLabel}</li>`;
        }).join("")}
        </ul>
    </div>`;
};
