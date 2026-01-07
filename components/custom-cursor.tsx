"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const dotX = useSpring(mouseX, { damping: 40, stiffness: 800 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 800 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button";

      setIsHovered(!!isSelectable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 hidden lg:block">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Main Ring */}
            <motion.div
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                width: isHovered ? 80 : 32,
                height: isHovered ? 80 : 32,
                opacity: isClicking ? 0.3 : 1,
                borderWidth: isHovered ? "1px" : "1px",
              }}
              className="absolute rounded-full border border-amber-400/50 mix-blend-difference flex items-center justify-center transition-[width,height] duration-300"
            />

            {/* Inner Dot */}
            <motion.div
              style={{
                x: dotX,
                y: dotY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                scale: isHovered ? 0 : 1,
              }}
              className="absolute size-1.5 bg-amber-400 rounded-full"
            />

            {/* Hover Text or Icon can be added here */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  x: springX,
                  y: springY,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                className="absolute text-[8px] font-bold tracking-tighter text-amber-400 uppercase pointer-events-none"
              >
                View
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
