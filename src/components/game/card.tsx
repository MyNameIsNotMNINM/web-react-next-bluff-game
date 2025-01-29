import { CardTypes } from "@/lib/actions/playerActions";
import { motion } from "motion/react";
import { useState } from "react";

export const Card = (props: {
  cardType: CardTypes;
  front?: boolean;
  delay?: number;
}) => {
  const cardTypes = { JK: "🤡", A: "♥️", Q: "♠️", K: "♦️" };
  const [flipped, setFlipped] = useState(props.front);

  const handleAnimationComplete = () => {
    setFlipped(!flipped);
  };
  const variants = {
    front: {
      rotateY: "-180deg",
    },
    back: {
      rotateY: "0deg",
    },
  };
  console.log(props.front, props.delay);
  return (
    <motion.div
      className="relative h-20 w-12 sm:w-24 sm:h-40 select-none"
      animate={props.front ? "front" : "back"}
      variants={variants}
      transition={{
        duration: 0.5,
        delay: props.delay,
        ease: "easeInOut",
      }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        perspective: "1000px",
        position: "relative",
        transformStyle: "preserve-3d",
        rotateY: props.front && props.delay == undefined ? "-180deg" : "0deg",
      }}
    >
      <div
        className={`absolute bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-md rounded-lg border`}
        style={{ width: "100%", height: "100%", backfaceVisibility: "hidden" }}
      ></div>
      <div
        className={`absolute bg-gradient-to-tr from-gray-50 to-white shadow-md rounded-lg border`}
        style={{
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: "rotateY(-180deg)",
        }}
      >
        <div className="w-full h-full flex justify-center items-center text-2xl">
          {cardTypes[props.cardType]}
        </div>
      </div>
    </motion.div>
  );
};
