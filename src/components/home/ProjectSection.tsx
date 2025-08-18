import Link from "next/link";
import { Button } from "../ui/button";
import { ProjectCard } from "../project-card";
import { getAllProjectsData } from "../../lib/projects-data";

export function ProjectsSection() {
  const featuredProjects = getAllProjectsData().slice(0, 3);

  return (
    <section
      id="projects"
      className="w-full py-16 md:py-24 bg-card bg-opacity-50"
    >
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">
          Featured Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/projects">
            <Button className="relative overflow-hidden bg-gradient-to-r from-[#12f7d6] to-[#4f46e5] text-accent-primary-foreground hover:from-[#00e0c0] hover:to-[#3e35d1] transition-all duration-300 transform hover:scale-105">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
