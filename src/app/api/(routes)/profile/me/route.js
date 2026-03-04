import User from "../../../models/User";
import asyncHandler from "../../../middleware/asyncHandler";
import { NextResponse } from "next/server";

export const GET = asyncHandler(
  async (req) => {
    const user = await User.findById(req.user._id).select("-password");
    return NextResponse.json(user, { status: 200 });
  },
  { auth: true }
);
