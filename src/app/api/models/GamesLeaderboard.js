import mongoose from "mongoose";
import { games } from "@/app/api/utils/enums";

const GamesLeaderboardSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    city: { type: String },
    email: { type: String },
    time: { type: Number },
    game: {
      type: String,
      enum: Object.values(games),
      default: games.TRIVIA,
    },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.GamesLeaderboard ||
  mongoose.model("GamesLeaderboard", GamesLeaderboardSchema);
