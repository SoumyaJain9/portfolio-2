import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function Home() {
  return (
    <main>
      <ScrollReveal direction="none">
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0}>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal direction="left" delay={0}>
        <SkillsSection />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0}>
        <ProjectsSection />
      </ScrollReveal>
    </main>
  );
}