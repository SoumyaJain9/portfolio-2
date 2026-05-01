"use client";

import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const skills = [
  { name: "Figma", icon: "✦", color: "#4a9ebb" },
  { name: "Prototyping", icon: "◈", color: "#d4b896" },
  { name: "User Research", icon: "◎", color: "#c8d8e8" },
  { name: "Interaction Design", icon: "⬡", color: "#4a9ebb" },
  { name: "Design Systems", icon: "▣", color: "#d4b896" },
  { name: "Wireframing", icon: "◻", color: "#c8d8e8" },
  { name: "Usability Testing", icon: "◉", color: "#4a9ebb" },
  { name: "Visual Design", icon: "✧", color: "#d4b896" },
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
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#d4b896] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="relative z-20 text-center pointer-events-none">
        <p className="text-[11px] tracking-[0.25em] uppercase text-[#4a9ebb] mb-3">Expertise</p>
        <h2 className="font-display italic text-white text-[64px] md:text-[80px] leading-none"
          style={{ textShadow: "0 0 60px rgba(74,158,187,0.2)" }}>
          What I bring
        </h2>
      </div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[8%] left-[8%]"><SkillCard skill={skills[0]} size="sm" /></FloatingElement>
        <FloatingElement depth={1.5} className="top-[12%] left-[35%]"><SkillCard skill={skills[1]} size="md" /></FloatingElement>
        <FloatingElement depth={2} className="top-[5%] left-[62%]"><SkillCard skill={skills[2]} size="lg" /></FloatingElement>
        <FloatingElement depth={1} className="top-[5%] left-[82%]"><SkillCard skill={skills[3]} size="sm" /></FloatingElement>
        <FloatingElement depth={2.5} className="top-[45%] left-[3%]"><SkillCard skill={skills[4]} size="md" /></FloatingElement>
        <FloatingElement depth={1} className="top-[72%] left-[20%]"><SkillCard skill={skills[5]} size="lg" /></FloatingElement>
        <FloatingElement depth={3} className="top-[68%] left-[55%]"><SkillCard skill={skills[6]} size="sm" /></FloatingElement>
        <FloatingElement depth={1.5} className="top-[75%] left-[78%]"><SkillCard skill={skills[7]} size="md" /></FloatingElement>
      </Floating>
    </section>
  );
}

function SkillCard({ skill, size }: { skill: { name: string; icon: string; color: string }; size: "sm" | "md" | "lg" }) {
  const widths = { sm: "120px", md: "160px", lg: "200px" };
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-sm"
      style={{
        width: widths[size],
        background: "rgba(6,13,20,0.85)",
        border: `1px solid ${skill.color}44`,
        boxShadow: `0 0 12px ${skill.color}22`,
      }}
    >
      <span style={{ color: skill.color }} className="text-sm">{skill.icon}</span>
      <span className="text-[#c8d8e8] text-[13px] font-light truncate">{skill.name}</span>
    </div>
  );
}