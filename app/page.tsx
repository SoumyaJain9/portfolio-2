import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function Home() {
  return (
    <main>
      {/* Hero fades in instantly — no delay */}
      <ScrollReveal direction="none">
        <HeroSection />
      </ScrollReveal>

      {/* About slides up as you scroll to it */}
      <ScrollReveal direction="up" delay={0}>
        <AboutSection />
      </ScrollReveal>

      {/* Skills slides in from left */}
      <ScrollReveal direction="left" delay={0}>
        <SkillsSection />
      </ScrollReveal>

      {/* Projects slides up */}
      <ScrollReveal direction="up" delay={0}>
        <ProjectsSection />
      </ScrollReveal>
    </main>
  );
}
