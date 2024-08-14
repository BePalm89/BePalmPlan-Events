import './Banner.css';

export const Banner = (text, severity) => {
    const bannerContainer = document.createElement("div");
    bannerContainer.classList.add("banner", severity.toLowerCase());

    bannerContainer.innerHTML += bannerTemplate(text, severity);

    return bannerContainer
}
const bannerTemplate = (text, severity) => {
   return  `<p>${text}</p>`
}