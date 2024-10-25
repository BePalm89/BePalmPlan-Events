import { Banner } from "../../components/Banner/Banner";
import { Spinner } from "../../components/Spinner/Spinner";

const BASE_URL = "http://localhost:3000/api/v1";

export const makeRequest = async ({
  endpoint,
  method = "GET",
  body,
  isJSON = true,
  token = null,
  showSpinner = true,
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (isJSON) {
    headers["Content-Type"] = "application/json";
  }

  if (showSpinner) {
    Spinner(true);
  }

  try {
    const res = await fetch(BASE_URL + endpoint, {
      method,
      headers,
      body: isJSON ? JSON.stringify(body) : body,
    });

    const data = await res.json();

    if (
      res.status === 401 ||
      res.status === 500 ||
      res.status === 409 ||
      res.status === 403 ||
      res.status === 400
    ) {
      Banner(data, "error");
    }

    return { status: res.status, data };
  } catch (error) {
    console.error("Error", error);
  } finally {
    if (showSpinner) {
      Spinner(false);
    }
  }
};