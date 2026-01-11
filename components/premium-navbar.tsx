"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { useState } from "react";

const socials = [
  { label: "GitHub", icon: Github, href: "https://github.com/Shivam0887" },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/shivamsharma0887",
  },
];

const navItems = [
  { name: "Work", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Journal", href: "/journal" },
  { name: "Connect", href: "/network" },
];

export function PremiumNavbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);

    // Hide on scroll down, show on scroll up
    if (latest > lastScrollY && latest > 200) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(latest);
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-100"
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                        className="absolute inset-0 bg-white/5 rounded-full -z-10"
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
                    className="text-white/50 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, y: -1 }}
                  >
                    <social.icon className="size-4" />
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
