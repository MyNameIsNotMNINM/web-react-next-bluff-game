import { CardTypes, UserId } from "./playerActions";

export const ServerActionTypeEnum = {
  CHAT_MESSAGE: "CHAT_MESSAGE",
  GAME_STARTED: "GAME_STARTED",
  LOBBY_PLAYERS: "LOBBY_PLAYERS",
  TURN_STARTED: "TURN_STARTED",
  PLAY_CARDS: "PLAY_CARDS",
  REVEAL_DECK_CARDS: "REVEAL_DECK_CARDS",
  SHOOT_GUN: "SHOOT_GUN",
  STEAL_CARD: "STEAL_CARD",
  PLAYER_DATA_UPDATED: "PLAYER_DATA_UPDATED",
  GAME_ENDED: "GAME_ENDED",
  TURN_MID_TIME_REACHED: "TURN_MID_TIME_REACHED",
  CONFIRM_PLAYER_ACTION: "CONFIRM_PLAYER_ACTION",
  ROUND_STATE: "ROUND_STATE",
  GAME_STATE: "GAME_STATE",
} as const;

export type ServerActionType =
  (typeof ServerActionTypeEnum)[keyof typeof ServerActionTypeEnum];

export type ServerActionData = {
  [ServerActionTypeEnum.CHAT_MESSAGE]: { message: string };
  [ServerActionTypeEnum.LOBBY_PLAYERS]: {
    players: { id: UserId; name: string; ready: boolean }[];
  };
  [ServerActionTypeEnum.GAME_STARTED]: {};
  [ServerActionTypeEnum.TURN_STARTED]: { playerTurn: UserId };
  [ServerActionTypeEnum.PLAY_CARDS]: { cardCount: number };
  [ServerActionTypeEnum.REVEAL_DECK_CARDS]: { cards: CardTypes[] };
  [ServerActionTypeEnum.SHOOT_GUN]: { target: UserId; died: boolean };
  [ServerActionTypeEnum.STEAL_CARD]: { target: UserId; cardIndex: number };
  [ServerActionTypeEnum.PLAYER_DATA_UPDATED]: { name: string };
  [ServerActionTypeEnum.GAME_ENDED]: { winner: UserId };
  [ServerActionTypeEnum.TURN_MID_TIME_REACHED]: { turnEndTime: number };
  [ServerActionTypeEnum.CONFIRM_PLAYER_ACTION]: { confirmedActionId: string };
  [ServerActionTypeEnum.ROUND_STATE]: RoundState;
  [ServerActionTypeEnum.GAME_STATE]: GameState;
};

export type ServerActionMessage = {
  [K in ServerActionType]: {
    type: K;
    source: UserId | null;
    payload: ServerActionData[K];
  };
}[ServerActionType];

export type ServerActionHandler = {
  [K in ServerActionType]: (data: ServerActionData[K], source: UserId) => void;
};

export type PlayerData = {
  id: UserId;
  cardCount: number;
  alive: boolean;
};

export type RoundState = {
  cards: CardTypes[];
  cardType: CardTypes;
  round: number;
  turn: number;
  currentPlayer: string;
  players: PlayerData[];
};

export interface GamePlayerData {
  alive: boolean;
  userId: string;
  playerIdx: number;
  connected: boolean;
  currentChamber: number;
}

export type GameState = {
  active: boolean;
  players: GamePlayerData[];
};
