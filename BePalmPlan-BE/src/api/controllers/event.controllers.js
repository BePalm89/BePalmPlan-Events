import { deleteFile } from "../../utils/deleteFile.js";
import Event from "../models/Event.model.js";

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
    const { query, location, category } = req.query;

    let searchCriteria = {};

    if (query) {
      searchCriteria.title = { $regex: query, $options: "i" };
    }

    if (location) {
      searchCriteria.location = { $regex: location, $options: "i" };
    }

    if (category) {
      if (allowedCategories.includes(category)) {
        searchCriteria.category = category;
      } else {
        return res.status(400).json("Invalid category filter");
      }
    }

    const filteredEvents = await Event.find(searchCriteria);

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
