import { NextResponse } from "next/server";
import User from "../../../../models/User";
import asyncHandler from "../../../../middleware/asyncHandler";
import mongoose from "mongoose";

export const GET = asyncHandler(async (_, { params }) => {
  const { id: driverId } = await params;

  if (!mongoose.Types.ObjectId.isValid(driverId))
    return NextResponse.json("Invalid driver id", { status: 400 });

  const driver = await User.findById({ _id: driverId }).select("-password");

  if (driver) return NextResponse.json(driver);
  else
    return NextResponse.json("Driver with the given id was not found", {
      status: 404,
    });
});
