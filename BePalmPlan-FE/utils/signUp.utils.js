import { Banner } from "../components/Banner/Banner";
import { RegisterTemplate } from "../pages/Register/Register";
import {
  addErrorToInput,
  closeModal,
  handleEmailInput,
  removeErrorToInput,
  handlePasswordInput,
  isFormValid,
  selectFile,
} from "./form.utils";
import { login, makeRequest } from "./fetch.utils";
import { LoginTemplate } from "../pages/Login/Login";
import { setupEventListeners as setupEventListenersLogin } from "./login.utils";
import { API_ENDPOINTS } from "./url.enum";

export const signUpModal = () => {
  const btn = document.querySelector("#sign-up");
  if(btn) btn.addEventListener("click", openSignUpModal);
};

const openSignUpModal = () => {
  const mainElement = document.querySelector("main");

  mainElement.appendChild(RegisterTemplate());

  setupFormEventListeners(mainElement);
};

export const setupFormEventListeners = (mainElement) => {
  const registerForm = document.querySelector("form#form-register");

  const redirectToLoginLink = document.querySelector("#login-link");

  const inputs = {
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    profileImg: document.querySelector("#profile-picture"),
  };

  selectFile("form-register", "profile-picture");

  closeModal(mainElement);

  inputs.username.addEventListener("input", (event) =>
    handleUsernameInput(event, inputs.username)
  );

  inputs.email.addEventListener("input", () => handleEmailInput(inputs.email));

  inputs.password.addEventListener("input", () =>
    handlePasswordInput(inputs.password)
  );

  registerForm.addEventListener("submit", (event) =>
    handleRegister(event, inputs, mainElement)
  );

  redirectToLoginLink.addEventListener("click", () =>
    handleRedirectionToLogin(mainElement)
  );
};
const handleRegister = async (event, inputs, mainElement) => {
  event.preventDefault();

  const { username, email, password, profileImg } = inputs;

  const validationRules = {
    username: { required: true },
    email: { required: true, email: true },
    password: { required: true },
  };

  const isValid = isFormValid(inputs, validationRules);

  if (!isValid) return;

  const formData = new FormData();

  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("password", password.value);
  formData.append("profileImg", profileImg.files[0]);

  try {
    const { status, data } = await makeRequest(
      API_ENDPOINTS.REGISTER_USER,
      "POST",
      formData
    );

    handleRegisterResponse(status, data, inputs, mainElement);
  } catch (error) {
    console.log(error);
  }
};

const handleRegisterResponse = async (status, data, inputs, mainElement) => {
  if (status === 201) {
    mainElement.appendChild(
      Banner(`User ${inputs.username.value} successfully registered`, "SUCCESS")
    );
    const banner = document.querySelector(".banner.error");

    if (banner) {
      banner.style.display = "none";
      mainElement.removeChild(banner);
    }

    await login(inputs.email.value, inputs.password.value, mainElement);
  } else if (status === 409) {
    mainElement.appendChild(Banner(data, "ERROR"));
  } else {
    mainElement.appendChild(Banner("Sorry! An error occurs", "ERROR"));
  }
};

const handleUsernameInput = (event, usernameInput) => {
  const usernameValue = event.target.value;

  if (!usernameValue) {
    addErrorToInput("username", usernameInput);
  } else {
    removeErrorToInput("username", usernameInput);
  }
};

const handleRedirectionToLogin = (mainElement) => {
  const registerModal = document.querySelector("#register-modal-overlay");
  const errorBanner = document.querySelector(".banner.error");

  registerModal.style.display = "none";
  mainElement.removeChild(registerModal);

  if (errorBanner) {
    errorBanner.style.display = "none";
    mainElement.removeChild(errorBanner);
  }

  mainElement.appendChild(LoginTemplate());

  setupEventListenersLogin(mainElement);
};
