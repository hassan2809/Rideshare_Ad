import { NextResponse } from "next/server";
import Spot from "../../../../models/Spot";
import asyncHandler from "../../../../middleware/asyncHandler";

export const DELETE = asyncHandler(
  async (_, { params }) => {
    const { id } = await params;

    const spot = await Spot.findById({ _id: id });
    if (!spot)
      return NextResponse.json(
        { message: "Spot with the given ID was not found" },
        { status: 400 }
      );

    await Spot.findByIdAndDelete({ _id: id });

    return NextResponse.json("Spot deleted successfully!", { status: 200 });
  },
  { auth: true }
);
