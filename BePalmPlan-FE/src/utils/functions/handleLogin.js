import { Events } from "../../pages/Events/Events";
import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";
import { isFormValid } from "./formValidation";
import { navigate } from "./navigate";
import { Header } from "../../components/Header/Header";

export const handleLogin = async (e) => {
  e.preventDefault();

  const [email, password] = e.target;

  const validationRules = {
    email: { required: true, email: true },
    password: { required: true, minLength: 8 },
  };

  const isValid = isFormValid({ email, password }, validationRules);

  if (!isValid) return;

  const body = {
    email: email.value,
    password: password.value,
  };

  const { status, data } = await makeRequest({
    endpoint: API_ENDPOINT.LOGIN_USER,
    method: "POST",
    body,
  });

  if (status === 200) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate(e, { path: "/events", page: Events });
    Header();
  }
};
