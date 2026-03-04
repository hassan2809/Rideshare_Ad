import { useState } from "react";

interface GamePlayerData {
  name?: string;
  username?: string;
  email?: string;
  city?: string;
}

const defaultPlayerData = {
  name: "",
  username: "",
  email: "",
  city: "",
};

export const usePlayerData = () => {
  const [playerData, setPlayerData] = useState<GamePlayerData>(defaultPlayerData);

  const updatePlayer = (newData: GamePlayerData) =>
    setPlayerData((prev) => ({ ...prev, ...newData }));

  return {
    playerData,
    updatePlayer,
    resetPlayer: () => setPlayerData(defaultPlayerData),
  };
};
