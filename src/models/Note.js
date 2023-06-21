import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const NoteSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  emotion: {
    type: String,
    required: true,
    enum: ["Muy feliz", "Contento", "Animado", "Tranquilo", "Preocupado", "Enojado", "Triste", "Decepcionado"],	
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

export default model("Note", NoteSchema);