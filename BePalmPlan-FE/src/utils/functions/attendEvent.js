import { Banner } from "../../components/Banner/Banner";
import { Events } from "../../pages/Events/Events";
import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";
import { navigate } from "./navigate";

export const attendEvent = async (e, event) => {
  const userFromLocalStorage = localStorage.getItem("user");
  const user = JSON.parse(userFromLocalStorage);
  const token = localStorage.getItem("token");

  const { data, status } = await makeRequest({
    endpoint: `${API_ENDPOINT.UPDATE_EVENT}/${event._id}`,
    method: "PUT",
    body: {
      attendees: [user._id],
    },
    token,
  });

  if (status === 200) {
    Banner(`You are going to ${data.title}`, "success");
    navigate(e, { path: "/events", page: Events });
  }
};
