import mongoose from "mongoose";
import User from "./User.js";
import Category from './Category.js';
import { adTypes } from "../utils/enums.js";
// import { adTypes } from "../utils/enums";

const AdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  video: {
    type: String,
    // required: true,
  },
  picture: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  timeSlots: { type: [String] },
  days: { type: [String] },
  states: { type: [String] },
  adType: {
    type: String,
    enum: Object.values(adTypes),
    default: adTypes.BANNER,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Ad || mongoose.model("Ad", AdSchema);
