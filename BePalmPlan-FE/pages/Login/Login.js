import "./Login.css";
import "../../styles/modal.css";
import "../../styles/utilities.css";

import { Logo } from "../../components/Logo/Logo";
import { Button, ButtonLink } from "../../components/Button/Button";
import { setupEventListeners } from "../../utils/login.utils";

export const LoginTemplate = () => {
  const modalContainer = document.createElement("div");
  
  modalContainer.classList.add("modal-overlay");
  modalContainer.id = "login-modal-overlay";

  modalContainer.innerHTML += loginModalTemplate();
  
  return modalContainer;
};


const loginModalTemplate = () => {
    return `
    <div class="modal-content">
        <div class="close-icon-container">
            <img  src="/icons/close.png" alt="close-icon" id="close-btn"/>
        </div>
        ${Logo()}
        <h2>Login in</h2>
        <p class="m-b-s">Not a member? ${ButtonLink('sign up')}</p>
        <form id="form-login" novalidate>
            <div class="m-b-m login-form">
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
            </div>
            ${Button("login", "filled", true)}
        </form>
    </div>`
}