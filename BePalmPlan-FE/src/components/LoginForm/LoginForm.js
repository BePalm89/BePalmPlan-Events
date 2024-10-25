import "./LoginForm.css";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import { handleErrors } from "../../utils/functions/handleErrors";

export const LoginForm = (form) => {
  form.innerHTML = "";
  form.className = "login-form";

  form.append(
    Input({
      labelText: "Email",
      id: "email",
      required: true,
      type: "email",
      inputAction: (e) => handleErrors(e, "email"),
    }),
    Input({
      labelText: "Password",
      id: "password",
      required: true,
      type: "password",
      inputAction: (e) => handleErrors(e, "password"),
    }),
    Button({ label: "Login", className: "filled", id: "login" })
  );
};
