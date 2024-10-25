import "./Logo.css";

export const Logo = ({ justLogo = true }) => {
  const div = document.createElement("div");
  div.classList.add("logo-container");

  div.innerHTML += `
              <img src="/icons/logo.png" alt="logo"/>
            ${justLogo ? "" : `<p class="logo-text">BE PALM PLAN</p>`}
  `;

  return div;
};
