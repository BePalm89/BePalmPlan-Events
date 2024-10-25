import "./Spinner.css";

export const Spinner = (isLoading = false) => {
  const existingSpinner = document.querySelector(".spinner-container");

  if (isLoading) {
    if (!existingSpinner) {
      const spinnerContainer = document.createElement("div");
      spinnerContainer.classList.add("spinner-container");

      spinnerContainer.innerHTML = `
        <div id="spinner"></div>
      `;

      document.body.appendChild(spinnerContainer);
    }
    return;
  }

  if (existingSpinner) {
    existingSpinner.remove();
  }
};
