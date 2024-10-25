import { handleErrors } from "../../utils/functions/handleErrors";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./RegisterForm.css";

export const RegisterForm = (form) => {
  form.innerHTML = "";
  form.className = "register-form";

  form.append(
    Input({
      labelText: "username",
      id: "username",
      required: true,
      inputAction: (e) => handleErrors(e, "text"),
    }),
    Input({
      labelText: "email",
      id: "email",
      required: true,
      type: "email",
      inputAction: (e) => handleErrors(e, "email"),
    }),
    Input({
      labelText: "password",
      id: "password",
      required: true,
      type: "password",
      inputAction: (e) => handleErrors(e, "password"),
    }),
    Input({
      labelText: "profile picture",
      id: "profile-picture",
      required: false,
      type: "file",
    }),
    Button({ label: "Sign up", className: "filled", id: "sign-up" })
  );
};
