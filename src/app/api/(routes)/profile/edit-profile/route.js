import { uploadFileToFirebase } from "../../../middleware/firebase";
import User from "../../../models/User";
import asyncHandler from "../../../middleware/asyncHandler";
import { hashPassword } from "../../../utils/utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const PATCH = asyncHandler(
  async (req) => {
    const { body } = req;

    let error = "";
    if (!body.email) error = "Email is missing";
    if (!body.name) error = "Name is missing";
    if (body.newPassword && !body.password) error = "Password is missing";
    if (body.password && !body.newPassword) error = "New password is missing";

    if (error) return NextResponse.json(error, { status: 400 });

    let user = await User.findOne({
      $and: [{ _id: { $ne: req.user._id } }, { email: req.body.email }],
    });
    if (user)
      return NextResponse.json("A user with this email already exists", {
        status: 400,
      });

    if (
      body?.password &&
      body?.newPassword &&
      !(await bcrypt.compare(body.password, req.user.password))
    ) {
      return NextResponse.json("Incorrect current password", { status: 400 });
    } else if (body?.password && body?.newPassword) {
      body.password = await hashPassword(body.newPassword);
    }

    if (body?.picture instanceof File) {
      body.picture = await uploadFileToFirebase(
        body?.picture,
        "profile-pictures/"
      );
    }

    user = await User.findByIdAndUpdate(
      req.user._id,
      {
        email: body.email,
        name: body.name,
        phone: body.phone,
        address: body.address,
        picture: body.picture,
        ...(body.password ? { password: body.password } : {}),
      },
      { new: true }
    );

    if (!user)
      return NextResponse.json("The user with the given email was not found.", {
        status: 404,
      });

    const token = user.generateAuthToken();

    return NextResponse.json({ user, token }, { status: 200 });
  },
  { auth: true }
);
