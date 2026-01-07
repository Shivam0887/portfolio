"use client";

import { motion, Variants } from "framer-motion";
import React, { forwardRef } from "react";
import { LucideProps } from "lucide-react";

// Animation variants for different icon effects
export const iconVariants = {
  // Pulse effect - grows and shrinks
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.15, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Glow effect - opacity pulse
  glow: {
    initial: { opacity: 0.7 },
    animate: {
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Float effect - gentle up/down movement
  float: {
    initial: { y: 0 },
    animate: {
      y: [-4, 4, -4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Spin effect - continuous rotation
  spin: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },

  // Bounce effect on hover
  bounce: {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.1,
      y: -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  },

  // Wiggle effect on hover
  wiggle: {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  },

  // Pop effect - scale with spring
  pop: {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    tap: { scale: 0.9 },
  },

  // Magnetic pull effect
  magnetic: {
    initial: { x: 0, y: 0 },
    hover: {
      scale: 1.15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  },

  // Shimmer/sparkle effect
  sparkle: {
    initial: {
      filter: "brightness(1) saturate(1)",
      scale: 1,
    },
    animate: {
      filter: [
        "brightness(1) saturate(1)",
        "brightness(1.3) saturate(1.2)",
        "brightness(1) saturate(1)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.1,
      filter: "brightness(1.4) saturate(1.3)",
      transition: { duration: 0.2 },
    },
  },
} as const;

type AnimationVariant = keyof typeof iconVariants;

interface AnimatedIconProps {
  icon: React.ComponentType<LucideProps>;
  animation?: AnimationVariant;
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

// Animated icon wrapper component
export const AnimatedIcon = forwardRef<HTMLDivElement, AnimatedIconProps>(
  (
    {
      icon: Icon,
      animation = "bounce",
      className = "",
      size = 24,
      color,
      strokeWidth = 2,
    },
    ref
  ) => {
    const variant = iconVariants[animation];

    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center justify-center ${className}`}
        initial="initial"
        animate={"animate" in variant ? "animate" : "initial"}
        whileHover="hover"
        whileTap="tap"
        variants={variant as Variants}
      >
        <Icon
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          className="transition-colors"
        />
      </motion.div>
    );
  }
);

AnimatedIcon.displayName = "AnimatedIcon";

// Spinning icon for loading states
export const SpinningIcon = ({
  icon: Icon,
  className = "",
  size = 24,
}: Omit<AnimatedIconProps, "animation">) => (
  <motion.div
    className={`inline-flex items-center justify-center ${className}`}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <Icon size={size} />
  </motion.div>
);

// Pulsing icon for attention-grabbing elements
export const PulsingIcon = ({
  icon: Icon,
  className = "",
  size = 24,
  color,
}: Omit<AnimatedIconProps, "animation">) => (
  <motion.div
    className={`inline-flex items-center justify-center ${className}`}
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <Icon size={size} color={color} />
  </motion.div>
);

// Floating icon for decorative elements
export const FloatingIcon = ({
  icon: Icon,
  className = "",
  size = 24,
  delay = 0,
}: Omit<AnimatedIconProps, "animation"> & { delay?: number }) => (
  <motion.div
    className={`inline-flex items-center justify-center ${className}`}
    animate={{
      y: [-6, 6, -6],
      rotate: [-3, 3, -3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    <Icon size={size} />
  </motion.div>
);

// Glowing icon with animated gradient
export const GlowingIcon = ({
  icon: Icon,
  className = "",
  size = 24,
  color = "var(--primary)",
}: Omit<AnimatedIconProps, "animation">) => (
  <motion.div
    className={`relative inline-flex items-center justify-center ${className}`}
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    {/* Glow effect */}
    <motion.div
      className="absolute inset-0 rounded-full blur-lg"
      style={{ backgroundColor: color, opacity: 0.3 }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <Icon size={size} className="relative z-10" />
  </motion.div>
);

// Interactive magnetic icon that follows mouse slightly
export const MagneticIcon = ({
  icon: Icon,
  className = "",
  size = 24,
  strength = 0.3,
}: Omit<AnimatedIconProps, "animation"> & { strength?: number }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center cursor-pointer ${className}`}
      animate={{
        x: position.x,
        y: position.y,
        scale: position.x !== 0 || position.y !== 0 ? 1.1 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Icon size={size} />
    </motion.div>
  );
};

export default AnimatedIcon;
