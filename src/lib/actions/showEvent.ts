import { CardTypes, UserId } from "./playerActions";

export const ShowEventTypeEnum = {
  REVEAL_CARDS: "REVEAL_CARDS",
  PLAYED_CARDS: "PLAYED_CARDS",
  WIN_GAME: "WIN_GAME",
} as const;

export type ShowEventType =
  (typeof ShowEventTypeEnum)[keyof typeof ShowEventTypeEnum];

export type ShowEventData = {
  [ShowEventTypeEnum.REVEAL_CARDS]: { cards: CardTypes[] };
  [ShowEventTypeEnum.PLAYED_CARDS]: { cardCount: number; source: UserId };
  [ShowEventTypeEnum.WIN_GAME]: { winner: UserId };
};

export type ShowEvent = {
  [K in ShowEventType]: {
    type: K;
    payload: ShowEventData[K];
  };
}[ShowEventType];
