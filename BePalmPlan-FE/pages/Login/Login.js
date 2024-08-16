import "./Login.css";
import "../../styles/modal.css";
import "../../styles/utilities.css";

import { Logo } from "../../components/Logo/Logo";
import { Button, ButtonLink } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

export const LoginTemplate = () => {
  const modalContainer = document.createElement("div");
  
  modalContainer.classList.add("modal-overlay");
  modalContainer.id = "login-modal-overlay";

  modalContainer.innerHTML += loginModalTemplate();
  
  return modalContainer;
};


const loginModalTemplate = () => {
    Input
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
            ${Input("email", true, "email" )}
            ${Input("password", true, "password")}
            </div>
            ${Button("login", "filled", true)}
        </form>
    </div>`
}