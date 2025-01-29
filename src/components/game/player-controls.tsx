"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Cylinder } from "./cylinder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardTypes } from "@/lib/actions/playerActions";
import { Button } from "../ui/button";
import { Card } from "./card";
import { useGameData } from "@/hooks/useGameContext";

interface PlayerControlsProps {
  active: boolean;
  alive: boolean;
  turn: number;
  cards?: CardTypes[];
  chamberPosition?: number;
  playCards?: (cards: CardTypes[]) => void;
  doubt?: () => void;
  onShoot?: () => void;
}

export default function PlayerControls(props: PlayerControlsProps) {
  return (
    <>
      <div className="hidden sm:block">
        <DesktopControls {...props} />
      </div>

      <div className="block sm:hidden">
        <MobileControls {...props} />
      </div>
    </>
  );
}

function MobileControls(props: PlayerControlsProps) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const maxSelections = 3;
  const CardTypes = { JK: "🤡", A: "♥️", Q: "♠️", K: "♦️" };
  const toggleSelection = (index: number) => {
    const found = selectedCards.indexOf(index);
    if (found == -1) {
      if (selectedCards.length >= maxSelections) selectedCards.shift();
      setSelectedCards([...selectedCards, index]);
    } else {
      setSelectedCards([
        ...selectedCards.slice(0, found),
        ...selectedCards.slice(found + 1),
      ]);
    }
  };

  const cardVariant = {
    selected: {
      scale: 1.2,
      margin: "0 .6rem",
      transition: { duration: 0.2 },
    },
    notSelected: {
      scale: 1,
      margin: "0",
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    if (!props.active) setSelectedCards([]);
  }, [props.active]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-screen px-2 flex justify-center items-center ${props.alive ? "" : "grayscale"}`}
    >
      <div
        className="absolute left-[1.5rem] bottom-0 z-30 scale-50"
        style={{ transformOrigin: "0 50%" }}
      >
        <div className="flex flex-col items-center gap-2">
          <Cylinder
            chamberSize={0.7}
            chamberPosition={props.chamberPosition || 0}
            chamberCount={6}
            onClick={props.onShoot}
          />
          <div className="flex gap-1">
            <div className="size-7 rounded-full bg-red-500 flex justify-center items-center text-white">
              5
            </div>
            <div className="size-7 rounded-full bg-blue-500 flex justify-center items-center text-white">
              1
            </div>
          </div>
        </div>
        <Avatar className="size-28">
          <AvatarImage src={"https://github.com/shadcn.png"} />
          <AvatarFallback>{"cn"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute right-[1.5rem] bottom-0 z-30 flex flex-col justify-center gap-2 -top-[2rem]">
        {props.active && (
          <>
            <Button
              onClick={() => {
                if (props.playCards)
                  props.playCards(
                    props.cards?.filter((_, i) => selectedCards.includes(i)) ||
                      [],
                  );
              }}
              className="bg-blue-500 px-4 py-1"
            >
              Play
            </Button>
            {props.turn > 0 && (
              <Button onClick={props.doubt} className="bg-red-500 px-4 py-1">
                Doubt
              </Button>
            )}
          </>
        )}
      </div>
      <div className="relative scale-50 sm:scale-100 flex gap-1 justify-center items-center h-20 sm:h-40 w-[33rem]">
        <motion.div
          className={`absolute flex flex-col gap-3`}
          animate={{ translateY: props.active ? 0 : "4rem" }}
        >
          <div className="flex gap-1 justify-center items-center">
            {props.cards?.map((v, idx) => {
              return (
                <motion.div
                  variants={cardVariant}
                  animate={
                    selectedCards.indexOf(idx) != -1
                      ? "selected"
                      : "notSelected"
                  }
                  whileHover={
                    selectedCards.indexOf(idx) != -1 || !props.active
                      ? {}
                      : { scale: 1.05, margin: "0 .17rem" }
                  }
                  whileTap={{ scale: 0.95 }}
                  key={v + idx}
                  onClick={() => {
                    if (props.active) toggleSelection(idx);
                  }}
                  className={`w-24 h-40 text-lg shadow-md rounded-lg border bg-white`}
                >
                  <div className="w-full h-full flex justify-center items-center text-2xl">
                    {CardTypes[v]}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DesktopControls(props: PlayerControlsProps) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const maxSelections = 3;

  const toggleSelection = (index: number) => {
    const found = selectedCards.indexOf(index);
    if (found == -1) {
      if (selectedCards.length >= maxSelections) selectedCards.shift();
      setSelectedCards([...selectedCards, index]);
    } else {
      setSelectedCards([
        ...selectedCards.slice(0, found),
        ...selectedCards.slice(found + 1),
      ]);
    }
  };

  const cardVariant = {
    selected: {
      scale: 1.2,
      margin: "0 .6rem",
      transition: { duration: 0.2 },
    },
    notSelected: {
      scale: 1,
      margin: "0",
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    if (!props.active) setSelectedCards([]);
  }, [props.active]);

  return (
    <div
      className={`h-full px-2 flex justify-center items-center gap-10 select-none ${props.alive ? "" : "grayscale"}`}
    >
      <div className="hidden sm:flex justify-center items-center gap-4 ">
        <div className="flex flex-col items-center gap-2">
          <div className="absolute flex justify-center w-[33rem] gap-2 -top-[2rem]">
            {props.active && (
              <>
                <Button
                  onClick={() => {
                    if (props.playCards)
                      props.playCards(
                        props.cards?.filter((_, i) =>
                          selectedCards.includes(i),
                        ) || [],
                      );
                  }}
                  className="bg-blue-500 px-4 py-1"
                >
                  Play
                </Button>
                {props.turn > 0 && (
                  <Button
                    onClick={props.doubt}
                    className="bg-red-500 px-4 py-1"
                  >
                    Doubt
                  </Button>
                )}
              </>
            )}
          </div>
          <Cylinder
            chamberSize={0.7}
            chamberPosition={props.chamberPosition || 0}
            chamberCount={6}
            onClick={props.onShoot}
          />
          <div className="flex gap-1">
            <div className="size-7 rounded-full bg-red-500 flex justify-center items-center text-white">
              5
            </div>
            <div className="size-7 rounded-full bg-blue-500 flex justify-center items-center text-white">
              1
            </div>
          </div>
        </div>
        <Avatar className="size-28">
          <AvatarImage src={"https://github.com/shadcn.png"} />
          <AvatarFallback>{"cn"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="relative scale-50 sm:scale-100 flex gap-1 justify-center items-center h-20 sm:h-40 w-[33rem]">
        <motion.div
          className={`absolute flex flex-col gap-3`}
          animate={{ translateY: props.active ? 0 : "4rem" }}
        >
          <div className="flex gap-1 justify-center items-center">
            {props.cards?.map((v, idx) => {
              return (
                <motion.div
                  variants={cardVariant}
                  animate={
                    selectedCards.indexOf(idx) != -1
                      ? "selected"
                      : "notSelected"
                  }
                  whileHover={
                    selectedCards.indexOf(idx) != -1 || !props.active
                      ? {}
                      : { scale: 1.05, margin: "0 .17rem" }
                  }
                  whileTap={{ scale: 0.95 }}
                  key={v + idx}
                  onClick={() => {
                    if (props.active) toggleSelection(idx);
                  }}
                  className={`w-24 h-40 text-lg shadow-md rounded-lg border bg-white`}
                >
                  <Card cardType={v} front />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
