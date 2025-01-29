"use client";
import GamePage from "@/components/game/game-page";
import { Button } from "@/components/ui/button";
import { useGameData } from "@/hooks/useGameContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  const { sendMessage, gameState, roundState, lobbyState } = useGameData();

  async function Vote() {
    await sendMessage(
      JSON.stringify({
        type: "VOTE_START",
        payload: {},
      }),
    );
  }

  return (
    <>
      {gameState?.active && <GamePage />}
      {lobbyState?.players.map((e) => {
        return (
          <div key={e.id} className={`${e.ready ? "text-green-500" : ""}`}>
            {e.name}
          </div>
        );
      })}
      <Button onClick={Vote}>Vote Start</Button>
    </>
  );
}
