import mongoose from "mongoose";

const SpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  picture: {
    type: String,
  },
  information: {
    type: String,
    trim: true,
  },
  location: { type: String },
  phone: { type: String, trim: true },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point"
    },
    coordinates: {
      type: Number,
      required: true,
      index: "2dsphere"
    }
  }
});

SpotSchema.index({ coordinates: "2dsphere" })

export default mongoose.models.Spot || mongoose.model("Spot", SpotSchema);
