"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion" // Added scroll hooks for nav polish
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { name: "Work", href: "/" },
  { name: "Journal", href: "/journal" },
  { name: "Network", href: "/network" },
]

export function Navigation() {
  const pathname = usePathname()
  const { scrollY } = useScroll()

  const navScale = useTransform(scrollY, [0, 100], [1, 0.95])
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.9])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-8 pointer-events-none">
      <motion.nav
        style={{ scale: navScale, opacity: navOpacity }}
        className="glass rounded-full px-2 py-1.5 flex items-center gap-1 pointer-events-auto shadow-2xl shadow-black/10 border-white/5 dark:border-white/10"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-5 py-2 text-xs font-mono uppercase tracking-widest transition-colors rounded-full",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.name}
            </Link>
          )
        })}
      </motion.nav>
    </header>
  )
}
