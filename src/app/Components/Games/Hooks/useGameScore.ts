import { useState } from "react";
import {
  addGameScore,
  getLeaderboardByGame,
} from "@/app/Services/gamesService";
import { GameType } from "@/app/Utils/types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGameScore = (gameType: GameType) => {
  const { t } = useTranslation();

  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState<boolean>(false);

  const submitScore = async (userData: any, score: number, time: number) => {
    setLoadingLeaderboard(true);
    try {
      await addGameScore({
        username: userData.username,
        name: userData.name,
        city: userData.city,
        email: userData.email,
        score,
        time,
        game: gameType,
      });

      const data: any = await getLeaderboardByGame(gameType);
      setLeaderboard(data);
    } catch (error: any) {
      console.error(error);
      toast.error(t(error));
    }
    setLoadingLeaderboard(false);
  };

  return { leaderboard, submitScore, loadingLeaderboard };
};
