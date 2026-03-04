import { uploadFileToFirebase } from "../../../../middleware/firebase";
import User from "../../../../models/User";
import asyncHandler from "../../../../middleware/asyncHandler";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { hashPassword } from "../../../../utils/utils";

export const PATCH = asyncHandler(
  async (req, { params }) => {
    const { id: brandId } = await params;
    const { body } = req;

    let error = "";
    if (!brandId) error = "Brand Id is missing";
    if (!body.email) error = "Email is missing";
    if (!body.name) error = "Name is missing";
    if (!body.phone) error = "Phone is missing";
    if (!body.address) error = "Address is missing";
    if (body.newPassword && !body.password) error = "Password is missing";
    if (body.password && !body.newPassword) error = "New password is missing";

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }

    let alreadyPresent = await User.findOne({
      $and: [{ _id: { $ne: brandId } }, { email: body.email }],
    });
    if (alreadyPresent)
      return NextResponse.json("A brand with this email already exists", {
        status: 400,
      });

    const currentBrand = await User.findById(brandId);

    if (
      body?.password &&
      body?.newPassword &&
      !(await bcrypt.compare(body.password, currentBrand.password))
    ) {
      return NextResponse.json("Incorrect current password", { status: 400 });
    } else if (body?.password && body?.newPassword) {
      body.password = await hashPassword(body.newPassword);
    }

    if (body.picture instanceof File) {
      body.picture = await uploadFileToFirebase(
        body.picture,
        "profile-pictures/"
      );
    }

    const updatedBrand = await User.findByIdAndUpdate(
      brandId,
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

    if (!updatedBrand)
      return NextResponse.json("Brand with the given email was not found.", {
        status: 404,
      });

    return NextResponse.json(updatedBrand);
  },
  { auth: true }
);
