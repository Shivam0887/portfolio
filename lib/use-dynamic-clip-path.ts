"use client";

import { useEffect, useState, RefObject, useCallback } from "react";

interface ClipPathConfig {
  borderRadius?: number;
  notchPadding?: number;
  notchHeight?: number;
}

/**
 * Custom hook that generates a dynamic clip-path for a hero section
 * with a centered notch cutout for the navbar.
 *
 * @param containerRef - Ref to the hero section element
 * @param config - Configuration options for the clip-path
 * @returns The clip-path CSS value string
 */
export function useDynamicClipPath(
  containerRef: RefObject<HTMLElement | null>,
  config: ClipPathConfig = {}
): string {
  const { borderRadius = 24, notchPadding = 26, notchHeight = 58 } = config;

  const [clipPath, setClipPath] = useState<string>("");

  const calculateClipPath = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const r = borderRadius;

    // Find the navbar element to get its actual dimensions and position
    const navbar = document.querySelector("header nav");
    let navLeft: number;
    let navRight: number;
    let navBottom: number;

    if (navbar) {
      const navRect = navbar.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate navbar position relative to the container
      navLeft = navRect.left - containerRect.left - notchPadding;
      navRight = navRect.right - containerRect.left + notchPadding;
      navBottom = navRect.bottom - containerRect.top + notchPadding;
    } else {
      // Fallback: estimate navbar position (centered, ~35% width)
      const notchWidth = width * 0.35;
      navLeft = (width - notchWidth) / 2;
      navRight = (width + notchWidth) / 2;
      navBottom = notchHeight;
    }

    // Ensure values are within bounds
    navLeft = Math.max(r + r, navLeft);
    navRight = Math.min(width - r - r, navRight);
    navBottom = Math.max(r, navBottom);

    // Build the SVG path
    // Starting from top-left, going clockwise
    const path = `
      M 0 ${r}
      Q 0 0 ${r} 0
      L ${navLeft - r} 0
      Q ${navLeft} 0 ${navLeft} ${r}
      L ${navLeft} ${navBottom - r}
      Q ${navLeft} ${navBottom} ${navLeft + r} ${navBottom}
      L ${navRight - r} ${navBottom}
      Q ${navRight} ${navBottom} ${navRight} ${navBottom - r}
      L ${navRight} ${r}
      Q ${navRight} 0 ${navRight + r} 0
      L ${width - r} 0
      Q ${width} 0 ${width} ${r}
      L ${width} ${height - r}
      Q ${width} ${height} ${width - r} ${height}
      L ${r} ${height}
      Q 0 ${height} 0 ${height - r}
      Z
    `
      .replace(/\s+/g, " ")
      .trim();

    setClipPath(`path("${path}")`);
  }, [containerRef, borderRadius, notchPadding, notchHeight]);

  useEffect(() => {
    // Initial calculation
    calculateClipPath();

    // Use ResizeObserver for efficient resize handling
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateClipPath();
    });

    resizeObserver.observe(container);

    // Also observe window resize for navbar position changes
    window.addEventListener("resize", calculateClipPath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateClipPath);
    };
  }, [containerRef, calculateClipPath]);

  return clipPath;
}
