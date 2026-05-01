"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function wrapLetters(el: HTMLElement) {
  el.innerHTML = el.textContent!.replace(
    /([^\x00-\x80]|\w|,|\.|')/g,
    "<span class='letter' style='display:inline-block;line-height:1em;opacity:0'>$&</span>"
  );
}

function runAnimeReveal(containerEl: HTMLElement, anime: any) {
  const lettersEl = containerEl.querySelector(".letters") as HTMLElement;
  const lineEl = containerEl.querySelector(".anime-line") as HTMLElement;
  if (!lettersEl || !lineEl) return;

  const lettersWidth = lettersEl.getBoundingClientRect().width;

  anime
    .timeline({ loop: false })
    .add({
      targets: lineEl,
      scaleY: [0, 1],
      opacity: [0.5, 1],
      easing: "easeOutExpo",
      duration: 700,
    })
    .add({
      targets: lineEl,
      translateX: [0, lettersWidth + 10],
      easing: "easeOutExpo",
      duration: 700,
      delay: 100,
    })
    .add({
      targets: containerEl.querySelectorAll(".letter"),
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: "-=775",
      delay: (_el: Element, i: number) => 34 * (i + 1),
    });
}

export default function HeroSection() {
  const [nameVisible, setNameVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [dims, setDims] = useState({ w: 1440, h: 900 });

  const textRef = useRef<HTMLHeadingElement>(null);
  const animeRef = useRef<any>(null);

  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js";
    script.onload = () => {
      animeRef.current = (window as any).anime;
      setTimeout(() => setNameVisible(true), 400);
    };
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    if (!nameVisible || !animeRef.current || !textRef.current) return;
    const lettersEl = textRef.current.querySelector(".letters") as HTMLElement;
    if (lettersEl) wrapLetters(lettersEl);
    runAnimeReveal(textRef.current, animeRef.current);
  }, [nameVisible]);

  useEffect(() => {
    if (!nameVisible) return;
    const handleWheel = (e: WheelEvent) => {
      if (fullyExpanded) return;
      e.preventDefault();
      const delta = e.deltaY * 0.0015;
      setScrollProgress((prev) => {
        const next = Math.min(Math.max(prev + delta, 0), 1);
        if (next >= 1) setFullyExpanded(true);
        return next;
      });
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nameVisible, fullyExpanded]);

  const boxWidth = 300 + scrollProgress * dims.w;
  const boxHeight = 280 + scrollProgress * dims.h;
  const borderRadius = 16 * (1 - scrollProgress);

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/moon-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>{`
        .anime-text-wrapper { position: relative; display: inline-block; padding-top: 0.1em; padding-right: 0.05em; padding-bottom: 0.15em; }
        .anime-line { opacity: 0; position: absolute; left: 0; height: 100%; width: 3px; transform-origin: 0 50%; background: linear-gradient(to bottom, #d4b896, #4a9ebb); box-shadow: 0 0 10px rgba(74,158,187,0.6); }
      `}</style>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#060d14] opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#060d14] to-transparent pointer-events-none" />

      {/* Single-line "Hi, I'm Soumya Jain." */}
      <motion.div
        className="absolute z-20 flex flex-col items-start"
        style={{ opacity: nameVisible ? 1 - scrollProgress * 2 : 0 }}
      >
        <h1
          ref={textRef}
          className="font-display m-0 leading-none select-none italic"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          <span className="anime-text-wrapper">
            <span className="anime-line" />
            <span className="letters" style={{ color: "#c8d8e8", textShadow: "0 0 40px rgba(74,158,187,0.3)" }}>
              Hi, I'm Soumya Jain.
            </span>
          </span>
        </h1>

        <motion.p
          className="mt-3 text-[#4a5568] text-sm tracking-[0.2em] uppercase"
          style={{ opacity: 1 - scrollProgress * 3 }}
        >
          scroll to explore ↓
        </motion.p>
      </motion.div>

      {/* Expanding video box */}
      {nameVisible && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-none"
          style={{
            width: `${boxWidth}px`,
            height: `${boxHeight}px`,
            borderRadius: `${borderRadius}px`,
            border:
              scrollProgress > 0 && scrollProgress < 0.95
                ? `1px solid rgba(74,158,187,${scrollProgress * 0.5})`
                : "none",
            zIndex: 15,
            opacity: scrollProgress > 0 ? 1 : 0,
            background: "#060d14",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: scrollProgress * 1.2 > 1 ? 1 : scrollProgress * 1.2,
            }}
          >
            <source src="/night-sky.mp4" type="video/mp4" />
          </video>

          {fullyExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at center, rgba(6,13,20,0.6) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", textAlign: "center", padding: "0 2rem" }}>
                <h2
                  className="font-display italic"
                  style={{
                    fontSize: "clamp(56px, 7vw, 100px)",
                    color: "#ffffff",
                    textShadow: "0 0 40px rgba(74,158,187,0.4)",
                    fontWeight: 600,
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  Soumya Jain
                </h2>
                <p
                  style={{
                    marginTop: "1rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontWeight: 300,
                    fontSize: "clamp(12px, 1.2vw, 16px)",
                    color: "#4a9ebb",
                    textShadow: "0 0 20px rgba(74,158,187,0.6)",
                  }}
                >
                  Debugging life, one feature at a time.
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <p style={{ color: "#4a5568", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>
                    continue
                  </p>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #4a9ebb, transparent)" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        style={{ opacity: 1 - scrollProgress * 3 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#4a9ebb] to-transparent animate-pulse" />
      </div>
    </section>
  );
}