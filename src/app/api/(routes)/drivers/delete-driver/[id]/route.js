import { NextResponse } from "next/server";
import User from "../../../../models/User";
import asyncHandler from "../../../../middleware/asyncHandler";

export const DELETE = asyncHandler(
  async (_, { params }) => {
    const { id } = await params;

    const alreadyDeleted = await User.findById({ _id: id });
    if (!alreadyDeleted)
      return NextResponse.json("Driver with the given id was not found", {
        status: 404,
      });

    await User.findByIdAndDelete({ _id: id });

    return NextResponse.json("Driver deleted successfully!");
  },
  { auth: true }
);
