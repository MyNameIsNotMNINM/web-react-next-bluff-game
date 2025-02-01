"use client";
import GamePage from "@/components/game/game-page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CylinderThrobber } from "@/components/ui/throbber";
import { useGameData } from "@/hooks/useGameData";
import { auth } from "@/lib/auth/firebase";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { useIdToken } from 'react-firebase-hooks/auth';

export default function Home() {
    const route = useRouter();
    const { sendAction, gameState, roundState, lobbyState } = useGameData();
    const [user, loading, error] = useIdToken(auth);
    const userLobbyData = lobbyState?.players.find(p=> p.id == user?.uid);
    const voting = useRef(false);
    function Vote() {
        if (voting.current) return;
        const interval = 500; 
        voting.current = true;
        setTimeout(()=>{
            sendAction(
                {
                    type: "VOTE_START",
                    payload: { ready: !userLobbyData?.ready},
                }
            );
            voting.current = false;
        }, interval);
    }
    console.log(error, user, loading)

    // if (loading) {
    //     return (
    //         <div className="w-screen h-screen flex justify-center items-center">
    //             <CylinderThrobber />
    //         </div>
    //     )
    // }

    function sendChatMessage(e: FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const formObject: {[name: string]: string} = {};
        formData.forEach((value, key) => {
            formObject[key] = value.toString();
        });
        sendAction(
            {
                type: "CHAT_MESSAGE",
                payload: formObject as {message: string},
            }
        );
    }
    return (
        <>
            {gameState?.active && <GamePage />}
            <div className="grid grid-cols-10 gap-2">
                
                <div className="col-span-2 p-2 h-screen shadow-lg flex flex-col">
                    <Button onClick={Vote} className={`w-full ${!userLobbyData?.ready ? " bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}>{!userLobbyData?.ready ? "Ready" : "Not Ready"}</Button>
                    <ul className="h-full">
                        {lobbyState?.players.map((e) => {
                            return (
                                <li key={e.id} className={`flex gap-2 items-center p-1`}>
                                    <Avatar onClick={() => { }} className={`relative size-14 bg-white border ${e.ready ? " border-green-500" : ""}`}>
                                        <AvatarImage src={"https://robohash.org/" + e.id} />
                                        <AvatarFallback>{e.name}</AvatarFallback>
                                    </Avatar>
                                    <p>{e.name}</p>
                                    {e.ready &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-500 stroke-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    }
                                </li>   
                            );
                        })}
                    </ul>
                    <form className="p-2 flex flex-col" onSubmit={sendChatMessage}>
                    <Textarea className="block h-10 w-full resize-none border-0 bg-transparent px-0 py-2  text-token-text-primary placeholder:text-token-text-secondary" placeholder="Envie uma mensagem" ></Textarea>
                    </form>
                </div>
            </div>
        </>
    );
}
