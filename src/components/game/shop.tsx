"use client";

import { useGameData } from "@/hooks/useGameData";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface ShopProps { }

type itemsNames = "FORCE_SHOOT" | "SPIN_CYLINDER" | "SWITCH_CARD" | "ADD_BULLET";

export const Shop = (props: ShopProps) => {
    const cardTypes = { JK: "🤡", A: "♥️", Q: "♠️", K: "♦️" };
    const { gameState, roundState, showEvent } = useGameData();
    const images = {
        "FORCE_SHOOT": { name: "force_shoot", desciption: "Ends the Round and force someone of your choosing to shoot themself.", src:'g59' },
        "SPIN_CYLINDER": { name: "spin_cylinder", desciption: "Spins a barrel of your choosing", src:'g60' },
        "SWITCH_CARD": { name: "switch_card", desciption: "Switch your bad cards for the good cards of someone you choose", src:'g61' },
        "ADD_BULLET": { name: "add_bullet", desciption: "Adds a bullet to someones revolver.", src:'g62' },
    }
    if (showEvent?.type == "REVEAL_CARDS") return null
    return (
        <aside className="fixed top-0 left-0 gap-3 rounded-br-lg shadow-md bg-white p-5 flex flex-col justify-center items-center">
            {roundState && (
                <div className="animate-pulse text-2xl">{cardTypes[roundState.cardType]}</div>
            )}
            {!roundState && <div className="size-5 bg-orange-600 animate-ping"></div>}
            <div className="grid grid-cols-2 gap-1 justify-center items-center">
                {gameState?.store.map((v, i) => {
                    return (
                        <HoverCard key={v.name}>
                            <HoverCardTrigger>
                                <div className="bg-slate-200 size-12 rounded-full flex justify-center items-center">
                                    <img src={`/${images[v.name as itemsNames]?.src}.svg`} className="size-3/4" alt="" />
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                {images[v.name as itemsNames].desciption}
                            </HoverCardContent>
                        </HoverCard>
                    )

                    // 
                })}
            </div>
        </aside>
    );
};
