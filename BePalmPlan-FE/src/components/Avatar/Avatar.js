import { Menu } from "../Menu/Menu";
import "./Avatar.css";

export const Avatar = (user, hasMenu = false) => {
  const { username, profileImg } = user;

  const avatarContainer = document.createElement("div");
  avatarContainer.classList.add("avatar-container");

  avatarContainer.innerHTML += `${
    profileImg ? `${imgAvatar(profileImg)}` : `${usernameAvatar(username)}`
  }
  `;

  if (hasMenu) {
    const menuBtn = document.createElement("div");
    menuBtn.classList.add("down-icon-container");

    const downIcon = document.createElement("img");
    downIcon.src = "/icons/down.png";
    downIcon.alt = "down-icon";
    downIcon.id = "down-btn";

    menuBtn.append(downIcon);
    avatarContainer.append(menuBtn);

    downIcon.addEventListener("click", () => {
      const menu = document.querySelector("#menu");
      menu.classList.toggle("show");
    });
  }

  return avatarContainer;
};

const imgAvatar = (profileImg) => {
  return `
      <div class="profile-pic-container">
          <img src="${profileImg}" />
      </div> `;
};

const usernameAvatar = (username) => {
  return `
      <div class="profile-pic-container">
          <p>${username.charAt(0).toUpperCase()}</p>
      </div>`;
};
