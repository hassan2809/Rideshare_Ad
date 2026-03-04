import { uploadFileToFirebase } from "../../../../middleware/firebase";
import User from "../../../../models/User";
import Category from "../../../../models/Category";
import Ad from "../../../../models/Ad";
import asyncHandler from "../../../../middleware/asyncHandler";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const PATCH = asyncHandler(
  async (req, { params }) => {
    const { id: adId } = await params;
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

    if (body.picture instanceof File) {
      body.picture = await uploadFileToFirebase(body.picture, "ads/");
    }

    const updatedAd = await Ad.findByIdAndUpdate(
      adId,
      {
        name: body.name,
        description: body.description,
        categoryId: body.categoryId,
        brandId: body.brandId,
        picture: body.picture,
        timeSlots: body.timeSlots,
        days: body.days,
        states: body.states,
        adType: body.adType,
        expiryDate: body.expiryDate,
      },
      { new: true }
    );

    if (!updatedAd)
      return NextResponse.json("Ad with the given id was not found.", {
        status: 404,
      });

    return NextResponse.json(updatedAd);
  },
  { auth: true }
);
