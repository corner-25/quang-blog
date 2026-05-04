import { Hero } from "@/components/hero";
import {
  AboutPreview,
  CTASection,
  EducationSection,
  ExperienceSection,
  PressSection,
  ProjectsPreview,
  ResearchPreview,
} from "@/components/home-sections";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <EducationSection />
      <ExperienceSection />
      <ProjectsPreview />
      <ResearchPreview />
      <PressSection />
      <CTASection />
    </>
  );
}
