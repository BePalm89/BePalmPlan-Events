import "./Register.css";
import "../../styles/form.css";
import "../../styles/modal.css";
import "../../styles/utilities.css";

import { Button, ButtonLink } from "../../components/Button/Button";
import { Logo } from "../../components/Logo/Logo";

export const RegisterTemplate = () => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-overlay");
  modalContainer.id = "register-modal-overlay";

  modalContainer.innerHTML += registerModalTemplate();

  return modalContainer;
};

const registerModalTemplate = () => {
  return `
    <div class="modal-content">
        <div class="close-icon-container">
            <img  src="/icons/close.png" alt="close-icon" id="close-btn"/>
        </div>
        ${Logo()}
        <h2>Sign up</h2>
        <p class="m-b-s">Already a member? ${ButtonLink('login')}</p>
        <form id="form-register" novalidate>
        <div class="m-b-m register-form">
            <div class="form-item">
                <label for="username">Username: *</label>
                <input id="username" type="text">
                <span class="error-message" id="username-error"></span>
            </div>
            <div class="form-item">
                <label for="email">Email: *</label>
                <input id="email" type="text">
                <span class="error-message" id="email-error"></span>
            </div>
            <div class="form-item">
                <label for="password">Password: *</label>
                <input id="password" type="password">
                <span class="error-message" id="password-error"></span>
            </div>
            <div class="form-item">
                <label for="profile-pic">Profile picture:</label>
                <input id="profile-pic" type="file" style="display: none;">
                <div>
                    <label for="profile-pic" class="custom-file-upload">Choose File</label>
                    <span id="file-chosen">No file chosen</span>
                </div>
            </div> 
        </div>
        ${Button("Sign up", "filled", true)}
        </form>
    </div>
    `;
};
