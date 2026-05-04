"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":    return "translateY(60px)";
      case "left":  return "translateX(-60px)";
      case "right": return "translateX(60px)";
      case "none":  return "none";
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = getInitialTransform();
    // This cubic-bezier gives the weighted/inertia feeling
    el.style.transition = `opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate(0, 0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return <div ref={ref} style={{ height: "100%" }}>{children}</div>;
}