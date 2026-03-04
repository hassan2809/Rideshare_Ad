import moment from "moment";
import { uploadFileToFirebase } from "../../../middleware/firebase";
import User from "../../../models/User";
import Post from "../../../models/Post";
import asyncHandler from "../../../middleware/asyncHandler";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = asyncHandler(
  async (req) => {
    const { body } = req;

    let error = "";
    if (!body.name) error = "Name is missing";
    if (!body.description) error = "Description is missing";
    if (!body.userId) error = "User is not selected";
    if (!body.picture) error = "Picture is missing";

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(body.userId))
      return NextResponse.json("Invalid userId", { status: 400 });

    const userFound = await User.findById(body.userId);
    if (!userFound) return NextResponse.json("User not found", { status: 404 });

    if (body.picture instanceof File) {
      body.picture = await uploadFileToFirebase(body.picture, "posts/");
    }

    let ad = new Post({
      name: body.name,
      description: body.description,
      categoryId: body.categoryId,
      userId: body.userId,
      picture: body.picture,
      publishDate: moment().toJSON(),
    });

    ad = await ad.save();

    if (ad._id)
      return NextResponse.json({ message: "Post added successfully!" });
  },
  { auth: true }
);
