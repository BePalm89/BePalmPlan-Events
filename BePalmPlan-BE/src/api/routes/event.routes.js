import express from "express";
import {
  getAllEvents,
  createNewEvent,
  getEventById,
  searchEvents,
  updateEvent,
  deleteEvent,
  getAllAttendingEventsByUser,
  getAllHostingEventsByUser,
  addAttendee,
  removeAttendee,
} from "../controllers/event.controllers.js";
import { isAuth } from "../../middleware/auth.js";
import { upload } from "../../middleware/file.js";

const router = express.Router();

/* route events */
/*
 1.  get all events with Auth - 
 2.  get event by id with Auth
 3.  create a new event with is Auth
 4.  update event with isAuth and just the user logged in that had create the event can modify it
 5.  delete event with isAuth adn just the user logged in that had create the event can modify it
 6.  search event by query params with auth
 7.  get attending events by user id
 8.  get hosting events by user id
 9.  Add a new attendee in a particular event
 10. Remove an attendee for a particular event
*/

router.get("/", isAuth, getAllEvents);
router.get("/search", isAuth, searchEvents);
router.get("/:id", isAuth, getEventById);
router.post("/create", [isAuth, upload.single("imgEvent")], createNewEvent);
router.put("/:id", [isAuth, upload.single("imgEvent")], updateEvent);
router.delete("/:id", isAuth, deleteEvent);
router.get("/attending/:userId", isAuth, getAllAttendingEventsByUser);
router.get("/hosting/:userId", isAuth, getAllHostingEventsByUser);
router.post("/add-attendees/:id", isAuth, addAttendee);
router.delete("/remove-attendees/:id", isAuth, removeAttendee);

export default router;
