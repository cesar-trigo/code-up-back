import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  photo: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  genre: { type: String },
  events: [{ type: mongoose.Types.ObjectId, ref: "events" }],
  role: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

export default User;
