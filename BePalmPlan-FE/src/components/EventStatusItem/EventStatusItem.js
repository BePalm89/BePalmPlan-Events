import "./EventStatusItem.css";

export const EventStatusItem = ({ status, fnc }) => {
  const li = document.createElement("li");
  li.classList.add("status-item");
  li.textContent = status;

  li.addEventListener("click", fnc);

  return li;
};
