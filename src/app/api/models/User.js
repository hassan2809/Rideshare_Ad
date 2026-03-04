import jwt from "jsonwebtoken";
import Joi from "joi";
import mongoose from "mongoose";
import { roles } from "../utils/enums.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  picture: {
    type: String,
    trim: true,
  },
  phone: { type: String, trim: true },
  address: { type: String },
  publishDate: {
    type: String,
    minlength: 1,
    maxlength: 50000,
  },
  role: {
    type: String,
    enum: Object.values(roles),
    default: roles.ADMIN,
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      phone: this.phone,
      picture: this.picture,
      address: this.address,
    },
    process.env.JWT_PRIVATE_KEY || ""
  );
  return token;
};

export function validateUser(
  user,
  { forLogin = false, forUpdate = false } = {}
) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    ...(forLogin ? {} : { name: Joi.string().min(2).max(50).required() }),
    ...(forUpdate ? {} : { password: Joi.string().min(5).max(255).required() }),
  });

  return schema.validate(user);
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
