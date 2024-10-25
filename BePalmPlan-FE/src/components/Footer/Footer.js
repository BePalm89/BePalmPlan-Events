import "./Footer.css";
import { FOOTER_LINKS } from "./FooterData";

export const Footer = () => {
  const appDiv = document.querySelector("#app");

  const footer = document.createElement("footer");

  footer.innerHTML += `
    <ul>
         ${FOOTER_LINKS.map((link) => {
           return `
            <li>
                <a href="${link.url}" target="_blank">
                    <img src="${link.icon}" alt="${link.socialNetwork}"/>
                </a>
            </li>
        `;
         }).join("")}
    </ul>
    `;

  appDiv.append(footer);
};
