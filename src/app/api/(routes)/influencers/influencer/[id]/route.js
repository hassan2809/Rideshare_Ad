import { NextResponse } from "next/server";
import User from "../../../../models/User";
import asyncHandler from "../../../../middleware/asyncHandler";
import mongoose from "mongoose";

export const GET = asyncHandler(async (_, { params }) => {
  const { id: influencerId } = await params;

  if (!mongoose.Types.ObjectId.isValid(influencerId))
    return NextResponse.json("Invalid influencer id", { status: 400 });

  const influencer = await User.findById({ _id: influencerId }).select(
    "-password"
  );

  if (influencer) return NextResponse.json(influencer);
  else
    return NextResponse.json("Influencer with the given id was not found", {
      status: 404,
    });
});
