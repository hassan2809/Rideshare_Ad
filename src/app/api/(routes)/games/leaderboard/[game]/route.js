import { NextResponse } from "next/server";
import asyncHandler from "@/app/api/middleware/asyncHandler";
import { games } from "@/app/api/utils/enums";
import GamesLeaderboard from "@/app/api/models/GamesLeaderboard";

export const GET = asyncHandler(async (_, { params }) => {
  const { game } = await params;

  // Get today's start and end
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const entries = await GamesLeaderboard.find({
    game: game || games.TRIVIA,
    publishDate: { $gte: today, $lt: tomorrow },
  })
    .sort({ score: -1, time: 1, createdAt: 1 })
    .limit(50);

  const entriesWithPosition = entries.map((entry, index) => ({
    ...entry.toObject(),
    position: index + 1,
  }));

  return NextResponse.json(entriesWithPosition);
});
