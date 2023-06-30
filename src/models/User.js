import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
  },
  password:{
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  birthdate: {
    type: String
  },
  gender: {
    type: String
  },
  ethnicity: {
    type: String
  },
  region: {
    type: String
  },
  education: {
    type: String
  },
  institution: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: ["U", "P", "A"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  }
}, {
  timestamps: true
});

UserSchema.methods.encrypPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default model("User", UserSchema);