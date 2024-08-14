import './Footer.css';
import { FOOTER_LINKS } from './FooterData';

export const Footer = () => {
    return `
    <footer>
    <ul>
         ${FOOTER_LINKS.map((link) => {
        return `
            <li>
                <a href="${link.url}" target="_blank">
                    <img src="${link.icon}" alt="${link.socialNetwork}"/>
                </a>
            </li>
        `}).join("")}
    </ul>

    </footer>`
}