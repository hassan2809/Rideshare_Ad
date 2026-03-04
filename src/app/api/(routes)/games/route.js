import { NextResponse } from "next/server";
import GamesLeaderboard from "../../models/GamesLeaderboard";
import asyncHandler from "../../middleware/asyncHandler";

export const GET = asyncHandler(
  async () => {
    const gamesLeaderboard = await GamesLeaderboard.find().sort({ _id: -1 });
    return NextResponse.json(gamesLeaderboard);
  },
  { auth: true }
);
