"use client";

import { useGameData } from "@/hooks/useGameData";

interface ShopProps {}

export const Shop = (props: ShopProps) => {
  const cardTypes = { JK: "🤡", A: "♥️", Q: "♠️", K: "♦️" };
  const { gameState, roundState } = useGameData();

  return (
    <aside className="fixed top-0 left-0 rounded-br-lg shadow-md bg-white p-5 w-40">
      { roundState && 
        <>
          <div className=" animate-pulse">{cardTypes[roundState.cardType]}</div>
        </>
      }
      { !roundState && (
        <div className="size-5 bg-orange-600 animate-ping"></div>
      )}
      {
        gameState?.store.map((v, i)=>{
          return (
            <div key={v.name + i}>
              {v.name}
            </div>
          )
        })
      }
    </aside>
  );
};
