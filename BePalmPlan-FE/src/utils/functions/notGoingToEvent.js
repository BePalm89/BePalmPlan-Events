import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";
import { navigate } from "./navigate";
import { Events } from "../../pages/Events/Events";
import { Banner } from "../../components/Banner/Banner";

export const notGoingToEvent = async (e, event) => {
  const userFromLocalStorage = localStorage.getItem("user");
  const user = JSON.parse(userFromLocalStorage);
  const token = localStorage.getItem("token");

  const { data, status } = await makeRequest({
    endpoint: `${API_ENDPOINT.REMOVE_ATTENDEES_TO_EVENT}/${event._id}`,
    method: "DELETE",
    body: {
      attendees: user._id,
    },
    token,
  });

  if (status === 200) {
    Banner(`You are not going anymore to ${data.title}`, "success");
    navigate(e, { path: "/events", page: Events });
  }
};
