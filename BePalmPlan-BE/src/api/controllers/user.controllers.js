import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jtw.js";

export const register = async (req, res, next) => {
  try {
    const duplicatedUser = await User.findOne({ email: req.body.email });

    if (duplicatedUser) {
      return res.status(409).json("The user already exists");
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (req.file) {
      newUser.profileImg = req.file.path;
    }

    const user = await newUser.save();

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json("the email or password incorrect");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id);
      return res.status(200).json({ token, user });
    }

    return res.status(401).json("the email or password incorrect");
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate([
      "favoriteEvents",
      "attendEvents",
    ]);

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const addFavoriteEvents = async (req, res, next) => {
  try {
    const { id } = req.params;

    const loggedUserId = req.user._id;

    const { favoriteEvents } = req.body;

    if (loggedUserId.toString() !== id) {
      return res
        .status(403)
        .json("Unauthorized action: You cannot modify someone else's data");
    }

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return res.status(404).json("User not found");
    }

    const eventAlreadyInFavorites = currentUser.favoriteEvents.some((eventId) =>
      favoriteEvents.includes(eventId.toString())
    );

    if (eventAlreadyInFavorites) {
      return res.status(400).json("Event already in favorite");
    }

    const newUser = new User(req.body);

    newUser._id = id;
    newUser.favoriteEvents = [
      ...currentUser.favoriteEvents,
      ...newUser.favoriteEvents,
    ];

    newUser.attendEvents = [
      ...currentUser.attendEvents,
    ]

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

export const removeFavoriteEvents = async (req, res, next) => {
  try {
    const { id } = req.params;

    const loggedUserId = req.user._id;

    const { favoriteEvents } = req.body;

    if (loggedUserId.toString() !== id) {
      return res
        .status(403)
        .json("Unauthorized action: You cannot modify someone else's data");
    }

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return res.status(404).json("User not found");
    }

    const eventIndex = currentUser.favoriteEvents.findIndex(
      (eventId) => eventId.toString() === favoriteEvents[0]
    );

    if (eventIndex === -1) {
      return res.status(404).json("Event not found in favorites");
    }

    currentUser.favoriteEvents.splice(eventIndex, 1);

    const newUser = new User(req.body);

    newUser._id = id;
    newUser.favoriteEvents = [...currentUser.favoriteEvents];
    newUser.attendEvents = [...currentUser.attendEvents];

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

export const addAttendEvents = async (req, res, next) => {
  try {
    const { id } = req.params;

    const loggedUserId = req.user._id;

    const { attendEvents } = req.body;

    if (loggedUserId.toString() !== id) {
      return res
        .status(403)
        .json("Unauthorized action: You cannot modify someone else's data");
    }

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return res.status(404).json("User not found");
    }

    const eventAlreadyToAttend = currentUser.attendEvents.some((eventId) =>
      attendEvents.includes(eventId.toString())
    );

    if (eventAlreadyToAttend) {
      return res.status(400).json("Event already in attend list");
    }

    const newUser = new User(req.body);

    newUser._id = id;
    newUser.attendEvents = [
      ...currentUser.attendEvents,
      ...newUser.attendEvents,
    ];

    newUser.favoriteEvents = [
      ...currentUser.favoriteEvents,
    ]

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

export const removeAttendEvents = async (req, res, next) => {
  try {
    const { id } = req.params;

    const loggedUserId = req.user._id;

    const { attendEvents } = req.body;

    if (loggedUserId.toString() !== id) {
      return res
        .status(403)
        .json("Unauthorized action: You cannot modify someone else's data");
    }

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return res.status(404).json("User not found");
    }

    const eventIndex = currentUser.attendEvents.findIndex(
      (eventId) => eventId.toString() === attendEvents[0]
    );

    if (eventIndex === -1) {
      return res.status(404).json("Event not found in favorites");
    }

    currentUser.attendEvents.splice(eventIndex, 1);

    const newUser = new User(req.body);

    newUser._id = id;
    newUser.favoriteEvents = [...currentUser.favoriteEvents];
    newUser.attendEvents = [...currentUser.attendEvents];

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
