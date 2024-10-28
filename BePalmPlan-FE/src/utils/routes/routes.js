import { Home } from "../../pages/Home/Home";
import { Events } from "../../pages/Events/Events";
import { MyEvents } from "../../pages/MyEvents/MyEvents";
import { EventDetails } from "../../pages/EventDetails/EventDetails";
import { NotFound } from "../../pages/NoFound/NotFound";

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

export const router = () => {
  const path = window.location.pathname;

  const exactRoute = routes.find((route) => route.path === path);

  if (exactRoute) {
    exactRoute.page();
    return;
  }

  const dynamicRoute = routes.find((route) =>
    route.path.startsWith("/events/:")
  );

  if (dynamicRoute) {
    const pathParts = path.split("/");
    const routeParts = dynamicRoute.path.split("/");

    if (
      pathParts.length === routeParts.length &&
      routeParts[1] === "events" &&
      routeParts[2].startsWith(":")
    ) {
      const eventId = pathParts[2];
      EventDetails(eventId);
      return;
    }
  }

  NotFound();
};
