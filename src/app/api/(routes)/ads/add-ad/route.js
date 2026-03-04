import moment from "moment";
import { uploadFileToFirebase } from "../../../middleware/firebase";
import User from "../../../models/User";
import Ad from "../../../models/Ad";
import Category from "../../../models/Category";
import asyncHandler from "../../../middleware/asyncHandler";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = asyncHandler(
  async (req) => {
    const { body } = req;

    body.timeSlots = body.timeSlots ? JSON.parse(body.timeSlots) : [];
    body.days = body.days ? JSON.parse(body.days) : [];
    body.states = body.states ? JSON.parse(body.states) : [];

    let error = "";
    if (!body.name) error = "Name is missing";
    if (!body.description) error = "Description is missing";
    if (!body.categoryId) error = "Category is not selected";
    if (!body.brandId) error = "Brand is not selected";
    if (!body.timeSlots?.length) error = "Time slots cannot be empty";
    if (!body.days?.length) error = "Days cannot be empty";
    if (!body.states?.length) error = "States cannot be empty";
    if (!body.expiryDate) error = "Expiry date cannot be empty";
    if (!body.adType) error = "Ad type cannot be empty";

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(body.brandId))
      return NextResponse.json("Invalid brandId", { status: 400 });

    if (!mongoose.Types.ObjectId.isValid(body.categoryId))
      return NextResponse.json("Invalid categoryId", { status: 400 });

    const brandFound = await User.findById(body.brandId);
    if (!brandFound)
      return NextResponse.json("Brand not found", { status: 404 });

    const categoryFound = await Category.findById(body.categoryId);
    if (!categoryFound)
      return NextResponse.json("Category not found", { status: 404 });

    let alreadyPresent = await Ad.findOne({ name: body.name });
    if (alreadyPresent)
      return NextResponse.json("An Ad with this name already exists", {
        status: 400,
      });

    if (body.picture instanceof File) {
      body.picture = await uploadFileToFirebase(body.picture, "ads/");
    }

    let ad = new Ad({
      name: body.name,
      description: body.description,
      categoryId: body.categoryId,
      brandId: body.brandId,
      picture: body.picture,
      timeSlots: body.timeSlots,
      days: body.days,
      states: body.states,
      adType: body.adType,

      publishDate: moment().toJSON(),
      expiryDate: body.expiryDate,
    });

    ad = await ad.save();

    if (ad._id) return NextResponse.json({ message: "Ad added successfully!" });
  },
  { auth: true }
);
