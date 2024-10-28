import { Banner } from "../../components/Banner/Banner";
import { Events } from "../../pages/Events/Events";
import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";
import { navigate } from "./navigate";

export const deleteEvent = async (e) => {
  const path = window.location.pathname;
  const segments = path.split("/");
  const eventId = segments[segments.length - 1];

  const { status } = await makeRequest({
    endpoint: `${API_ENDPOINT.DELETE_EVENT}/${eventId}`,
    method: "DELETE",
    hasToken: true,
  });

  if (status === 200) {
    Banner("Event successfully delete!", "success");
    navigate(e, { path: "/events", page: Events });
  }
};
