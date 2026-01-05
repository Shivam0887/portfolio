import type React from "react";
import type { Metadata } from "next";

import "./globals.css";

// Adding Playfair Display for editorial headlines alongside Geist

import { PageTransition } from "@/components/page-transition";

import { Geist_Mono, Inter, Cormorant_Garamond } from "next/font/google";
import { Navigation } from "@/components/navigation";

// Initialize fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Premium editorial serif
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio | Technical Design & Engineering",
  description:
    "A mind-bending technical portfolio with a focus on editorial design and complex engineering.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Adding serif font variable to html element
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} ${cormorant.variable} font-sans antialiased selection:bg-primary/20`}
        suppressHydrationWarning
      >
        <PageTransition>
          <Navigation />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
