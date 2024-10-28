import { Banner } from "../../components/Banner/Banner";
import { Events } from "../../pages/Events/Events";
import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";
import { navigate } from "./navigate";

export const attendEvent = async (e, event) => {
  const userFromLocalStorage = localStorage.getItem("user");
  const user = JSON.parse(userFromLocalStorage);

  const { data, status } = await makeRequest({
    endpoint: `${API_ENDPOINT.ADD_ATTENDEES_TO_EVENT}/${event._id}`,
    method: "POST",
    body: {
      attendees: user._id,
    },
    hasToken: true,
  });

  if (status === 200) {
    Banner(`You are going to ${data.title}`, "success");
    navigate(e, { path: "/events", page: Events });
  }
};
