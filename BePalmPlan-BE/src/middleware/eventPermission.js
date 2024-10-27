import Event from "../api/models/Event.model.js";
export const checkEventCreator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const loggedUserId = req.user._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json("Event not found");
    }

    if (event.createBy.toString() !== loggedUserId.toString()) {
      return res
        .status(403)
        .json("Unauthorized action: You are not the creator of this event.");
    }

    next();
  } catch (error) {
    return next(error);
  }
};
