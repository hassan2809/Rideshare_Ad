import GamesLeaderboard from "../../../models/GamesLeaderboard";
import asyncHandler from "../../../middleware/asyncHandler";
import { NextResponse } from "next/server";
import moment from "moment";

export const POST = asyncHandler(async (req) => {
  const { body } = req;

  let error = "";
  if (!body.name) error = "Name is missing";
  if (!body.username) error = "Username is missing";
  if (!body.game) error = "Game is not selected";
  if (!body.time) error = "Time is not present";

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  const existing = await GamesLeaderboard.findOne({
    name: body.name,
    username: body.username,
    game: body.game,
  });

  if (existing) {
    if (body.score > existing.score || body.time > existing.time) {
      existing.score = body.score;
      existing.time = body.time;
      existing.publishDate = moment().toJSON();
      await existing.save();
      return NextResponse.json({ message: "Score updated successfully." });
    } else {
      return NextResponse.json({
        message: "Existing score is higher or equal. No update made.",
      });
    }
  }

  const newEntry = new GamesLeaderboard({
    username: body.username,
    name: body.name,
    score: body.score,
    email: body.email,
    city: body.city,
    game: body.game,
    time: body.time,
    publishDate: moment().toJSON(),
  });

  await newEntry.save();
  return NextResponse.json({ message: "Score submitted successfully." });
});
