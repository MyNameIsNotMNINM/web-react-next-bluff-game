"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { Cylinder } from "./cylinder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import PieChart from "./pie-chart";
import { CylinderTransition } from "./cylinder-transition";

interface PlayerGameData {
  cardAmount: number;
  alive: boolean;
  bulletChamber: number;
}

interface EnnemyPLayerLeftProps {
  isEnabled: boolean;
  direction: "left" | "right" | "top";
  playerData: PlayerGameData;
  centered?: boolean;
  avatarUrl?: string;
  turnEndPercentage?: number;
  avatarName?: string;
  onShoot?: () => void;
}
// left-0 right-0
export const EnnemyPLayer = (props: EnnemyPLayerLeftProps) => {
  // const [active, setActive] = useState<boolean>(true);
  const active = props.isEnabled;
  const scaleX = props.direction == "right" ? "scale-x-[-1]" : "";
  const parentClassName = {
    right: "right-[0rem] h-[100%]",
    left: "left-0 h-[100%]",
    top: "left-0 w-full",
  };
  const deckAnimate = {
    right: { marginLeft: `${active ? 9.5 : 3}rem` },
    left: { marginLeft: `${active ? 9.5 : 3}rem` },
    top: { marginBottom: `${active ? -9.5 : -3}rem` },
  };
  return (
    <div
      className={`absolute ${parentClassName[props.direction]} top-0 px-0 sm:p-2 flex justify-center scale-75 sm:scale-100 `}
    >
      <div
        className={`flex ${props.direction == "top" ? "" : "flex-col"} justify-center gap-2 select-none`}
      >
        <ContextMenu>
          <ContextMenuTrigger
            className={`flex flex-col-reverse justify-center items-center ${scaleX}  ${props.playerData.alive ? "" : "grayscale"} `}
          >
            <motion.div
              animate={deckAnimate[props.direction]}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                mass: 0.75,
                delay: 0,
              }}
              className={`absolute flex flex-col justify-center w-16 h-32 ${props.direction == "top" ? "rotate-90" : ""}`}
            >
              {new Array(props.playerData.cardAmount)
                .fill(0)
                .map((_, idx, arr) => {
                  const center = Math.floor(arr.length / 2);
                  let rotation = 0;
                  let translateY = 0;
                  const rotationAmount = active ? 8 : 2.5;
                  const translateAmount = active ? 8 : 4;
                  if (idx == center) {
                    translateY = -(center - idx) * translateAmount;
                  } else if (idx < center) {
                    rotation = -((center - idx) * rotationAmount);
                    translateY = -(center - idx) * translateAmount;
                  } else if (idx > center) {
                    rotation = (idx - center) * rotationAmount;
                    translateY = (idx - center) * translateAmount;
                  }

                  return (
                    <motion.div
                      key={idx}
                      className={`absolute h-9 w-16 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-sm rounded-md border border-white `}
                      style={{ transformOrigin: "left center" }}
                      animate={{
                        transform: `rotate(${rotation}deg) translateY(${translateY}px)`,
                        // transformOrigin: "left center", // Rotate around the bottom-center of the card
                      }}
                    ></motion.div>
                  );
                })}
            </motion.div>
            <Avatar
              onClick={() => {}}
              className={`relative size-20 ${scaleX} bg-white`}
            >
              <AvatarImage src={props.avatarUrl} />
              <AvatarFallback>{props.avatarName}</AvatarFallback>
              <div className="absolute w-full h-full" />
              {props.turnEndPercentage && (
                <>
                  <div className="absolute w-full h-full backdrop-blur-[1px]" />
                  <PieChart
                    className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-[90%] h-[90%]"
                    size={100}
                    strokeWidth={50}
                    segments={[
                      { value: props.turnEndPercentage, color: "#ffffff " },
                      {
                        value: 100 - props.turnEndPercentage,
                        color: "#00000000",
                      },
                    ]}
                  />
                </>
              )}
            </Avatar>
          </ContextMenuTrigger>
          <ContextMenuContent onContextMenu={(e) => e.preventDefault()}>
            <ContextMenuItem>Perfil</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className="flex flex-col gap-1 justify-center items-center z-50">
          <CylinderTransition
            chamberSize={0.5}
            chamberPosition={props.playerData.bulletChamber}
            chamberCount={6}
            centered={props.centered}
            onClick={props.onShoot}
          />
        </div>
      </div>
    </div>
  );
};
