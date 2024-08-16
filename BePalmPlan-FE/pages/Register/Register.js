import "./Register.css";
import "../../styles/form.css";
import "../../styles/modal.css";
import "../../styles/utilities.css";

import { Button, ButtonLink } from "../../components/Button/Button";
import { Logo } from "../../components/Logo/Logo";
import { Input } from "../../components/Input/Input";
import { InputFile } from "../../components/InputFile/InputFile";

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
            ${Input("username", true)}
            ${Input("email", true, "email")}
            ${Input("password", true, "password")}
            ${InputFile("profile picture")}
        </div>
        ${Button("Sign up", "filled", true)}
        </form>
    </div>
    `;
};
