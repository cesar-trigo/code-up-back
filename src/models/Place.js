import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String },
  date: { type: Array, required: true, unique: true },
  occupancy: { type: Number, required: true },
});

const Place = mongoose.model("places", placeSchema);

export default Place;
