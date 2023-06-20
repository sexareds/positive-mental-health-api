import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const TestSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  answers: {
    type: [Number]
  },
  score: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

TestSchema.methods.calculateScore = function (answers) {
  let score = 0;
  answers.forEach((answer) => {
    score += answer;
  });
  score /= answers.length;
  return score;
};

export default model("Test", TestSchema);