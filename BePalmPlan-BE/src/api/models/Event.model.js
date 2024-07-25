import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: ["hobbies", "art", "health", "travel", "sport", "social", "tech"],
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users",
      },
    ],
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    imgEvent: { type: String, required: true },
  },
  { timestamps: true, collection: "events" }
);

const Event = mongoose.model("events", eventSchema, "events");

export default Event;
