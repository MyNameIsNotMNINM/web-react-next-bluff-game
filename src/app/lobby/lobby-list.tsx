"use client";
import { reactQueryClient } from "@/context/tanstackQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(5);
  return <QueryClientProvider client={reactQueryClient}></QueryClientProvider>;
}
