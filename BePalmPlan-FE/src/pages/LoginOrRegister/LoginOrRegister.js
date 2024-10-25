import "./LoginOrRegister.css";
import "../../styles/utilities.css";

import { handleLogin } from "../../utils/functions/handleLogin";
import { createCloseButton } from "../../utils/functions/createCloseButtonModal";

import { Link } from "../../components/Link/Link";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Logo } from "../../components/Logo/Logo";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { handleRegistration } from "../../utils/functions/handleRegistration";

let showLogin = true;
export const LoginOrRegister = (btn) => {
  let fromLoginBtn = true;
  btn === "login" ? (fromLoginBtn = true) : (fromLoginBtn = false);

  showLogin = fromLoginBtn;
  const div = document.createElement("div");

  div.classList.add("modal-content");
  div.id = btn;

  // Close btn
  div.append(createCloseButton());

  // Logo
  div.append(Logo({ justLogo: true }));

  // Title
  const titleElement = createTitle(fromLoginBtn);

  div.append(titleElement);

  // Description and action to go to register

  const text = document.createElement("p");
  text.classList.add("m-b-s");

  const staticText = document.createElement("span");
  staticText.textContent = fromLoginBtn
    ? "Not a member? "
    : "Already a member?";

  // Form
  const form = document.createElement("form");
  form.noValidate = true;

  const linkElement = Link({
    label: fromLoginBtn ? "sign up" : "Login",
    className: "primary",
    fcn: () => switchLoginRegister(titleElement, staticText, linkElement, form),
  });

  text.append(staticText);
  text.append(linkElement);

  // Append
  div.append(text);
  div.append(form);

  form.addEventListener("submit", showLogin ? handleLogin : handleRegistration);

  fromLoginBtn ? LoginForm(form) : RegisterForm(form);

  return div;
};

const switchLoginRegister = (
  titleElement,
  staticTextElement,
  linkElement,
  form
) => {
  showLogin = !showLogin;
  titleElement.textContent = showLogin ? "Login" : "Sign up";
  staticTextElement.textContent = showLogin
    ? "Not a member?"
    : "Already a member?";

  linkElement.textContent = showLogin ? "Sign up" : "Login";

  showLogin ? LoginForm(form) : RegisterForm(form);
  if (showLogin) {
    form.removeEventListener("submit", handleRegistration);
  } else {
    form.removeEventListener("submit", handleLogin);
  }
  form.addEventListener("submit", showLogin ? handleLogin : handleRegistration);
};

const createTitle = (fromLoginBtn) => {
  const title = document.createElement("h2");
  title.textContent = fromLoginBtn ? "Login in" : "Sign up";

  return title;
};
