"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface CenterWarningProps {
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}
function triangleFill(x: number, y: number, radius: number, startAngle: number, endAngle: number) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        [start.x, start.y].join(", "),
        [x, y].join(", "),
        [end.x, end.y].join(", "),
    ].join(" ");

    return d;
}

import React from "react";

interface PieChartProps {
  size: number;
  segments: { value: number; color: string, backdropBlur?: number }[];
  strokeWidth?: number;
  className?: string;
}

const PieChart = ({ className, size, segments, strokeWidth = 20 }: PieChartProps) => {
  const radius = (size - strokeWidth) / 2; 
  const circumference = 2 * Math.PI * radius;

  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
  let offset = 0;

  return (
    <svg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`} >
      {segments.map((segment, index) => {
        const valueRatio = segment.value / totalValue;
        const segmentLength = valueRatio * circumference;
        const dashArray = `${segmentLength} ${circumference - segmentLength}`;

        const segmentElement = (
          <motion.circle
            key={index}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            animate={{
                strokeDasharray: dashArray,
                strokeDashoffset: -offset,
            }}
            
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );

        offset += segmentLength;
        return segmentElement;
      })}
    </svg>
  );
};

export default PieChart;
