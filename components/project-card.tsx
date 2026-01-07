"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { iconMap } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  tags?: string[];
  icon?: string;
  index: number;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  slug,
  tags = [],
  icon,
  index,
  className,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const posX = (e.clientX - centerX) / rect.width;
    const posY = (e.clientY - centerY) / rect.height;

    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const IconComponent = (icon && iconMap[icon]) || Sparkles;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative group cursor-pointer",
        "rounded-[2rem] overflow-hidden",
        className
      )}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full bg-white/70 dark:bg-card/70 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-[2rem] p-8 flex flex-col transition-shadow duration-500"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:from-white/5 dark:to-white/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Project number */}
        <div className="absolute top-6 right-6 text-[10px] font-mono text-muted-foreground/40 tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon and tags row */}
          <div className="flex items-center gap-3 mb-6">
            <div className="size-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5 transition-transform duration-500 group-hover:scale-110">
              {IconComponent ? (
                <IconComponent className="size-5" />
              ) : (
                <Sparkles className="size-5" />
              )}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono uppercase tracking-[0.15em] text-muted-foreground/70 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3 tracking-tight group-hover:text-foreground transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-auto">
            {description}
          </p>

          {/* Arrow indicator */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60"
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Project
            </span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Link overlay */}
        <Link href={`/projects/${slug}`} className="absolute inset-0 z-20" />
      </motion.div>

      {/* Enhanced shadow on hover */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-[2rem]"
        initial={{
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 15px 30px -15px rgba(0, 0, 0, 0.1)"
            : "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
