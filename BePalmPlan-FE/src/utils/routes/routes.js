import { Home } from "../../pages/Home/Home";
import { Events } from "../../pages/Events/Events";
import { MyEvents } from "../../pages/MyEvents/MyEvents";
import { EventDetails } from "../../pages/EventDetails/EventDetails";

export const routes = [
  {
    path: "/",
    page: Home,
  },
  {
    path: "/events",
    page: Events,
  },
  {
    path: "/my-events",
    page: MyEvents,
  },
  {
    path: "/events/:id",
    page: EventDetails,
  },
];
