"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Work", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Journal", href: "/journal" },
  { name: "Network", href: "/network" },
];

export function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const navScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-8 pointer-events-none">
      <motion.nav
        style={{ scale: navScale, opacity: navOpacity }}
        className="bg-white/[0.03] backdrop-blur-xl rounded-full px-2 py-2 flex items-center gap-1 pointer-events-auto border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-6 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 rounded-full",
                isActive ? "text-white" : "text-white/40 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                />
              )}
              {item.name}
            </Link>
          );
        })}
      </motion.nav>
    </header>
  );
}
