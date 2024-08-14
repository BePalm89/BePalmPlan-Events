import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "locations",
  }
);

const Location = mongoose.model("locations", locationSchema, "locations");

export default Location;
