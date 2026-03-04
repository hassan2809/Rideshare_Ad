import { NextResponse } from "next/server";
import Ad from "../../../../models/Ad";
import asyncHandler from "../../../../middleware/asyncHandler";

export const DELETE = asyncHandler(
  async (_, { params }) => {
    const { id } = await params;

    const alreadyDeleted = await Ad.findById({ _id: id });
    if (!alreadyDeleted)
      return NextResponse.json("Ad with the given id was not found", {
        status: 404,
      });

    await Ad.findByIdAndDelete({ _id: id });

    return NextResponse.json("Ad deleted successfully!");
  },
  { auth: true }
);
