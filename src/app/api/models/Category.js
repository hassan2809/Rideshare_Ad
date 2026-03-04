import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  // color: {
  //   type: String,
  //   required: true,
  //   minlength: 2,
  //   maxlength: 50,
  // },
  publishDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
