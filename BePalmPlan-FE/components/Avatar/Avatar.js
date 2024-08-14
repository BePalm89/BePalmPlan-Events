import { Menu } from '../Menu/Menu';
import './Avatar.css';

export const Avatar = (user) => {
    const { username, profileImg } = user;
    
    return `${
      profileImg
        ? `<div class="avatar-container">${imgAvatar(profileImg)}</div>`
        : `<div class="avatar-container">${usernameAvatar(username)}</div>`
    }
        ${Menu()}`;
  };
  
  const imgAvatar = (profileImg) => {
    return `
      <div class="profile-pic-container">
          <img src="${profileImg}" />
      </div>
      <div class="down-icon-container">
          <img  src="/icons/down.png" alt="down-icon" id="down-btn"/>
      </div> `;
  };
  
  const usernameAvatar = (username) => {
    return `
      <div class="profile-pic-container">
          <p>${username.charAt(0).toUpperCase()}</p>
      </div>
       <div class="down-icon-container">
          <img  src="/icons/down.png" alt="down-icon" id="down-btn"/>
      </div>`;
  };