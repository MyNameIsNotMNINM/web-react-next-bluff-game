"use client";
import { CardTypes } from "@/lib/actions/playerActions";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Card } from "./card";
import { useGameData } from "@/hooks/useGameData";
import { ShowEvent } from "@/lib/actions/showEvent";

export default function TableCenter(props: {
  cardAmount: number;
  cardsToShow: string[];
  cardType?: CardTypes;
}) {
  const [stackRotation, setStackRotation] = useState<number[]>([0, 0, 0, 0, 0]);
  const CardTypes = { JK: "🤡", A: "♥️", Q: "♠️", K: "♦️" };
  const { sendMessage, gameState, roundState, endTurnTime, showEvent } =
    useGameData();

  // const [flipped, setFlipped] = useState(false);
  // const [position, setPosition] = useState<number>(0);

  // const handleAnimationComplete = () => {
  //   setFlipped(!flipped);
  // };

  // const advancePosition = () => {
  //   console.log(position);
  //   setPosition((p) => {
  //     return (p + 1) % 6;
  //   });
  // };

  useEffect(() => {
    setStackRotation(
      new Array(props.cardAmount).fill(0).map(() => -5 + Math.random() * 15),
    );
  }, []);

  // staggerDirection: -1;
  return (
    <div className="h-full px-2 flex justify-center items-center">
      <div className="relative flex justify-center items-center h-20 sm:h-40">
        {new Array(Math.min(props.cardAmount, 5)).fill(0).map((_, i) => {
          return (
            <motion.div
              key={i}
              className={`absolute h-20 w-12 sm:w-24 sm:h-40 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-xs rounded-lg border`}
              style={{
                rotateZ: stackRotation[i],
              }}
            ></motion.div>
          );
        })}
        <Reveal showEvent={showEvent} />
      </div>
    </div>
  );
}

function Reveal(props: { showEvent: ShowEvent | null }) {
  if (props.showEvent?.type != "REVEAL_CARDS") return;
  return (
    <motion.div
      className="flex gap-2 scale-125 p-5 bg-slate-200 bg-opacity-40 rounded-lg backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
      style={{}}
    >
      {props.showEvent.payload.cards.map((c, i) => {
        return <Card key={i} delay={i * 0.4} cardType={c} front />;
      })}
    </motion.div>
  );
}
