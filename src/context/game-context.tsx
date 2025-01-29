"use client";
// context/WebSocketContext.tsx
import { CardTypes, UserId } from "@/lib/actions/playerActions";
import {
  GameState,
  ServerActionData,
  ServerActionHandler,
  ServerActionMessage,
  ServerActionType,
  ServerActionTypeEnum,
} from "@/lib/actions/serverAction";
import { ShowEvent } from "@/lib/actions/showEvent";
import React, { createContext, useContext, useEffect, useState } from "react";

type GameContextType = {
  endTurnTime: number | null;
  sendMessage: (message: string) => Promise<void>;
  socket: WebSocket | null;
  gameState: GameState | null;
  roundState: ServerActionData["ROUND_STATE"] | null;
  showEvent: ShowEvent | null;
  lobbyState: {
    players: { id: UserId; name: string; ready: boolean }[];
  } | null;
  canShoot: boolean;
};

export const MAX_ACTION_TIME = 1 * 1000; // 45sec
export const EXTRA_ACTION_TIME = 5 * 1000; // 5sec

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const WebSocketProvider: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [roundState, setRoundState] = useState<
    ServerActionData["ROUND_STATE"] | null
  >(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [lobbyState, setLobbyState] = useState<{
    players: { id: UserId; name: string; ready: boolean }[];
  } | null>(null);
  const [showEvent, setShowEvent] = useState<ShowEvent | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [endTurnTime, setEndTurnTime] = useState<number | null>(null);
  const canShoot =
    roundState?.currentPlayer == "RAFAEL" &&
    roundState.players.find((p) => p.id == "RAFAEL")?.cardCount === 0;
  const actionHandler: ServerActionHandler = {
    [ServerActionTypeEnum.CHAT_MESSAGE]: async (data) => {
      console.log(data);
    },
    [ServerActionTypeEnum.LOBBY_PLAYERS]: async (data) => {
      setLobbyState(data);
    },
    [ServerActionTypeEnum.GAME_STARTED]: async (data) => {},
    [ServerActionTypeEnum.TURN_STARTED]: async (data) => {
      // const newRoundState = {...roundState};
      // newRoundState.currentPlayer = data.playerTurn;
      // setRoundState(newRoundState);
      setEndTurnTime(null);
    },
    [ServerActionTypeEnum.PLAY_CARDS]: async (data, source) => {
      ShowEvent({
        type: "PLAYED_CARDS",
        payload: {
          cardCount: data.cardCount,
          source: source,
        },
      });
    },
    [ServerActionTypeEnum.REVEAL_DECK_CARDS]: async (data) => {
      ShowEvent({
        type: "REVEAL_CARDS",
        payload: {
          cards: data.cards,
        },
      });
    },
    [ServerActionTypeEnum.SHOOT_GUN]: async (data) => {
      console.log(
        "changing gamestate:",
        data,
        gameState,
        { ...gameState }?.players?.find((p) => p.userId == data.target),
      );
      const newGameState = { ...gameState };
      console.log("GAME_STATE", newGameState);
      if (!newGameState.players) return;
      const player = newGameState.players.find((p) => p.userId == data.target);
      if (player) player.currentChamber++;
      setGameState(newGameState);
    },
    [ServerActionTypeEnum.STEAL_CARD]: async (data) => {},
    [ServerActionTypeEnum.PLAYER_DATA_UPDATED]: async (data) => {},
    [ServerActionTypeEnum.GAME_ENDED]: async (data) => {
      ShowEvent({
        type: "WIN_GAME",
        payload: {
          winner: data.winner,
        },
      });
      console.log("GAME_ENDED", data);
      setGameState(null);
      setRoundState(null);
    },
    [ServerActionTypeEnum.TURN_MID_TIME_REACHED]: async (data) => {
      console.log("TURN_MID_TIME_REACHED", data);
      // const newRoundState = {...roundState, endTime: data.turnEndTime};
      // setRoundState(newRoundState);
      setEndTurnTime(data.turnEndTime);
    },
    [ServerActionTypeEnum.CONFIRM_PLAYER_ACTION]: async (data) => {},
    [ServerActionTypeEnum.ROUND_STATE]: async (data) => {
      setRoundState(data);
    },
    [ServerActionTypeEnum.GAME_STATE]: async (data) => {
      setGameState(data);
    },
  };

  function ShowEvent(event: ShowEvent) {
    if (timeoutId) clearTimeout(timeoutId);
    setShowEvent(event);
    const t = setTimeout(() => {
      setShowEvent(null);
    }, 3000);
    setTimeoutId(t);
  }

  function startWs(reconnectAttempt = 0) {
    const maxReconnectDelay = 30000;
    const baseDelay = 1000;

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(
        JSON.stringify({
          type: "AUTHORIZATION",
          payload: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSQUZBRUwiLCJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.binzbXzz-YLDkG-W2QX8kxtp9kahRo6wSdyVQAQCcYA",
          },
        }),
      );
      setConnected(true);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
      setSocket(null);

      // Attempt to reconnect with a staggered delay
      const delay = Math.min(
        baseDelay * 2 ** reconnectAttempt,
        maxReconnectDelay,
      );
      console.log(`Reconnecting in ${delay / 1000} seconds...`);

      setTimeout(() => {
        startWs(reconnectAttempt + 1);
      }, delay);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    ws.onmessage = async (message: MessageEvent) => {
      const data = JSON.parse(message.data);
      const t = data.type as ServerActionType;
      await actionHandler[t](data.payload, data.source);
    };

    setSocket(ws);
    return ws;
  }

  useEffect(() => {
    let reconnectAttempt = 0;
    const ws = startWs(reconnectAttempt);

    return () => {
      ws?.close();
    };
  }, []);

  const sendMessage = async (message: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <GameContext.Provider
      value={{
        socket,
        sendMessage,
        gameState,
        roundState,
        lobbyState,
        showEvent,
        endTurnTime,
        canShoot,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
