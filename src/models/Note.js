import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    min: 0,
    max: 255,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

export default model("Note", NoteSchema);