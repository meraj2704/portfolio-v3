import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { AboutSection } from "../components/home/AboutSection";
import { SkillsSection } from "../components/home/SkillSection";
import { ProjectsSection } from "../components/home/ProjectSection";
import { ContactSection } from "../components/home/ContactSection";

export default function page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
