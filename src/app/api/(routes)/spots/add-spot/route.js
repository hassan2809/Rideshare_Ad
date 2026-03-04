import moment from "moment";
import { uploadFileToFirebase } from "../../../middleware/firebase";
import Spot from "../../../models/Spot";
import asyncHandler from "../../../middleware/asyncHandler";
import { NextResponse } from "next/server";
import { getCoordinatesFromAddress } from "../../../../Utils/geocode";

export const POST = asyncHandler(
  async (req) => {
    const { body } = req;

    if (!body.name) {
      return NextResponse.json({ error: "Name is missing" }, { status: 400 });
    }

    if (body?.picture) {
      body.picture = await uploadFileToFirebase(body.picture, "spots/");
    }

    const coordinates = await getCoordinatesFromAddress(body.location);
    console.log("coordinates", coordinates)
    if (
      !coordinates ||
      !coordinates.lat ||
      !coordinates.lng ||
      isNaN(coordinates.lat) ||
      isNaN(coordinates.lng)
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid address. Please enter a correct or more detailed location.",
        },
        { status: 400 }
      );
    }

    const spot = await Spot.create({
      name: body.name,
      information: body.information,
      location: body.location,
      phone: body.phone,
      picture: body.picture,
      publishDate: moment().toJSON(),
      coordinates: {
        type: "Point",
        coordinates: [coordinates.lng, coordinates.lat],
      },
    });

    return NextResponse.json(
      { message: "Spot added successfully!", spot },
      { status: 200 }
    );
  },
  { auth: true }
);
