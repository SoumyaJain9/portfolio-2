"use client";

import { useEffect } from "react";
import { renderCanvas } from "../ui/canvas";

const projects = [
  {
    title: "PersonaLens",
    tag: "AI · Next.js · FastAPI",
    description: "AI-powered personality analysis using local LLMs.",
    color: "#4a9ebb",
    github: "https://github.com/SoumyaJain9/personified",
    live: null,
    stack: ["Next.js", "FastAPI", "SQLite", "Ollama"],
  },
  {
    title: "PieChat",
    tag: "Chat App · Node.js",
    description: "Real-time community chat with AI summaries.",
    color: "#c8a46e",
    github: "https://github.com/SoumyaJain9/piechat",
    live: null,
    stack: ["React", "Express", "PostgreSQL", "Gemini AI"],
  },
  {
    title: "Sephora Clone",
    tag: "E-Commerce · React",
    description: "Full frontend clone of Sephora with Firebase auth, protected routes, wishlist, and add-to-bag functionality.",
    color: "#e8a0b4",
    github: "https://github.com/SoumyaJain9/sephora-clone",
    live: "https://sephora-clone-gamma.vercel.app",
    stack: ["React", "Firebase", "React Router", "CSS"],
  },
  {
    title: "DressUp Game",
    tag: "Game · React",
    description: "Interactive dress-up game built for fun.",
    color: "#b4c8d8",
    github: "https://github.com/SoumyaJain9/dressup",
    live: "https://dressup-4aia.vercel.app/",
    stack: ["React", "CSS", "Vite"],
  },
];

function ProjectRow({ project, index, isLast }: any) {
  return (
    <div style={{
      padding: "40px 0",
      borderTop: "1px solid #1a2a3a",
      ...(isLast ? { borderBottom: "1px solid #1a2a3a" } : {}),
    }}>
      {/* Top row: number + title + tag */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "12px" }}>
        <span style={{ fontStyle: "italic", fontSize: "12px", color: "#3a5060", minWidth: "28px" }}>
          0{index + 1}
        </span>
        <h3 className="font-display italic" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: "#ffffff", margin: 0 }}>
          {project.title}
        </h3>
        <span style={{ fontSize: "11px", textTransform: "uppercase", color: project.color, letterSpacing: "0.08em" }}>
          {project.tag}
        </span>
      </div>

      {/* Bottom row: description + buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "44px", gap: "24px" }}>
        <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#8a9fb5", margin: 0, maxWidth: "560px" }}>
          {project.description}
        </p>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" style={{
              background: project.color, color: "#060d14", padding: "9px 20px",
              borderRadius: "100px", textDecoration: "none", fontSize: "13px", fontWeight: 600,
            }}>
              Live ↗
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
            border: `1px solid ${project.color}`, color: project.color, padding: "9px 20px",
            borderRadius: "100px", textDecoration: "none", fontSize: "13px",
          }}>
            GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24" style={{ background: "#060d14" }}>
      <canvas id="canvas" className="pointer-events-none absolute inset-0 w-full h-full" style={{ zIndex: 5 }} />
      <div className="relative z-10 w-full max-w-5xl" style={{ padding: "0 48px" }}>

        <div style={{ marginBottom: "64px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#3a5060", marginBottom: "16px" }}>
            Selected Work
          </p>
          <h2 className="font-display italic" style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#ffffff", lineHeight: 1.1 }}>
            Projects
          </h2>
        </div>

        {projects.map((project, i) => (
          <ProjectRow key={i} project={project} index={i} isLast={i === projects.length - 1} />
        ))}
      </div>
    </section>
  );
}