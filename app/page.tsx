import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function Home() {
  return (
    <main style={{
      height: "100vh",
      overflowY: "scroll",
      scrollSnapType: "y mandatory",
    }}>
      <div style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh", overflow: "hidden" }}>
        <ScrollReveal direction="none">
          <HeroSection />
        </ScrollReveal>
      </div>

      <div style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh", overflow: "hidden" }}>
        <ScrollReveal direction="up" delay={0}>
          <AboutSection />
        </ScrollReveal>
      </div>

      <div style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh", overflow: "hidden" }}>
        <ScrollReveal direction="left" delay={0}>
          <SkillsSection />
        </ScrollReveal>
      </div>

      <div style={{ scrollSnapAlign: "start", scrollSnapStop: "always", minHeight: "100vh", overflow: "auto" }}>
        <ScrollReveal direction="up" delay={0}>
          <ProjectsSection />
        </ScrollReveal>
      </div>
    </main>
  );
}