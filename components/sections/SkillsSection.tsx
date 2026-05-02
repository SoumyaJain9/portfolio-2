"use client";

import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const skills = [
  { name: "Next.js",    letter: "N",  color: "#ffffff" },
  { name: "React",      letter: "⚛",  color: "#61DAFB" },
  { name: "Node.js",    letter: "⬡",  color: "#6db96d" },
  { name: "MongoDB",    letter: "⬢",  color: "#6db96d" },
  { name: "Tailwind",   letter: "≋",  color: "#7dd4f0" },
  { name: "Express",    letter: "ex", color: "#c8d8e8" },
  { name: "PostgreSQL", letter: "pg", color: "#7090d0" },
  { name: "Java",       letter: "J",  color: "#e8a87c" },
  { name: "SQLite",     letter: "db", color: "#a0b8d0" },
  { name: "Framer",     letter: "Fr", color: "#c8d8e8" },
  { name: "Prisma",     letter: "Pr", color: "#c8d8e8" },
  { name: "Postman",    letter: "Po", color: "#f08060" },
  { name: "GSAP/JS",    letter: "GS", color: "#a8d898" },
  { name: "Figma",      letter: "✦",  color: "#e8b090" },
  { name: "Canva",      letter: "◈",  color: "#7dd4f0" },
];

const positions = [
  { depth: 0.5,  pos: "top-[5%]  left-[3%]"  },
  { depth: 1.5,  pos: "top-[8%]  left-[22%]" },
  { depth: 2,    pos: "top-[3%]  left-[44%]" },
  { depth: 1,    pos: "top-[6%]  left-[65%]" },
  { depth: 0.8,  pos: "top-[3%]  left-[82%]" },
  { depth: 2.5,  pos: "top-[38%] left-[1%]"  },
  { depth: 1.2,  pos: "top-[42%] left-[20%]" },
  { depth: 3,    pos: "top-[36%] left-[55%]" },
  { depth: 1.8,  pos: "top-[40%] left-[78%]" },
  { depth: 1,    pos: "top-[68%] left-[5%]"  },
  { depth: 2,    pos: "top-[72%] left-[24%]" },
  { depth: 1.5,  pos: "top-[66%] left-[46%]" },
  { depth: 0.7,  pos: "top-[70%] left-[65%]" },
  { depth: 2.2,  pos: "top-[67%] left-[82%]" },
  { depth: 1.3,  pos: "top-[88%] left-[38%]" },
];

export default function SkillsSection() {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/moon-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="absolute inset-0 bg-[#060d14] opacity-70" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4a9ebb33] to-transparent" />

      <div className="relative z-20 text-center pointer-events-none">
        <p className="text-[11px] tracking-[0.25em] uppercase text-[#4a9ebb] mb-3">Expertise</p>
        <h2
          className="font-display italic text-white leading-none"
          style={{ fontSize: "clamp(56px, 7vw, 96px)", textShadow: "0 0 60px rgba(74,158,187,0.2)" }}
        >
          What I bring
        </h2>
      </div>

      <Floating sensitivity={-1} className="overflow-hidden">
        {skills.map((skill, i) => (
          <FloatingElement key={skill.name} depth={positions[i].depth} className={positions[i].pos}>
            <SkillPill skill={skill} />
          </FloatingElement>
        ))}
      </Floating>
    </section>
  );
}

function SkillPill({ skill }: { skill: { name: string; letter: string; color: string } }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        padding: "9px 18px 9px 10px",
        background: "rgba(255, 255, 255, 0.07)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        borderRadius: "999px",
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.06),
          0 2px 16px rgba(0,0,0,0.4),
          0 0 18px rgba(255,255,255,0.06)
        `,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        cursor: "default",
        whiteSpace: "nowrap",
        transition: "background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = "rgba(255,255,255,0.13)";
        el.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.12), 0 4px 24px rgba(0,0,0,0.5), 0 0 28px rgba(255,255,255,0.12)`;
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = "rgba(255,255,255,0.07)";
        el.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.06), 0 2px 16px rgba(0,0,0,0.4), 0 0 18px rgba(255,255,255,0.06)`;
        el.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: skill.color,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {skill.letter}
      </div>
      <span
        style={{
          color: "rgba(220, 235, 248, 0.92)",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.025em",
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}
