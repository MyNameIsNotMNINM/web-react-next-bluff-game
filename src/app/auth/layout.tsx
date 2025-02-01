"use client";
import { WebSocketProvider } from "@/context/game-context";
import { useParams } from "next/navigation";

export default function Home({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const lobbyId = await params
  const params = useParams();
  return <>{children}</>;
}
