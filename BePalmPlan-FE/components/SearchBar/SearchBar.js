import "./SearchBar.css";
import "../../styles/form.css";

export const SearchBar = () => {
  return `
    <div class="search-bar-container">
        <div class="search-input search-input-events">
            <img src="/icons/loupe.png" alt="search-icon" class="search-icon"/>
            <input type="text" placeholder="Search for events"/>
        </div>
        <div class="search-input location-input-events">
            <input type="text" placeholder="Select a location" id="locations"/>
            <div class="suggestions-container">
                <ul class="suggestions-list"></ul>
            </div>
        </div>
        <div class="search-icon-container">
            <img src="/icons/loupe-white.png" alt="search-icon" class="color-icon"/>
        </div>
    </div>`;
};
