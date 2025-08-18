import { Project } from "@/src/lib/projects-data";
import { ProjectCard } from "../project-card";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return projects.length > 0 ? (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  ) : (
    <div className="text-center text-muted-foreground text-lg">
      No projects found matching your criteria.
    </div>
  );
}
