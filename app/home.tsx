"use client";

import styles from "./home.module.css";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDownRight,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Menu,
  X,
} from "lucide-react";
import { CharacterReveal } from "@/components/character-reveal";
import type { ProjectData } from "@/lib/data.types";
import { cn } from "@/lib/utils";

interface HomeClientProps {
  featuredProjects: ProjectData[];
}

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const marqueeItems = [
  "Next.js",
  "React",
  "Tailwind",
  "TypeScript",
  "Node.js",
  "Redis",
  "Docker",
  "PostgreSQL",
  "Kafka",
];

// ========== PREMIUM NAVBAR ==========
function PremiumNavbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: "Work", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Journal", href: "/journal" },
    { name: "Connect", href: "/network" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="mx-4 md:mx-8 mt-4 rounded-3xl transition-all duration-700 ease-[0.16,1,0.3,1]"
          animate={{
            backgroundColor: isScrolled
              ? "rgba(10, 10, 10, 0.4)"
              : "rgba(10, 10, 10, 0)",
            backdropFilter: isScrolled ? "blur(32px)" : "blur(0px)",
            borderColor: isScrolled
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(255, 255, 255, 0)",
            paddingLeft: isScrolled ? "1.5rem" : "0.5rem",
            paddingRight: isScrolled ? "1.5rem" : "0.5rem",
          }}
          style={{ border: "1px solid transparent" }}
        >
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="relative group overflow-hidden">
              <motion.span
                className="text-sm font-bold tracking-tighter"
                whileHover={{ y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-5 flex items-center">
                  <span className="text-white">SHIVAM</span>
                  <span className="text-amber-400">.</span>
                </div>
                <div className="h-5 flex items-center text-amber-400">
                  SHIVAM<span className="text-white">.</span>
                </div>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-colors"
                  >
                    <span
                      className={
                        isActive
                          ? "text-white"
                          : "text-white/40 hover:text-white"
                      }
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-white/3 rounded-full -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.8,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-4">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, y: -1 }}
                  >
                    <social.icon className="size-3.5" />
                  </motion.a>
                ))}
              </div>

              <motion.button
                className="md:hidden p-2 text-white/40 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-90 bg-[#0a0a0a] md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-black tracking-tighter text-white/60 hover:text-amber-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ========== MAIN COMPONENT ==========
