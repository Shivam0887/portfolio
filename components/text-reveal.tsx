"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** 'char' for character-by-character, 'word' for word-by-word */
  mode?: "char" | "word";
  /** Duration per character/word in seconds */
  staggerDuration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
};

const charVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 200,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
    },
  },
};

export function TextReveal({
  text,
  className,
  delay = 0,
  mode = "char",
  as: Component = "span",
}: TextRevealProps) {
  const MotionComponent = motion.create(Component);

  if (mode === "word") {
    const words = text.split(" ");
    return (
      <MotionComponent
        className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        custom={delay}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden"
          >
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  // Character mode
  const chars = text.split("");
  return (
    <MotionComponent
      className={cn("inline-flex", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            variants={charVariants}
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </motion.span>
      ))}
    </MotionComponent>
  );
}
