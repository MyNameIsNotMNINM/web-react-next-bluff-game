import { motion } from "motion/react";
import { useState } from "react";

export const CardFlipper = (props: { delay: number }) => {
  const [flipped, setFlipped] = useState(false);

  const handleAnimationComplete = () => {
    setFlipped(!flipped);
  };

  return (
    <motion.div
      className="relative h-20 w-12 sm:w-24 sm:h-40"
      animate={{ rotateY: [0, -180] }} // Rotates the card from 0° to 180°
      transition={{
        duration: 0.5,
        delay: props.delay,
        ease: "easeInOut",
      }}
      onAnimationComplete={handleAnimationComplete} // Trigger flip state change after each animation
      style={{
        perspective: "1000px", // Add perspective for a 3D effect
        position: "relative",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={`absolute bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-md rounded-lg border-2`}
        style={{ width: "100%", height: "100%", backfaceVisibility: "hidden" }}
      ></div>
      <div
        className={`absolute bg-gradient-to-tr from-pink-500 to-red-500 shadow-md rounded-lg border-2`}
        style={{
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: "rotateY(-180deg)",
        }}
      ></div>
    </motion.div>
  );
};
