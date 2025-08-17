"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Code, Github, LinkIcon } from "lucide-react";

import React, { useState, useEffect, useCallback } from "react";
import { getProjectById } from "@/src/lib/projects-data";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

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
  const [count, setCount] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    setCurrent(api.selectedScrollSnap() + 1);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Code className="h-6 w-6 text-accent-primary" />
          <span className="text-lg font-semibold">DevPortfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/#about"
            className="text-sm font-medium hover:text-accent-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/#skills"
            className="text-sm font-medium hover:text-accent-primary transition-colors"
          >
            Skills
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium hover:text-accent-primary transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium hover:text-accent-primary transition-colors"
          >
            Contact
          </Link>
        </nav>
      </header>

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

          {/* Image Carousel */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {project.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Image
                          src={image || "/placeholder.svg"}
                          width={900}
                          height={600}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="rounded-lg object-cover w-full h-[300px] md:h-[450px] lg:h-[600px]"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                {/* Carousel Dots Indicator */}
                {count > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          index + 1 === current
                            ? "bg-accent-primary"
                            : "bg-muted-foreground hover:bg-foreground"
                        }`}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </Carousel>
            </div>
          )}

          {/* Thumbnail Gallery */}
          {project.images && project.images.length > 1 && (
            <div className="mb-12 max-w-4xl mx-auto grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {project.images.map((image, index) => (
                <button
                  key={`thumb-${index}`}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative block w-full aspect-video rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
                    index + 1 === current
                      ? "ring-2 ring-accent-primary ring-offset-2 ring-offset-background"
                      : "hover:opacity-75"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail for ${project.title} image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Project Details */}
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>

              <h2 className="text-2xl font-bold mt-8">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-muted text-muted-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="md:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold">Project Links</h2>
              <div className="flex flex-col gap-4">
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full relative overflow-hidden bg-gradient-to-r from-[#12f7d6] to-[#4f46e5] text-accent-primary-foreground hover:from-[#00e0c0] hover:to-[#3e35d1] transition-all duration-300 transform hover:scale-105">
                      <LinkIcon className="h-4 w-4 mr-2" /> View Live Demo
                    </Button>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground transition-colors transform hover:scale-105"
                    >
                      <Github className="h-4 w-4 mr-2" /> View GitHub Repo
                    </Button>
                  </Link>
                )}
              </div>

              {project.resources && project.resources.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mt-8">Resources</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {project.resources.map((resource, index) => (
                      <li key={index}>
                        <Link
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent-primary underline-offset-4 hover:underline"
                        >
                          {resource.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} John Doe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/#about"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
