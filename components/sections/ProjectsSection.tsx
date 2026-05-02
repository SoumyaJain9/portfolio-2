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
      display: "grid", gridTemplateColumns: "48px 1fr auto", alignItems: "start",
      gap: "32px", padding: "48px 0", borderTop: "1px solid #1a2a3a",
      ...(isLast ? { borderBottom: "1px solid #1a2a3a" } : {}),
    }}>
      <span style={{ fontStyle: "italic", fontSize: "12px", color: "#3a5060", paddingTop: "10px" }}>
        0{index + 1}
      </span>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "14px" }}>
          <h3 className="font-display italic" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#ffffff" }}>
            {project.title}
          </h3>
          <span style={{ fontSize: "11px", textTransform: "uppercase", color: project.color }}>
            {project.tag}
          </span>
        </div>
        <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#8a9fb5", maxWidth: "560px" }}>
          {project.description}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${project.color}`, color: project.color, padding: "10px 22px", borderRadius: "100px", textDecoration: "none" }}>
          GitHub →
        </a>
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
        {projects.map((project, i) => (
          <ProjectRow key={i} project={project} index={i} isLast={i === projects.length - 1} />
        ))}
      </div>
    </section>
  );
}