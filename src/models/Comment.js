import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  comment: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  eventId: { type: mongoose.Types.ObjectId, ref: "events", required: true },
});

const Comment = mongoose.model("comments", commentSchema);

export default Comment;
