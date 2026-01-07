"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingShapesProps {
  className?: string;
}

const shapes = [
  // Large gradient circle - top right
  {
    type: "circle",
    size: 400,
    x: "75%",
    y: "10%",
    delay: 0,
    duration: 25,
    opacity: 0.08,
    blur: 80,
  },
  // Medium circle - left side
  {
    type: "circle",
    size: 250,
    x: "5%",
    y: "60%",
    delay: 2,
    duration: 30,
    opacity: 0.06,
    blur: 60,
  },
  // Small circle - center
  {
    type: "circle",
    size: 150,
    x: "50%",
    y: "80%",
    delay: 4,
    duration: 20,
    opacity: 0.05,
    blur: 40,
  },
  // Ring - right side
  {
    type: "ring",
    size: 300,
    x: "85%",
    y: "70%",
    delay: 1,
    duration: 35,
    opacity: 0.04,
    blur: 0,
  },
  // Small dot accent
  {
    type: "dot",
    size: 8,
    x: "20%",
    y: "30%",
    delay: 3,
    duration: 15,
    opacity: 0.3,
    blur: 0,
  },
  // Another dot
  {
    type: "dot",
    size: 6,
    x: "80%",
    y: "40%",
    delay: 5,
    duration: 18,
    opacity: 0.25,
    blur: 0,
  },
];

function Shape({
  type,
  size,
  x,
  y,
  delay,
  duration,
  opacity,
  blur,
}: (typeof shapes)[0]) {
  const baseStyles: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
    opacity,
    filter: blur ? `blur(${blur}px)` : undefined,
    transform: "translate(-50%, -50%)",
  };

  const floatAnimation = {
    y: [0, -30, 0, 20, 0],
    x: [0, 15, 0, -10, 0],
    rotate: [0, 5, 0, -5, 0],
  };

  if (type === "circle") {
    return (
      <motion.div
        style={{
          ...baseStyles,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(var(--foreground) / 0.5) 0%, transparent 70%)",
        }}
        animate={floatAnimation}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  if (type === "ring") {
    return (
      <motion.div
        style={{
          ...baseStyles,
          borderRadius: "50%",
          border: "1px solid hsl(var(--foreground) / 0.1)",
          background: "transparent",
        }}
        animate={floatAnimation}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  // Dot
  return (
    <motion.div
      style={{
        ...baseStyles,
        borderRadius: "50%",
        background: "hsl(var(--foreground))",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [opacity, opacity * 1.5, opacity],
      }}
      transition={{
        duration: duration / 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function FloatingShapes({ className }: FloatingShapesProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden -z-10",
        className
      )}
    >
      {shapes.map((shape, i) => (
        <Shape key={i} {...shape} />
      ))}
    </div>
  );
}