export default function Home({ featuredProjects }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="bg-[#0a0a0a] text-white min-h-screen selection:bg-amber-400 selection:text-black"
    >
      <PremiumNavbar />

      {/* ========== HERO SECTION ========== */}
      <motion.section
        className="relative min-h-[110vh] flex flex-col justify-center px-6 md:px-12 pt-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="relative z-10 max-w-[1920px] mx-auto w-full">
          <div className="relative flex flex-col gap-0">
            <CharacterReveal
              text="SOFTWARE"
              className="relative z-10 text-[12vw] md:text-[14vw] font-black leading-none tracking-tight-extreme uppercase sprackly-text"
              delay={0.2}
            />
            <div className="relative z-10 flex items-center gap-4 md:gap-8 ml-[10vw]">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "15vw", opacity: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-px bg-white/20 hidden md:block"
              />
              <CharacterReveal
                text="ENGINEER"
                className="text-[12vw] md:text-[14vw] font-black leading-none tracking-tight-extreme uppercase sprackly-text-gold"
                delay={0.5}
              />
            </div>
          </div>

          <motion.div
            className="flex flex-col md:flex-row md:items-start justify-between mt-24 pt-12 border-t border-white/5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="max-w-xl space-y-8">
              <p className="text-lg md:text-2xl text-white/40 leading-tight font-medium">
                Designing & building{" "}
                <span className="text-white">technical systems</span> that
                redefine the limits of the web.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/projects"
                  className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase underline-offset-8 hover:underline decoration-amber-400 transition-all"
                >
                  Explore Work{" "}
                  <ArrowDownRight
                    size={14}
                    className="group-hover:rotate-45 transition-transform"
                  />
                </Link>
                <div className="size-1 rounded-full bg-white/50" />
                <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase">
                  Based in India
                </span>
              </div>
            </div>

            <div className="mt-12 md:mt-0 flex flex-col items-end gap-2 text-right">
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-2">
                Scroll To Explore
              </span>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-px h-24 bg-linear-to-b from-amber-400 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ========== PROJECTS LIST ========== */}
      <section className="relative py-48 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-baseline gap-4 mb-32"
          >
            <h2 className="text-5xl md:text-8xl font-black tracking-tight-extreme uppercase">
              Selected
            </h2>
            <span className="text-amber-400 text-3xl md:text-5xl font-serif italic mb-2 tracking-tighter">
              works
            </span>
            <div className="flex-1 h-px bg-white/5 ml-8 hidden lg:block" />
          </motion.div>

          <div className="grid grid-cols-1 gap-px bg-white/5 border-y border-white/5">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block bg-[#0a0a0a] hover:bg-white/2 transition-colors duration-500 py-16 md:py-24 px-4 md:px-12 overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-8 md:gap-16">
                      <span className="text-[10px] font-mono text-white/20">
                        0{i + 1}
                      </span>
                      <h3 className="text-3xl md:text-7xl lg:text-8xl font-black tracking-tight-extreme uppercase group-hover:text-amber-400 group-hover:italic transition-all duration-500">
                        {project.title}
                      </h3>
                    </div>
                    <div className="hidden lg:flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-12 group-hover:translate-x-0">
                      {project.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-[0.2em] font-medium border border-white/10 px-4 py-2 rounded-full uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                      <div className="size-16 rounded-full border border-amber-400 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-700">
                        <ArrowDownRight className="text-amber-400" />
                      </div>
                    </div>
                  </div>
                  {/* Background Reveal Link Image Placeholder/Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 group-hover:w-[40vw] h-[30vh] bg-amber-400/5 blur-[100px] transition-all duration-700 pointer-events-none" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 text-center"
          >
            <Link
              href="/projects"
              className="inline-block px-12 py-5 rounded-full border border-white/10 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all font-bold"
            >
              View All 24+ Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== MARQUEE ========== */}
      <section className="py-24 overflow-hidden border-t border-white/5 bg-white/1">
        <motion.div
          className={`flex w-max gap-24 whitespace-nowrap ${styles.infiniteMove}`}
          data-animation-direction="left"
          data-animation-speed="slow"
        >
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="flex gap-24 items-center text-6xl md:text-8xl font-black tracking-tight-extreme uppercase text-white/3"
              >
                {marqueeItems.map((item, j) => (
                  <div key={j} className="flex items-center gap-20">
                    <span>{item}</span>
                    <div className="size-2 rounded-full bg-amber-400/20" />
                  </div>
                ))}
              </div>
            ))}
        </motion.div>
      </section>

      <section className="py-24 overflow-hidden border-y border-white/5 bg-white/1">
        <motion.div
          className={`flex w-max gap-24 whitespace-nowrap ${styles.infiniteMove}`}
          data-animation-direction="right"
          data-animation-speed="slow"
        >
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="flex gap-24 items-center text-6xl md:text-8xl font-black tracking-tight-extreme uppercase text-white/3"
              >
                {marqueeItems.map((item, j) => (
                  <div key={j} className="flex items-center gap-20">
                    <span>{item}</span>
                    <div className="size-2 rounded-full bg-amber-400/20" />
                  </div>
                ))}
              </div>
            ))}
        </motion.div>
      </section>

      {/* ========== CONTACT CTA ========== */}
      <section className="relative py-64 px-6 md:px-12 flex flex-col items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl"
        >
          <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-8 block font-mono">
            Connection
          </span>
          <h2 className="text-4xl md:text-8xl font-black tracking-tight-extreme uppercase mb-12">
            Start a{" "}
            <span className="text-amber-400">
              <CharacterReveal
                text="Collaboration"
                delay={0.5}
                className="sprackly-text-gold"
              />
            </span>
          </h2>
          <p className="text-white/40 text-lg md:text-2xl mb-16 font-medium">
            I am currently looking for new opportunities. <br /> Let's discuss
            your next breakthrough project.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link
              href="mailto:hello@example.com"
              className="text-2xl md:text-4xl font-bold tracking-tighter border-b-4 border-amber-400 pb-2 hover:bg-amber-400 hover:text-black transition-all px-4"
            >
              hello@example.com
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="px-6 md:px-12 py-12 border-t border-white/5">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.2em] font-bold">
              SHIVAM© 2025
            </span>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white/20 hover:text-white transition-colors"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {["Work", "Projects", "Journal", "Connect"].map((link) => (
              <Link
                key={link}
                href="/"
                className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/50 hover:text-white"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="text-right">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">
              Built with focus & precision
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
