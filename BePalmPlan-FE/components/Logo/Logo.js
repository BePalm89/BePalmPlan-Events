import "./Logo.css";

export const Logo = (full = false) => {
  return `
    ${
      full
        ? `
        <div class="logo-container">
            <img src="/icons/logo.png" alt="logo"/>
            <p class="logo-text">BE PALM PLAN</p>
        </div>`
        : `
        <div>
            <img src="/icons/logo.png" alt="logo"/>
        </div>`
    }`;
};
