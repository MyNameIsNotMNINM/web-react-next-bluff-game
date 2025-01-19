"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { Cylinder } from "./cylinder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PlayerControlsProps {
    active: boolean
}

export default function PlayerControls(props: PlayerControlsProps) {
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

    return (
        <div className="h-full px-2 flex justify-center items-center gap-10">
            <div className="hidden sm:flex justify-center items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                    {/* <Cylinder chamberSize={0.8} chamberPosition={0} chamberCount={6} /> */}
                    {/* <div className="flex gap-1">
            <div className="size-7 rounded-full bg-red-500 flex justify-center items-center text-white">
              5
            </div>
            <div className="size-7 rounded-full bg-blue-500 flex justify-center items-center text-white">
              1
            </div>
          </div> */}
                </div>
                <Avatar className="size-28">
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>{"cn"}</AvatarFallback>
                </Avatar>
            </div>
            <div className="relative scale-50 sm:scale-100 flex gap-1 justify-center items-center h-20 sm:h-40 w-[33rem]">
                <motion.div
                    className={`absolute flex gap-1 justify-center items-center`}
                    animate={{ translateY: props.active ? 0 : "4rem" }}
                    >
                    {["A", "K", "Q", "JK", "JK"].map((v, idx) => {
                        return (
                            <motion.div
                                variants={cardVariant}
                                animate={
                                    selectedCards.indexOf(idx) != -1 ? "selected" : "notSelected"
                                }
                                whileHover={
                                    ( selectedCards.indexOf(idx) != -1 || !props.active )
                                        ? {}
                                        : { scale: 1.05, margin: "0 .17rem" }
                                }
                                whileTap={{ scale: 0.95 }}
                                key={v + idx}
                                onClick={() => {
                                    if (props.active) toggleSelection(idx);
                                }}
                                className={`w-24 h-40 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-md rounded-lg border`}
                            ></motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
