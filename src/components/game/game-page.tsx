import PlayerControls from "./player-controls";
import TableCenter from "./table-center";
import { useEffect, useState } from "react";
import { useGameData } from "@/hooks/useGameData";
import { Ennemies } from "@/components/game/enemies";
import { CardTypes, PlayerActionMessage } from "@/lib/actions/playerActions";
import { Shop } from "./shop";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "@/lib/auth/firebase";

export default function Game() {
  // const lobbyId = await params
  const [user, loading, error] = useIdToken(auth);
  const [count, setCount] = useState(5);
  const { sendMessage, gameState, roundState, endTurnTime } = useGameData();
  const enemiesPlayerData = gameState?.players.map((p) => {
    const playerRoundData = roundState?.players.find((rd) => rd.id == p.userId);
    return {
      ...p,
      cardAmount: playerRoundData?.cardCount || 0,
    };
  });
  function playCards(cards: CardTypes[]) {
    const actionMessage: PlayerActionMessage = {
      type: "PLAY_CARDS",
      payload: {
        cards,
      },
    };
    sendMessage(JSON.stringify(actionMessage));
  }

  function doubt() {
    const actionMessage: PlayerActionMessage = {
      type: "DOUBT",
      payload: {},
    };
    sendMessage(JSON.stringify(actionMessage));
  }

  function shoot(target: string) {
    const actionMessage: PlayerActionMessage = {
      type: "SHOOT_GUN",
      payload: {
        target,
      },
    };
    sendMessage(JSON.stringify(actionMessage));
  }

  useEffect(() => {
    console.log("roundStateChanged", endTurnTime);
  }, [roundState]);

  if(!user) return;

  return (
    <main
      // onContextMenu={e=>e.preventDefault()}
      className="relative flex flex-col gap-2 justify-center p-2 w-full h-full overflow-hidden"
    >
      <div
        onClick={() => setCount(count + 1)}
        className="w-full h-[50vh] flex justify-center items-center"
      >
        <TableCenter
          cardAmount={count}
          cardsToShow={[]}
          cardType={roundState?.cardType || "K"}
        />
      </div>
      {gameState && (
        <Ennemies
          players={enemiesPlayerData!}
          playerTurn={roundState?.currentPlayer || ""}
          endTurnTime={endTurnTime || undefined}
          onShoot={shoot}
        />
      )}
      <div className="absolute bottom-0 w-screen p-5">
        <PlayerControls
          active={roundState?.currentPlayer == user?.uid}
          alive={
            roundState?.players.find((p) => p.id == user?.uid)?.alive || false
          }
          cards={roundState?.cards}
          turn={roundState?.turn || 0}
          chamberPosition={
            gameState?.players?.find((p) => p.userId == user?.uid)
              ?.currentChamber
          }
          playCards={playCards}
          doubt={doubt}
          onShoot={() => shoot(user!.uid)}
        />
      </div>
      <Shop />
    </main>
  );
}
