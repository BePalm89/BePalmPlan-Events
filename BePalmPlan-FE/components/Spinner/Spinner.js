import "./Spinner.css";

export const Spinner = () => {
  const spinnerContainer = document.createElement("div");
  spinnerContainer.classList.add("spinner-container");

  spinnerContainer.innerHTML = `
      <div id="spinner"></div>
    `;

  return spinnerContainer;
};
