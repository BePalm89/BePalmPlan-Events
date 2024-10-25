import "./Banner.css";

export const Banner = (text, severity) => {
  const bannerContainer = document.createElement("div");
  bannerContainer.classList.add("banner", severity.toLowerCase());

  const bannerText = document.createElement("p");
  bannerText.textContent = text;

  const closeBannerBtn = document.createElement("img");
  closeBannerBtn.src = "/icons/close.png";
  closeBannerBtn.alt = "close-icon";
  closeBannerBtn.id = "banner-close-btn";

  bannerContainer.append(bannerText);
  bannerContainer.append(closeBannerBtn);

  closeBannerBtn.addEventListener("click", () => {
    if (bannerContainer) {
      bannerContainer.remove();
    }
  });

  document.body.appendChild(bannerContainer);

  if (bannerContainer) {
    setTimeout(() => {
      bannerContainer.remove();
    }, 5000);
  }
};
