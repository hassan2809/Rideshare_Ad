import moment from "moment";
import { uploadFileToFirebase } from "../../../middleware/firebase";
import User from "../../../models/User";
import asyncHandler from "../../../middleware/asyncHandler";
import { hashPassword } from "../../../utils/utils";
import { NextResponse } from "next/server";
import { roles } from "../../../utils/enums";

export const POST = asyncHandler(
  async (req) => {
    const { body } = req;

    let error = "";
    if (!body.email) error = "Email is missing";
    if (!body.name) error = "Name is missing";
    if (!body.phone) error = "Phone is missing";
    if (!body.address) error = "Address is missing";
    if (!body.password) error = "Password is missing";

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }

    let alreadyPresent = await User.findOne({ email: body.email });
    if (alreadyPresent)
      return NextResponse.json("An influencer with this email already exists", {
        status: 400,
      });

    if (body.picture instanceof File) {
      body.picture = await uploadFileToFirebase(
        body.picture,
        "profile-pictures/"
      );
    }

    let influencer = new User({
      name: body.name,
      email: body.email,
      password: body.password,
      picture: body.picture,
      phone: body.phone,
      address: body.address,
      role: roles.INFLUENCER,

      publishDate: moment().toJSON(),
    });

    influencer.password = await hashPassword(influencer.password);

    influencer = await influencer.save();

    if (influencer._id)
      return NextResponse.json({ message: "Influencer added successfully!" });
  },
  { auth: true }
);
