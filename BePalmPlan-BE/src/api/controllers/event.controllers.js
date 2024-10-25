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

    const event = await Event.findById(id).populate("createBy");

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
    const { query, location, category, date } = req.query;

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
    }

    const filteredEvents = await Event.find(searchCriteria).sort({
      date: 1,
    });

    return res.status(200).json(filteredEvents);
  } catch (error) {
    return next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const loggedUserId = req.user._id;

    const oldEvent = await Event.findById(id);

    if (oldEvent.createBy.toString() !== loggedUserId.toString()) {
      return res
        .status(403)
        .json(
          "Unauthorized action: You cannot modify an event in behalf of someone else"
        );
    }

    if (oldEvent.imgEvent && req.file) {
      deleteFile(oldEvent.imgEvent);
    }

    const modifiedEvent = new Event(req.body);

    modifiedEvent._id = id;

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

    const loggedUserId = req.user._id;

    const oldEvent = await Event.findById(id);

    if (!oldEvent) {
      return res.status(404).json("Event not found!");
    }

    if (oldEvent.createBy.toString() !== loggedUserId.toString()) {
      return res
        .status(403)
        .json(
          "Unauthorized action: You cannot delete an event in behalf of someone else"
        );
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
    deleteFile(deletedEvent.imgEvent);

    return res.status(200).json("Event deleted successfully");
  } catch (error) {
    return next(error);
  }
};
