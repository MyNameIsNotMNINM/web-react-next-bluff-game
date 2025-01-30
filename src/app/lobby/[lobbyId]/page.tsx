"use client";
import GamePage from "@/components/game/game-page";
import { Button } from "@/components/ui/button";
import { CylinderThrobber } from "@/components/ui/throbber";
import { useGameData } from "@/hooks/useGameData";
import { auth } from "@/lib/auth/firebase";
import { useRouter } from "next/navigation";
import { useIdToken } from 'react-firebase-hooks/auth';

export default function Home() {
  const route = useRouter();
  const { sendMessage, gameState, roundState, lobbyState } = useGameData();
  const [user, loading, error] = useIdToken(auth);
  function Vote() {
    sendMessage(
      JSON.stringify({
        type: "VOTE_START",
        payload: {},
      }),
    );
  }
  console.log(error, user, loading)

  if (loading) {
      return (
          <div className="w-screen h-screen flex justify-center items-center">
              <CylinderThrobber />
          </div>
      )
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
