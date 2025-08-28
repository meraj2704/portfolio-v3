"use client";

import { ProjectsFilter } from "@/components/projects/ProjectsFilter";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getAllProjectsData } from "@/lib/projects-data";
import { useState, useMemo } from "react";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const allProjects = getAllProjectsData();

  const filteredProjects = useMemo(() => {
    let projects = allProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedTechnologies.length > 0) {
      projects = projects.filter((project) =>
        selectedTechnologies.every((tech) =>
          project.technologies.includes(tech)
        )
      );
    }

    return projects;
  }, [searchTerm, selectedTechnologies, allProjects]);

  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          All My Projects
        </h1>

        <ProjectsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTechnologies={selectedTechnologies}
          setSelectedTechnologies={setSelectedTechnologies}
        />

        <ProjectsGrid projects={filteredProjects} />
      </div>
    </main>
  );
}
