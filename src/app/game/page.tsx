"use client";
import PlayerControls from "./playerControls";
import Table from "./table";
import { useState } from "react";
import { EnnemyPLayer } from "./ennemy-player";

export default function Home() {
    const [count, setCount] = useState(5);
    return (
        <main 
            onContextMenu={e=>e.preventDefault()} 
            className="relative flex flex-col gap-2 justify-center p-2 w-full h-full overflow-hidden"
            >
            
            <div
                onClick={() => setCount(count + 1)}
                className="w-full h-[50vh] flex justify-center items-center"
            >
                <Table cardAmount={count} cardsToShow={[]} />
            </div>
            <EnnemyPLayer
                playerData={{ cardAmount: 2, alive: true, bulletChamber: 2 }}
                isEnabled={false}
                direction="left"
                avatarName="CN"
                avatarUrl="https://github.com/shadcn.png"
                centered={count%2 == 0}
            />
            <EnnemyPLayer
                playerData={{ cardAmount: 1, alive: true, bulletChamber: 4 }}
                isEnabled={false}
                direction="right"
                avatarName="CN"
                avatarUrl="https://github.com/shadcn.png"
                // centered={count%2 == 0}
            />
            <EnnemyPLayer
                playerData={{ cardAmount: 5, alive: true, bulletChamber: 0 }}
                isEnabled={false}
                direction="top"
                avatarName="CN"
                turnEndPercentage={50}
                avatarUrl="https://github.com/shadcn.png"
                // centered={count%2 == 0}
            />
            <div className="absolute bottom-0 w-screen p-5">
                <PlayerControls active={true} />
            </div>
        </main>
    );
}
