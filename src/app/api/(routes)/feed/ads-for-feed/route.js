import asyncHandler from "../../../middleware/asyncHandler";
import { NextResponse } from "next/server";
import { fetchFormattedAds, getFilteredAdQuery } from "../../../utils/utils";
import { adTypes } from "../../../utils/enums";

export const POST = asyncHandler(async (req) => {
  const { time, day, state, index } = req.body;

  const query = getFilteredAdQuery({
    adType: { $ne: adTypes.VIDEO },
    time,
    day,
    state,
  });

  const ads = await fetchFormattedAds(query, index);

  return NextResponse.json(ads, { status: 200 });
});
