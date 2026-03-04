import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import asyncHandler from "../../../middleware/asyncHandler";
import User, { validateUser } from "../../../models/User";

export const POST = asyncHandler(async (req) => {
  const { body } = req;

  body.email = body.email?.toLowerCase();

  const { error } = validateUser(body, { forLogin: true });
  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email: body.email });
  if (!user) {
    return NextResponse.json(
      { message: "User with this email doesn't exist" },
      { status: 400 }
    );
  }

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 400 }
    );
  }

  const token = user.generateAuthToken();

  user.password = undefined; // Remove password from the response

  return NextResponse.json({ user, token }, { status: 200 });
});
