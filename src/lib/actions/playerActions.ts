import { z } from "zod";

export const PlayerActionTypeEnum = {
  CHAT_MESSAGE: "CHAT_MESSAGE",
  VOTE_START: "VOTE_START",
  PLAY_CARDS: "PLAY_CARDS",
  DOUBT: "DOUBT",
  SHOOT_GUN: "SHOOT_GUN",
  STEAL_CARD: "STEAL_CARD",
  PLAYER_DATA_UPDATED: "PLAYER_DATA_UPDATED",
} as const;

enum PlayerActionTypeEnums {
  CHAT_MESSAGE = "CHAT_MESSAGE",
  VOTE_START = "VOTE_START",
  PLAY_CARDS = "PLAY_CARDS",
  DOUBT = "DOUBT",
  SHOOT_GUN = "SHOOT_GUN",
  STEAL_CARD = "STEAL_CARD",
  PLAYER_DATA_UPDATED = "PLAYER_DATA_UPDATED",
}

export type PlayerActionType =
  (typeof PlayerActionTypeEnum)[keyof typeof PlayerActionTypeEnum];

export type CardTypes = "A" | "K" | "Q" | "JK";

export type UserId = string;

export type PlayerActionData = {
  [PlayerActionTypeEnum.CHAT_MESSAGE]: { message: string };
  [PlayerActionTypeEnum.VOTE_START]: {};
  [PlayerActionTypeEnum.PLAY_CARDS]: { cards: CardTypes[] };
  [PlayerActionTypeEnum.DOUBT]: {};
  [PlayerActionTypeEnum.SHOOT_GUN]: { target: UserId };
  [PlayerActionTypeEnum.STEAL_CARD]: { target: UserId; cardIndex: number };
  [PlayerActionTypeEnum.PLAYER_DATA_UPDATED]: { name: string };
};
export type PlayerActionHandler = {
  [K in PlayerActionType]: (userId: UserId, data: PlayerActionData[K]) => void;
};

export type PlayerGameActionHandler = {
  PLAY_CARDS: (userId: UserId, data: PlayerActionData["PLAY_CARDS"]) => void;
  DOUBT: (userId: UserId, data: PlayerActionData["DOUBT"]) => void;
  SHOOT_GUN: (userId: UserId, data: PlayerActionData["SHOOT_GUN"]) => void;
  STEAL_CARD: (userId: UserId, data: PlayerActionData["STEAL_CARD"]) => void;
  PLAYER_DATA_UPDATED: (
    userId: UserId,
    data: PlayerActionData["PLAYER_DATA_UPDATED"],
  ) => void;
};

export type PlayerLobbyActionHandler = {
  CHAT_MESSAGE: (
    userId: UserId,
    data: PlayerActionData["CHAT_MESSAGE"],
  ) => void;
  VOTE_START: (userId: UserId, data: PlayerActionData["VOTE_START"]) => void;
};

export type PlayerActionMessage = {
  [K in PlayerActionType]: {
    type: K;
    payload: PlayerActionData[K];
  };
}[PlayerActionType];

export type PlayerActionGameMessage = Exclude<
  PlayerActionMessage,
  { type: keyof PlayerLobbyActionHandler }
>;

const ChatMessageSchema = z.object({
  type: z.literal(PlayerActionTypeEnum.CHAT_MESSAGE),
  payload: z.object({
    message: z.string(),
  }),
});

const VoteStartSchema = z.object({
  type: z.literal(PlayerActionTypeEnum.VOTE_START),
  payload: z.object({}),
});

const PlayCardsSchema = z.object({
  type: z.literal(PlayerActionTypeEnum.PLAY_CARDS),
  payload: z.object({
    cards: z
      .array(
        z.union([
          z.literal("A"),
          z.literal("K"),
          z.literal("Q"),
          z.literal("JK"),
        ]),
      )
      .min(1)
      .max(3),
  }),
});

const ShootGunSchema = z.object({
  type: z.literal(PlayerActionTypeEnum.SHOOT_GUN),
  payload: z.object({
    target: z.string(),
  }),
});

const StealCardSchema = z.object({
  type: z.literal(PlayerActionTypeEnum.STEAL_CARD),
  payload: z.object({
    target: z.string(),
    cardIndex: z.number().min(0).max(6),
  }),
});

const PlayerDataUpdatedSchema = z.object({
  type: z.literal(PlayerActionTypeEnum.PLAYER_DATA_UPDATED),
  payload: z.object({
    name: z.string(),
  }),
});

// Union schema for all message types
export const PlayerActionMessageSchema = z.union([
  ChatMessageSchema,
  PlayCardsSchema,
  VoteStartSchema,
  ShootGunSchema,
  StealCardSchema,
  PlayerDataUpdatedSchema,
]);
