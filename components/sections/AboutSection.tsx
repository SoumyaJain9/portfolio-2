"use client";

import { Suspense, lazy, useRef, useEffect, useState } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

export default function AboutSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-screen flex overflow-hidden"
      style={{ background: "#060d14" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/moon-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4a9ebb33] to-transparent" />

      {/* cursor glow */}
      <div
        className="absolute pointer-events-none rounded-full z-10"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(74,158,187,0.10) 0%, transparent 70%)",
          transform: `translate(calc(-50% + ${mousePos.x * 10}px), calc(-50% + ${mousePos.y * 10}px))`,
          left: "50%",
          top: "50%",
          transition: "transform 0.3s ease",
        }}
      />

      <div className="w-full h-full flex flex-row relative z-20">

        {/* LEFT — text */}
        <div
          className="flex flex-col justify-center"
          style={{
            width: "52%",
            paddingLeft: "clamp(32px, 5vw, 80px)",
            paddingRight: "40px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-30px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <p style={{
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#4a9ebb",
            marginBottom: "20px",
            fontWeight: 500,
          }}>
            About me
          </p>

          <h2
            className="font-display italic text-white leading-tight"
            style={{ fontSize: "clamp(36px, 4vw, 56px)", marginBottom: "28px" }}
          >
            Building things<br />that actually work.
          </h2>

          <p style={{
            color: "#9aafc4",
            fontSize: "clamp(14px, 1.15vw, 16px)",
            lineHeight: "1.75",
            marginBottom: "0",
            maxWidth: "560px",
          }}>
            I build modern web applications using Next.js, focusing on performance, clean design,
            and real usability. I enjoy taking ideas from scratch and turning them into functional,
            polished products that actually work. I am constantly learning by building — experimenting
            with new technologies and refining how I structure and ship applications. Hackathons have
            helped me develop strong problem-solving, adaptability, and collaboration skills by working
            under tight deadlines. Outside of coding, I spend time exploring frontend ideas, studying
            new designs, and analyzing apps to understand what makes interfaces feel intuitive and engaging.
          </p>
        </div>

        {/* RIGHT — robot pinned to bottom */}
        <div
          className="relative flex items-end justify-center overflow-hidden"
          style={{ width: "48%" }}
        >
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(74,158,187,0.12) 0%, transparent 70%)",
              bottom: "0",
              left: "50%",
              transform: `translateX(calc(-50% + ${mousePos.x}px))`,
              transition: "transform 0.4s ease",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "90%",
              transform: inView ? "scale(1) translateY(0)" : "scale(1.6) translateY(8%)",
              transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-6 h-6 border border-[#4a9ebb] border-t-transparent rounded-full animate-spin" />
                  </div>
                }
              >
                <Spline
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  style={{ width: "100%", height: "100%" }}
                  onLoad={(spline) => {
                    const canvas = spline.canvas;
                    if (canvas) {
                      canvas.addEventListener("mousedown", (e) => e.preventDefault());
                      canvas.addEventListener("contextmenu", (e) => e.preventDefault());
                    }
                  }}
                />
              </Suspense>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}