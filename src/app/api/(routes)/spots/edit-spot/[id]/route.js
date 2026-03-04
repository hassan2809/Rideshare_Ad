import { uploadFileToFirebase } from "../../../../middleware/firebase";
import Spot from "../../../../models/Spot";
import asyncHandler from "../../../../middleware/asyncHandler";
import { NextResponse } from "next/server";

export const PATCH = asyncHandler(
  async (req, { params }) => {
    const { id: spotId } = await params;
    const { body } = req;

    let error = "";
    if (!body.name) error = "Name is missing";
    if (!body.picture) error = "Picture is missing";

    if (error) return NextResponse.json({ error }, { status: 400 });

    if (body?.picture instanceof File) {
      body.picture = await uploadFileToFirebase(body.picture, "spots/");
    }

    const updatedSpot = await Spot.findByIdAndUpdate(
      spotId,
      {
        name: body.name,
        information: body.information,
        location: body.location,
        phone: body.phone,
        picture: body.picture,
      },
      { new: true }
    );

    if (!updatedSpot)
      return NextResponse.json(
        { message: "Spot with the given ID was not found" },
        { status: 404 }
      );

    return NextResponse.json({ updatedSpot }, { status: 200 });
  },
  { auth: true }
);
