import { NextResponse } from "next/server";
import User from "../../models/User";
import asyncHandler from "../../middleware/asyncHandler";
import { roles } from "../../utils/enums";

export const GET = asyncHandler(
  async () => {
    const allDrivers = await User.find({ role: roles.DRIVER }).select(
      "-password"
    );

    return NextResponse.json(allDrivers);
  },
  { auth: true }
);
