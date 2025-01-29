import { GameContext } from "@/context/game-context";
import { useContext } from "react";

export const useGameData = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
