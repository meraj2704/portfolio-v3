"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getProjectById } from "@/src/lib/projects-data";
import { CarouselApi } from "@/src/components/ui/carousel";
import { Button } from "@/src/components/ui/button";
import { ProjectCarousel } from "@/src/components/projects/ProjectCarousel";
import { ProjectThumbnails } from "@/src/components/projects/ProjectThumbnail";
import { ProjectDetails } from "@/src/components/projects/ProjectDetails";
import { ProjectLinks } from "@/src/components/projects/ProjectLink";
import { ProjectResources } from "@/src/components/projects/ProjectResources";

interface ProjectDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const project = getProjectById(params.id);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <Button
          variant="outline"
          className="mb-8 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground transition-colors"
        >
          <Link href="/projects">← Back to Projects</Link>
        </Button>

        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
          {project.title}
        </h1>

        {project.images && project.images.length > 0 && (
          <>
            <ProjectCarousel images={project.images} title={project.title} />
            {project.images.length > 1 && (
              <ProjectThumbnails
                images={project.images}
                title={project.title}
                api={api}
                current={current}
              />
            )}
          </>
        )}

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <ProjectDetails
              longDescription={project.longDescription}
              technologies={project.technologies}
            />
          </div>

          <div className="md:col-span-1">
            <ProjectLinks
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
            <ProjectResources resources={project.resources} />
          </div>
        </div>
      </div>
    </main>
  );
}
