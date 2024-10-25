import { Header } from "../../components/Header/Header";
import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";
import { isFormValid } from "./formValidation";
import { navigate } from "./navigate";
import { Events } from "../../pages/Events/Events";
import { Banner } from "../../components/Banner/Banner";

export const handleRegistration = async (e) => {
  e.preventDefault();

  const [username, email, password, profilePicture] = e.target;

  const validationRules = {
    username: { required: true },
    email: { required: true, email: true },
    password: { required: true, minLength: 8 },
  };

  const isValid = isFormValid({ username, email, password }, validationRules);

  if (!isValid) return;

  const formData = new FormData();

  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("password", password.value);
  formData.append("profileImg", profilePicture.files[0]);

  const { status, data } = await makeRequest({
    endpoint: API_ENDPOINT.REGISTER_USER,
    method: "POST",
    body: formData,
    isJSON: false,
  });

  if (status === 201) {
    Banner(`User ${username.value} successfully registered`, "success");

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
  }
};
