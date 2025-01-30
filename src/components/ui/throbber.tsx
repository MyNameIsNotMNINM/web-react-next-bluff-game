import * as React from "react";

import { cn } from "@/lib/utils";
import { Cylinder } from "../game/cylinder";
import { useRef } from "react";
import { useAnimationFrame } from "motion/react";

const CylinderThrobber = ({ ...props }) => {
    const [cylinderPos, setCylinderPos] = React.useState(0);
    const lastUpdate = useRef<number>(Date.now());
    const turnPerSec = 2;
    useAnimationFrame((time, delta)=>{
        const turnTime = 1000/turnPerSec;
        const now = Date.now();
        if(now > lastUpdate.current+turnTime){
            lastUpdate.current = now;
            setCylinderPos((pos=> (pos+1) % 6));
        }
    })
    return (
      <Cylinder chamberPosition={cylinderPos} chamberCount={6} {...props}/>
    );
  }
  CylinderThrobber.displayName = "CylinderThrobber";

export { CylinderThrobber };
