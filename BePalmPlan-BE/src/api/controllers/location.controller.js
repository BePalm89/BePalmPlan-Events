import Location from "../models/Location.model.js";

export const searchLocation = async (req, res, next) => {
  try {

    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const filter = { city: new RegExp(city, 'i')};

    const filteredLocations = await Location.find(filter);

    res.status(200).json(filteredLocations);

  } catch (err) {
    return next(err);
  }
};
