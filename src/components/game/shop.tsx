"use client";

interface ShopProps {}

export const Shop = (props: ShopProps) => {
  const cardTypes = { JK: "🤡", A: "♥️", Q: "♠️", K: "♦️" };

  return (
    <aside className="fixed top-0 left-0 rounded-br-lg shadow-md bg-white p-5 w-40"></aside>
  );
};
