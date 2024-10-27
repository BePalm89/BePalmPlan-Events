import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteEvents: [
      { type: mongoose.Types.ObjectId, required: false, ref: "events" },
    ],
    profileImg: { type: String, required: false },
  },
  { timestamps: true, collection: "users" }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("users", userSchema, "users");

export default User;
