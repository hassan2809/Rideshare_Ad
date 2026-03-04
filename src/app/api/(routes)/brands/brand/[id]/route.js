import { NextResponse } from "next/server";
import User from "../../../../models/User";
import asyncHandler from "../../../../middleware/asyncHandler";
import mongoose from "mongoose";

export const GET = asyncHandler(async (_, { params }) => {
  const { id: brandId } = await params;

  if (!mongoose.Types.ObjectId.isValid(brandId))
    return NextResponse.json("Invalid brand id", { status: 400 });

  const brand = await User.findById({ _id: brandId }).select("-password");

  if (brand) return NextResponse.json(brand);
  else
    return NextResponse.json("Brand with the given id was not found", {
      status: 404,
    });
});
