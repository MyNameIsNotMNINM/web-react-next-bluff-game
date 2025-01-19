"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CylinderProps {
  chamberPosition: number;
  chamberCount: number;
  bulletPlacement?: number;
  chamberSize?: number;
  
  onClick?: () => void;
}

export const Cylinder = (props: CylinderProps) => {
  const [rotateZ, setRotateZ] = useState(0);
  const cylinderRef = useRef<HTMLDivElement | null>(null);
  const rotationAngle = (2 * Math.PI) / props.chamberCount;
  const rotationAngleDegrees = rotationAngle * (180 / Math.PI);
  function positions() {
    const positions = [];
    const size = 20 * (props.chamberSize || 1);
    for (let theta = 0; theta < 2 * Math.PI - 1; theta += rotationAngle) {
      positions.push([
        Math.cos(theta - Math.PI / 2) * size,
        Math.sin(theta - Math.PI / 2) * size,
      ]);
    }
    return positions;
  }
  const chamberSize = props.chamberSize || 1;

  const getColor = (i: number) => {
    if (props.bulletPlacement == i) return "bg-amber-300";
    if (i <= props.chamberPosition - 1) {
      return "bg-gray-600";
    }
    return "bg-slate-50";
  };
  useEffect(() => {
    // Update rotation based on isFlipped
    setRotateZ(-rotationAngleDegrees * props.chamberPosition);
    console.log(-rotationAngleDegrees * props.chamberPosition);
  }, [props.chamberPosition, rotationAngleDegrees]);

  return (
    <motion.div
      ref={cylinderRef}
      className={`rounded-full bg-gray-800 cursor-pointer`}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        height: `${chamberSize * 4}rem`,
        width: `${chamberSize * 4}rem`,
        z: 1000
      }}
      animate={{ 
        rotateZ, 
        scale: [1.2, 1],
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1,
        delay: 0.25,
      }}
      onClick={props.onClick}
    >
      {positions().map((v, i) => {
        return (
          <div
            key={i}
            className={`absolute rounded-full ${getColor(i)}`}
            style={{
              top: `calc(${v[1]}px + ${2 * chamberSize}rem - ${chamberSize / 2}rem)`,
              left: `calc(${v[0]}px +  ${2 * chamberSize}rem - ${chamberSize / 2}rem)`,
              width: `${chamberSize}rem`,
              height: `${chamberSize}rem`,
            }}
          >
            {props.bulletPlacement == i && (
              <div
                className="absolute bg-amber-500 rounded-full"
                style={{
                  top: `${(chamberSize * 0.4) / 2}rem`,
                  left: `${(chamberSize * 0.4) / 2}rem`,
                  width: `${chamberSize * 0.6}rem`,
                  height: `${chamberSize * 0.6}rem`,
                }}
              ></div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};
