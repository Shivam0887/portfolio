"use client";

import { motion, Variants } from "framer-motion";

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function CharacterReveal({
  text,
  className,
  delay = 0,
}: CharacterRevealProps) {
  const characters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          className="text-transparent"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
