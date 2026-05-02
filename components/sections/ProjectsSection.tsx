"use client";

import { useEffect } from "react";
import { renderCanvas } from "../ui/canvas";

const projects = [
  {
    title: "PersonaLens",
    tag: "AI · Next.js · FastAPI",
    description:
      "AI-powered personality analysis using local LLMs. Drop in a journal entry, get a full Big Five trait breakdown — runs entirely on Ollama + Gemma, no data leaves your machine.",
    color: "#4a9ebb",
    github: "https://github.com/SoumyaJain9/personified",
    live: null,
    stack: ["Next.js", "FastAPI", "SQLite", "Ollama"],
  },
  {
    title: "PieChat",
    tag: "Chat App · Node.js",
    description:
      "One open room, everyone invited. Real-time community chat with JWT auth, PostgreSQL persistence, and an AI 'Catch Up' button that summarises everything you missed using Gemini.",
    color: "#c8a46e",
    github: "https://github.com/SoumyaJain9/piechat",
    live: null,
    stack: ["React", "Express", "PostgreSQL", "Gemini AI"],
  },
  {
    title: "DressUp Game",
    tag: "Game · React · Built for fun",
    description:
      "A little passion project I built on a free weekend — an interactive dress-up game where you style a character for a pageant. Mix tops, dresses, shoes and accessories in real time. Silly, but I'm proud of it.",
    color: "#b4c8d8",
    github: "https://github.com/SoumyaJain9/dressup",
    live: "https://dressup-4aia.vercel.app/",
    stack: ["React", "CSS", "Vite"],
  },
];

// Extracted to avoid hook-in-loop issues
function ProjectRow({
  project,
  index,
  isLast,
}: {
  project: (typeof projects)[0];
  index: number;
  isLast: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr auto",
        alignItems: "start",
        gap: "32px",
        padding: "48px 0",
        borderTop: "1px solid #1a2a3a",
        ...(isLast ? { borderBottom: "1px solid #1a2a3a" } : {}),
      }}
    >
      {/* Number */}
      <span
        style={{
          fontStyle: "italic",
          fontSize: "12px",
          color: "#3a5060",
          paddingTop: "10px",
          letterSpacing: "0.1em",
          fontWeight: 600,
        }}
      >
        0{index + 1}
      </span>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Title + tag */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "20px",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          <h3
            className="font-display italic"
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              lineHeight: 1.1,
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: project.color,
              opacity: 0.9,
              flexShrink: 0,
              paddingTop: "4px",
              fontWeight: 500,
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "#8a9fb5",
            maxWidth: "560px",
            marginBottom: "20px",
            fontWeight: 400,
          }}
        >
          {project.description}
        </p>

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.stack.map((s) => (
            <span
              key={s}
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: "100px",
                border: `1px solid ${project.color}55`,
                color: project.color,
                fontWeight: 500,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-end",
          paddingTop: "8px",
          flexShrink: 0,
        }}
      >
        {/* GitHub button */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "10px 22px",
            borderRadius: "100px",
            border: `1px solid ${project.color}`,
            color: project.color,
            textDecoration: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
            transition: "all 0.25s ease",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              `${project.color}22`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "transparent";
          }}
        >
          GitHub →
        </a>

        {/* Live / No demo */}
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "10px 22px",
              borderRadius: "100px",
              background: project.color,
              color: "#060d14",
              textDecoration: "none",
              fontWeight: 700,
              whiteSpace: "nowrap",
              transition: "all 0.25s ease",
              boxShadow: `0 0 20px ${project.color}55`,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = `0 0 32px ${project.color}99`;
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = `0 0 20px ${project.color}55`;
              el.style.transform = "translateY(0)";
            }}
          >
            Live Demo →
          </a>
        ) : (
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 4px",
              color: "#2a3a4a",
              fontWeight: 400,
            }}
          >
            No live demo
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
      style={{ background: "#060d14" }}
    >
      <canvas
        className="pointer-events-none absolute inset-0 w-full h-full"
        id="canvas"
        style={{ zIndex: 5 }}
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/moon-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4a9ebb33] to-transparent" />

      {/* Heading */}
      <div className="relative z-10 text-center mb-20">
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#4a9ebb",
            marginBottom: "12px",
            fontWeight: 500,
          }}
        >
          Selected Work
        </p>
        <h2
          className="font-display italic text-white"
          style={{
            fontSize: "clamp(36px, 5vw, 62px)",
            lineHeight: 1.05,
            textShadow: "0 0 40px rgba(74,158,187,0.2)",
          }}
        >
          Projects that
          <br />
          actually shipped.
        </h2>
      </div>

      {/* Projects list */}
      <div
        className="relative z-10 w-full max-w-5xl"
        style={{ padding: "0 48px" }}
      >
        {projects.map((project, i) => (
          <ProjectRow
            key={i}
            project={project}
            index={i}
            isLast={i === projects.length - 1}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-16">
        <a
          href="https://github.com/SoumyaJain9"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "14px 40px",
            border: "1px solid #4a9ebb",
            color: "#4a9ebb",
            borderRadius: "100px",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontWeight: 600,
            transition: "all 0.3s ease",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#4a9ebb";
            el.style.color = "#060d14";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "transparent";
            el.style.color = "#4a9ebb";
          }}
        >
          See All Work →
        </a>
      </div>
    </section>
  );
}
