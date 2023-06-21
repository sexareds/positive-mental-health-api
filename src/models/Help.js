import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const HelpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  selfSteemLevel: {
    type: Number,
    required: true,
},
}, {
  timestamps: true
});

export default model("Help", HelpSchema);