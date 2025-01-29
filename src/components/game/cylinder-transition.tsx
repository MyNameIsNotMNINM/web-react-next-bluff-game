"use client";
import { motion } from "motion/react";
import { Ref, useEffect, useRef, useState } from "react";
import { Cylinder } from "./cylinder";

interface CylinderTransitionProps {
  chamberPosition: number;
  chamberCount: number;
  bulletPlacement?: number;
  chamberSize?: number;
  centered?: boolean;
  onClick?: () => void;
}

export const CylinderTransition = (props: CylinderTransitionProps) => {
  const [fixedCylinder, setFixedCylinder] = useState(false);
  const [fixedCylinderPos, setFixedCylinderPos] = useState({ x: 0, y: 0 });
  const fixedCylinderRef = useRef<HTMLDivElement | undefined>(undefined);
  const variants = {
    visible: {
      translateX: "-50%",
      translateY: "-50%",
      top: "50vh",
      left: "50vw",
      position: "fixed",
    },
    hidden: { position: "relative" },
  };
  function animationEnd(event: string) {
    if (event == "default") {
      setFixedCylinder(true);
    }
  }
  useEffect(() => {
    // if(props.centered)
    setFixedCylinderPos(getFixedPos());

    if (props.centered == true) setFixedCylinder(false);
  }, [props.centered]);

  useEffect(() => {
    if (props.centered == false) setFixedCylinder(true);
    if (props.centered == true) setFixedCylinder(false);
    setFixedCylinderPos(getFixedPos());
  }, []);

  function getFixedPos() {
    if (fixedCylinderRef.current) {
      const rect = fixedCylinderRef.current.getBoundingClientRect();
      return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      };
    }
    return { x: 0, y: 0 };
  }
  return (
    <>
      <div
        ref={fixedCylinderRef}
        style={{
          opacity: fixedCylinder ? 1 : 0,
          // backgroundColor: fixedCylinder? "#ff0000": "#00ff00",
        }}
      >
        <Cylinder
          chamberPosition={props.chamberPosition}
          chamberCount={props.chamberCount}
          bulletPlacement={props.bulletPlacement}
          chamberSize={props.chamberSize || 2}
        />
      </div>

      {
        <motion.div
          className={`fixed flex`}
          style={{
            opacity: fixedCylinder ? 0 : 1,
            backgroundColor: fixedCylinder ? "#ff00ff" : "#00ffff",
          }}
          variants={{
            centered: {
              translateX: "-50%",
              translateY: "-50%",
              top: "50vh",
              left: "50vw",
            },
            default: {
              translateX: "0",
              translateY: "0",
              top: fixedCylinderPos.y,
              left: fixedCylinderPos.x,
            },
          }}
          onAnimationComplete={(e) => animationEnd(e)}
          animate={props.centered ? "centered" : "default"}
        >
          <Cylinder
            chamberPosition={props.chamberPosition}
            chamberCount={props.chamberCount}
            bulletPlacement={props.bulletPlacement}
            chamberSize={(props.chamberSize || 2) * (props.centered ? 2.5 : 1)}
            onClick={props.onClick}
          />
        </motion.div>
      }
    </>
  );
};
