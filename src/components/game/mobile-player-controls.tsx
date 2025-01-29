"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Cylinder } from "./cylinder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardTypes } from "@/lib/actions/playerActions";
import { Button } from "../ui/button";

interface PlayerControlsProps {
  active: boolean;
  alive: boolean;
  turn: number;
  cards?: CardTypes[];
  chamberPosition?: number;
  playCards?: (cards: CardTypes[]) => void;
  doubt?: () => void;
}

export default function MobilePlayerControls(props: PlayerControlsProps) {
  return (
    <div className="justify-center items-center gap-4 scale-50 sm:scale-100">
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
                <Button onClick={props.doubt} className="bg-red-500 px-4 py-1">
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
  );
}
