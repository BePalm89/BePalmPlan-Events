import "./NoResults.css";

export const NoResults = ({ text }) => {
  const div = document.createElement("div");
  div.classList.add("no-results");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("no-results-img-container");

  div.append(imgContainer);

  const img = document.createElement("img");
  img.src = "/images/sad.png";
  img.alt = "sad inside out";

  imgContainer.append(img);

  const textInfo = document.createElement("h2");
  textInfo.textContent = text;

  imgContainer.append(textInfo);

  return div;
};
