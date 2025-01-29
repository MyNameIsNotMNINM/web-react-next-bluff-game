"use client";
import { WebSocketProvider } from "@/context/game-context";
import { useParams } from "next/navigation";

export default function Home({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const lobbyId = await params
  const params = useParams();
  return (
    <WebSocketProvider url={`ws://192.168.1.68:3100/lobby/${params.lobbyId}`}>
      {children}
    </WebSocketProvider>
  );
}
