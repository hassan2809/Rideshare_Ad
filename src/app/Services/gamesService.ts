import http from "./httpService";
import { getAuthHeader } from "./userService";

const apiEndpoint = "/games";

// =====|  Ads Service  |=====

const AdsService = {
  getAllGamesScores: () =>
    http.get(`${apiEndpoint}`, { headers: getAuthHeader() }),
  getLeaderboardByGame: (game: string) =>
    http.get(`${apiEndpoint}/leaderboard/${game}`),
  addGameScore: (data: any) => http.post(`${apiEndpoint}/add-score`, data),
};

// =====|  APIs  |=====

export const getAllGamesScores = () => AdsService.getAllGamesScores();

export const getLeaderboardByGame = (game: string) =>
  AdsService.getLeaderboardByGame(game);

export const addGameScore = (data: any) => AdsService.addGameScore(data);
