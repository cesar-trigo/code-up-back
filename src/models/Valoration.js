import mongoose from "mongoose";

const valorationSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  valoration: { type: Number, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  eventId: { type: mongoose.Types.ObjectId, ref: "events", required: true },
});

const Valoration = mongoose.model("valorations", valorationSchema);

export default Valoration;
