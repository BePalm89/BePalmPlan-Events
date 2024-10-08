import { Spinner } from "../components/Spinner/Spinner";
import { LoginTemplate } from "../pages/Login/Login";
import { RegisterTemplate } from "../pages/Register/Register";
import { login } from "./fetch.utils";
import {
  closeModal,
  handleEmailInput,
  handlePasswordInput,
  isFormValid,
} from "./form.utils";
import { setupFormEventListeners as setupFormEventListenersRegister } from "./signUp.utils";

export const loginModal = () => {
  const btn = document.querySelector("#login");
  if(btn) btn.addEventListener("click", openLoginModal);
};

const openLoginModal = () => {
  const mainElement = document.querySelector("main");

  mainElement.appendChild(LoginTemplate());

  setupEventListeners(mainElement);
};

export const setupEventListeners = (mainElement) => {
  const loginForm = document.querySelector("form#form-login");
  const redirectToRegisterLink = document.querySelector("#sign-up-link");

  const inputs = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
  };

  closeModal(mainElement);

  inputs.email.addEventListener("input", () => {
    handleEmailInput(inputs.email);
  });

  inputs.password.addEventListener("input", () => {
    handlePasswordInput(inputs.password);
  });

  loginForm.addEventListener("submit", (event) => {
    handleLogin(event, inputs, mainElement);
  });

  redirectToRegisterLink.addEventListener("click", () =>
    handleRedirectionToSignUp(mainElement)
  );
};

const handleLogin = async (event, inputs, mainElement) => {
  event.preventDefault();

  const validationRules = {
    email: { required: true, email: true },
    password: { required: true },
  };

  const isValid = isFormValid(inputs, validationRules);

  if (!isValid) return;

  const spinner = Spinner();
  mainElement.appendChild(spinner);

  const email = inputs.email.value;
  const password = inputs.password.value;

  try {
    await login(email, password, mainElement);
  } catch (error) {
    console.log(error);
  } finally {
    if(spinner) {
      spinner.remove();
    }
  }
};

const handleRedirectionToSignUp = (mainElement) => {
  const loginModal = document.querySelector("#login-modal-overlay");
  const errorBanner = document.querySelector(".banner.error");

  loginModal.style.display = "none";
  mainElement.removeChild(loginModal);

  if (errorBanner) {
    errorBanner.style.display = "none";
    mainElement.removeChild(errorBanner);
  }

  mainElement.appendChild(RegisterTemplate());

  setupFormEventListenersRegister(mainElement);

};
