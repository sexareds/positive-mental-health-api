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
  gender: {
    type: String,
    required: true,
    enum: ["Masculino", "Femenino", "Otro"],
  },
  ethnicity: {
    type: String,
    required: true,
    enum: ["Mestizo", "Blanco", "Afrodescendiente", "Indígena", "Otro"]
  },
  region: {
    type: String,
    required: true,
    enum: ["Costa", "Sierra", "Oriente", "Galápagos"]
  },
  education: {
    type: String,
    required: true,
    enum: ["10mo BGU", "1ro bachillerato", "2do de bachillerato", "2ro de bachillerato"]
  },
  institution: {
    type: String,
    required: true,
    enum: ["Privado", "Fiscomisional", "Municipal"]
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