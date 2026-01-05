"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";
import type { LucideProps, LucideIcon } from "lucide-react";

/**
 * Modern Animated Icon Component
 * Uses Framer Motion for smooth, customizable hover animations on any Lucide icon
 */

// Predefined animation variants for different effects
const animations = {
  // Bounce - subtle bounce on hover
  bounce: {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.15,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  },

  // Rotate - spins slightly on hover
  rotate: {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: 15,
      scale: 1.1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    tap: { scale: 0.9 },
  },

  // Shake - quick wiggle effect
  shake: {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
  },

  // Pulse - grows and shrinks
  pulse: {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.2, 1.1],
      transition: { duration: 0.3 },
    },
  },

  // Flip - 3D flip effect
  flip: {
    initial: { rotateY: 0 },
    hover: {
      rotateY: 180,
      transition: { duration: 0.4 },
    },
  },

  // Ring - bell-like ringing animation
  ring: {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, 15, -15, 10, -10, 5, -5, 0],
      transition: { duration: 0.5 },
    },
  },

  // Pop - quick pop with overshoot
  pop: {
    initial: { scale: 1 },
    hover: {
      scale: 1.25,
      transition: { type: "spring", stiffness: 500, damping: 8 },
    },
    tap: { scale: 0.85 },
  },

  // Swing - pendulum swing
  swing: {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, 20, -15, 10, -5, 0],
      transition: { duration: 0.6 },
    },
  },

  // Float - gentle floating effect
  float: {
    initial: { y: 0 },
    hover: {
      y: [-4, 4, -4],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  },

  // Glow - scales up with a glow effect (use with glowing wrapper)
  glow: {
    initial: { scale: 1, filter: "brightness(1)" },
    hover: {
      scale: 1.15,
      filter: "brightness(1.3)",
      transition: { duration: 0.2 },
    },
  },

  // Jelly - elastic jelly effect
  jelly: {
    initial: { scaleX: 1, scaleY: 1 },
    hover: {
      scaleX: [1, 1.25, 0.85, 1.1, 0.95, 1],
      scaleY: [1, 0.85, 1.15, 0.95, 1.05, 1],
      transition: { duration: 0.5 },
    },
  },

  // Spin - full rotation
  spin: {
    initial: { rotate: 0 },
    hover: {
      rotate: 360,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },

  // Tada - attention-grabbing tada effect
  tada: {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: [1, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
      rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 0],
      transition: { duration: 0.6 },
    },
  },

  // Heartbeat - pulsing heartbeat effect
  heartbeat: {
    initial: { scale: 1 },
    hover: {
      scale: [1, 1.3, 1, 1.3, 1],
      transition: { duration: 0.6 },
    },
  },

  // Draw - stroke draw effect (best for outlined icons)
  draw: {
    initial: { pathLength: 1, opacity: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  },
} as const;

export type AnimationType = keyof typeof animations;

interface HoverIconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
  animation?: AnimationType;
  className?: string;
  wrapperClassName?: string;
}

/**
 * HoverIcon - An icon that animates on hover
 * @param icon - The Lucide icon component
 * @param animation - The animation type to use
 * @param className - Additional classes for the icon
 * @param wrapperClassName - Additional classes for the wrapper div
 */
export function HoverIcon({
  icon: Icon,
  animation = "bounce",
  className = "",
  wrapperClassName = "",
  ...iconProps
}: HoverIconProps) {
  const variant = animations[animation] as Variants;

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${wrapperClassName}`}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={variant}
    >
      <Icon className={className} {...iconProps} />
    </motion.div>
  );
}

// Continuously animated icon (no hover needed)
interface ContinuousIconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
  animation: "pulse" | "float" | "spin";
  className?: string;
  duration?: number;
}

export function ContinuousIcon({
  icon: Icon,
  animation = "pulse",
  className = "",
  duration = 2,
  ...iconProps
}: ContinuousIconProps) {
  const continuousAnimations = {
    pulse: {
      scale: [1, 1.15, 1],
      transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
    },
    float: {
      y: [-4, 4, -4],
      transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
    },
    spin: {
      rotate: 360,
      transition: { duration, repeat: Infinity, ease: "linear" as const },
    },
  };

  return (
    <motion.div
      className="inline-flex items-center justify-center"
      animate={continuousAnimations[animation]}
    >
      <Icon className={className} {...iconProps} />
    </motion.div>
  );
}

// Icon with glow effect on hover
interface GlowIconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
  glowColor?: string;
  className?: string;
}

export function GlowIcon({
  icon: Icon,
  glowColor = "currentColor",
  className = "",
  ...iconProps
}: GlowIconProps) {
  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 rounded-full blur-md opacity-0"
        style={{ backgroundColor: glowColor }}
        whileHover={{ opacity: 0.4, scale: 1.5 }}
        transition={{ duration: 0.3 }}
      />
      <Icon className={`relative z-10 ${className}`} {...iconProps} />
    </motion.div>
  );
}

// Stagger animated icon group
interface IconGroupProps {
  children: React.ReactNode;
  staggerDelay?: number;
}

export function IconGroup({ children, staggerDelay = 0.1 }: IconGroupProps) {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial="initial"
      whileHover="hover"
      variants={{
        hover: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Export all available animations for reference
export const availableAnimations = Object.keys(animations) as AnimationType[];

export default HoverIcon;
