"use client";
import { WebSocketProvider } from "@/context/game-context";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const params = useParams();
    // const [stableUserId, setStableUserId] = useState<string | null>("RAFAEL");
    // const websocketProvider = useMemo(() => {
    //     if (!stableUserId) return null;
    //     return (
    //         <WebSocketProvider url={`ws://192.168.1.68:3100/lobby/${params.lobbyId}`}>
    //             {children}
    //         </WebSocketProvider>
    //     );
    // }, [stableUserId, params.lobbyId, children]);

    // if (!stableUserId) return null;

    // return websocketProvider;

    return <WebSocketProvider url={`ws://192.168.1.68:3100/lobby/${params.lobbyId}`}>
        {children}
    </WebSocketProvider>
}
