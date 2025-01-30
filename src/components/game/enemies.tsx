"use client";

import { GamePlayerData } from "@/lib/actions/serverAction";
import { EnnemyPLayer } from "./ennemy-player";
import { useEffect, useState } from "react";
import { PlayerActionMessage, UserId } from "@/lib/actions/playerActions";
import { useGameData } from "@/hooks/useGameData";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "@/lib/auth/firebase";

interface EnnemiesProps {
    players: (GamePlayerData & { cardAmount: number })[];
    playerTurn: string;
    endTurnTime?: number;
    onShoot?: (userId: UserId) => void;
}

export const Ennemies = (props: EnnemiesProps) => {
    const [time, setTime] = useState(0);
    const [user, loading, error] = useIdToken(auth);

    function getTime(userId: string) {
        if (
            !props.endTurnTime ||
            props.endTurnTime - Date.now() < 0 ||
            userId != props.playerTurn
        )
            return;
        const startTime = props.endTurnTime - 10 * 1000;
        const now = time;
        // const elapsedTime = now - startTime;
        // const remainingTime = (props.endTurnTime - startTime) -elapsedTime;
        const a = (now - startTime) / (props.endTurnTime - startTime);
        return a * 100;
    }

    const { sendMessage } = useGameData();

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 200);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            {props.players
                .filter((p) => p.userId != user?.uid)
                .map((p, i) => {
                    return (
                        <EnnemyPLayer
                            key={p.userId + i}
                            playerData={{
                                cardAmount: p.cardAmount,
                                alive: p.alive,
                                bulletChamber: p.currentChamber,
                            }}
                            isEnabled={props.playerTurn == p.userId}
                            direction={
                                ["top", "left", "right"][i] as "top" | "left" | "right"
                            }
                            avatarName="CN"
                            turnEndPercentage={getTime(p.userId)}
                            avatarUrl={"https://robohash.org/" + p.userId}
                            onShoot={() => {
                                console.log(`sending shoot ${p.userId}`)
                                if (props.onShoot) props.onShoot(p.userId);
                            }}
                        />
                    );
                })}
        </>
    );
};
