import { NextResponse } from "next/server";
import Spot from "../../../../models/Spot";
import asyncHandler from "../../../../middleware/asyncHandler";
import mongoose from "mongoose";

export const GET = asyncHandler(async (_, { params }) => {
  const { id: spotId } = await params;

  if (!mongoose.Types.ObjectId.isValid(spotId)) {
    return NextResponse.json(
      { message: "This spot is not available" },
      { status: 400 }
    );
  }

  const spot = await Spot.findById(spotId);

  if (!spot) {
    return NextResponse.json(
      { message: "Spot with the given ID was not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(spot, { status: 200 });
});
