"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
    const route = useRouter();
    const lobbyRef = useRef<HTMLInputElement>(null);
    async function createLobby() {
        const { data } = await axios.post(
            "http://localhost:3000/lobbies/",
            {
                isPublic: true,
            },
            {
                headers: {
                    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30`,
                },
            },
        );
        // setLobby(data.lobbyCode);
        route.push(`/lobby/${data.lobbyCode}`);
    }

    function enterLobby() {
        if(lobbyRef.current?.value){
            //check if lobby exists
            route.push(`/lobby/${lobbyRef.current?.value}`);
        }
    }

    return (
        <main>
            {/* <Avatar className={`relative size-20`}>
                <AvatarImage />
                <AvatarFallback>cuca gado</AvatarFallback>
            </Avatar>
             */}

            <div className="flex flex-col gap-3 mx-auto max-w-lg w-2/4 h-screen justify-center">
                <Button onClick={createLobby} className="w-full" variant="outline">
                    Criar Lobby
                </Button>
                <div className="grid grid-cols-6 gap-2">
                    <Input ref={lobbyRef} className="col-span-4" type="text" placeholder="Lobby" />
                    <Button className="w-full col-span-2" onClick={enterLobby}>Conectar</Button>
                </div>
            </div>
        </main>
    );
}
