import { deleteFile } from "../../utils/deleteFile.js";
import Event from "../models/Event.model.js";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";
import isoWeek from "dayjs/plugin/isoWeek.js";

dayjs.extend(isoWeek);
dayjs.extend(isBetween);
export const getAllEvents = async (req, res, next) => {
  const today = new Date();

  try {
    const events = await Event.find({ date: { $gte: today } }).sort({
      date: 1,
    });
    res.status(200).json(events);
  } catch (error) {
    return next(error);
  }
};
export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate(["createBy", "attendees"]);

    if (!event) {
      return res.status(404).json("Events not found");
    }

    return res.status(200).json(event);
  } catch (error) {
    return next(error);
  }
};

export const createNewEvent = async (req, res, next) => {
  try {
    const loggedUserId = req.user._id;

    const { createBy } = req.body;

    if (!createBy) {
      return res.status(400).json("Bad Request: The request is malformed.");
    }

    if (loggedUserId.toString() !== createBy) {
      return res
        .status(403)
        .json(
          "Unauthorized action: You cannot create an event in behalf of someone else"
        );
    }
    const newEvent = new Event(req.body);

    if (req.file) {
      newEvent.imgEvent = req.file.path;
    }

    const event = await newEvent.save();

    return res.status(201).json(event);
  } catch (error) {
    return next(error);
  }
};

export const searchEvents = async (req, res, next) => {
  const allowedCategories = [
    "hobbies-passions",
    "art-culture",
    "health-wellbeing",
    "travel-outdoor",
    "sport-fitness",
    "social-activities",
    "technology",
  ];

  try {
    const { query, location, category, date, sort } = req.query;

    let searchCriteria = {};

    if (query) {
      searchCriteria.title = { $regex: query, $options: "i" };
    }

    if (location === "in-person") {
      searchCriteria.location = { $ne: "online" };
    } else if (location) {
      searchCriteria.location = { $regex: location, $options: "i" };
    }

    if (category) {
      if (allowedCategories.includes(category)) {
        searchCriteria.category = category;
      } else {
        return res.status(400).json("Invalid category filter");
      }
    } else {
      searchCriteria.category = { $in: allowedCategories };
    }

    const today = dayjs();
    const tomorrow = today.add(1, "day");
    const endOfThisWeek = today.endOf("isoWeek");
    const startOfNextWeek = endOfThisWeek.add(1, "day");
    const endOfNextWeek = startOfNextWeek.endOf("isoWeek");
    const endOfNextMonth = today.add(1, "month").endOf("month");

    if (date) {
      switch (date) {
        case "today":
          searchCriteria.date = {
            $gte: today.startOf("day").toDate(),
            $lte: today.endOf("day").toDate(),
          };
          break;
        case "tomorrow":
          searchCriteria.date = {
            $gte: tomorrow.startOf("day").toDate(),
            $lte: tomorrow.endOf("day").toDate(),
          };
          break;
        case "this-week":
          searchCriteria.date = {
            $gte: today.startOf("day").toDate(),
            $lte: endOfThisWeek.toDate(),
          };
          break;
        case "next-week":
          searchCriteria.date = {
            $gte: startOfNextWeek.toDate(),
            $lte: endOfNextWeek.toDate(),
          };
          break;
        case "next-month":
          searchCriteria.date = {
            $gte: today.startOf("day").toDate(),
            $lte: endOfNextMonth.toDate(),
          };
          break;
        default:
          searchCriteria.date = { $gte: today.startOf("day").toDate() };
          break;
      }
    } else {
      searchCriteria.date = { $gte: today.startOf("day").toDate() };
    }

    const filteredEvents = await Event.aggregate([
      { $match: searchCriteria },
      { $addFields: { attendeeCount: { $size: "$attendees" } } },
      { $sort: sort === "relevance" ? { attendeeCount: -1 } : { date: 1 } },
    ]);

    return res.status(200).json(filteredEvents);
  } catch (error) {
    return next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldEvent = await Event.findById(id);

    if (!oldEvent) {
      return res.status(404).json("Event not found!");
    }

    const modifiedEvent = new Event(req.body);

    modifiedEvent._id = id;

    if (oldEvent.imgEvent && req.file) {
      deleteFile(oldEvent.imgEvent);
    }

    if (req.file) {
      modifiedEvent.imgEvent = req.file.path;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, modifiedEvent, {
      new: true,
    });

    return res.status(200).json(updatedEvent);
  } catch (error) {
    return next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldEvent = await Event.findById(id);

    if (!oldEvent) {
      return res.status(404).json("Event not found!");
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
    deleteFile(deletedEvent.imgEvent);

    return res.status(200).json("Event deleted successfully");
  } catch (error) {
    return next(error);
  }
};

export const getAllAttendingEventsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const today = new Date();

    const events = await Event.find({ date: { $gte: today } });

    const attendingEvents = events
      .filter((event) => event.attendees.includes(userId))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return res.status(200).json(attendingEvents);
  } catch (error) {
    return next(error);
  }
};

export const getAllHostingEventsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const today = new Date();

    const hostingEvents = await Event.find({
      createBy: userId,
      date: { $gte: today },
    }).sort({
      date: 1,
    });

    return res.status(200).json(hostingEvents);
  } catch (error) {
    return next(error);
  }
};

export const addAttendee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.user._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json("Event not found");
    }

    if (event.attendees.includes(userId)) {
      return res.status(400).json("User is already attending this event");
    }

    event.attendees.push(userId);

    await event.save();

    return res.status(200).json(event);
  } catch (error) {
    return next(error);
  }
};

export const removeAttendee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.user._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json("Event not found");
    }

    if (!event.attendees.includes(userId)) {
      return res.status(400).json("User is not attending this event");
    }

    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== userId.toString()
    );

    await event.save();
    return res.status(200).json(event);
  } catch (error) {
    return next(error);
  }
};
