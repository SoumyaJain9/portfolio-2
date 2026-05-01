"use client";

import { useEffect } from "react";
import { renderCanvas } from "@/components/ui/canvas";

const projects = [
  { title: "Project One", tag: "Mobile App · 2024", image: "/project-1.jpg", color: "#4a9ebb" },
  { title: "Project Two", tag: "Web Design · 2024", image: "/project-2.jpg", color: "#d4b896" },
  { title: "Project Three", tag: "Design System · 2023", image: "/project-3.jpg", color: "#c8d8e8" },
];

export default function ProjectsSection() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
      style={{ background: "#060d14" }}>

      <canvas className="pointer-events-none absolute inset-0 w-full h-full" id="canvas" style={{ zIndex: 5 }} />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/moon-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4a9ebb33] to-transparent" />

      <div className="relative z-10 text-center mb-16">
        <p className="text-[11px] tracking-[0.25em] uppercase text-[#4a9ebb] mb-3">Selected Work</p>
        <h2 className="font-display italic text-white text-[56px] md:text-[72px] leading-none"
          style={{ textShadow: "0 0 40px rgba(74,158,187,0.2)" }}>
          Projects that<br />moved people.
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-8 max-w-6xl w-full">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            style={{ background: "#0a1520", border: "1px solid #1a2a3a" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 24px ${project.color}33`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
          >
            <div
              className="w-full aspect-video bg-[#0a1520]"
              style={{ backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="w-full h-full bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
            </div>
            <div className="p-5">
              <h3 className="font-display italic text-white text-[20px] mb-1">{project.title}</h3>
              <p className="text-[13px] tracking-wide" style={{ color: project.color }}>{project.tag}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-14">
        <a href="#" className="px-8 py-3 text-sm border border-[#4a9ebb] text-[#4a9ebb] rounded-full hover:bg-[#4a9ebb] hover:text-black transition-all duration-300 tracking-widest uppercase">See All Work →</a>
      </div>
    </section>
  );
}