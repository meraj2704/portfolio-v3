'use client'

import { useState, useMemo } from 'react'
import Link from "next/link"
import { Code } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectCard } from "@/components/project-card"
import { getAllProjectsData, allTechnologies } from "@/lib/projects-data"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const allProjects = getAllProjectsData();

  const filteredProjects = useMemo(() => {
    let projects = allProjects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (selectedTechnologies.length > 0) {
      projects = projects.filter(project =>
        selectedTechnologies.every(tech => project.technologies.includes(tech))
      )
    }

    return projects
  }, [searchTerm, selectedTechnologies])

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Code className="h-6 w-6 text-accent-primary" />
          <span className="text-lg font-semibold">DevPortfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/#about" className="text-sm font-medium hover:text-accent-primary transition-colors">
            About
          </Link>
          <Link href="/#skills" className="text-sm font-medium hover:text-accent-primary transition-colors">
            Skills
          </Link>
          <Link href="/projects" className="text-sm font-medium hover:text-accent-primary transition-colors">
            Projects
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-accent-primary transition-colors">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-12">All My Projects</h1>

          {/* Filter and Search Section */}
          <div className="mb-12 space-y-6">
            <Input
              type="text"
              placeholder="Search projects by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-xl mx-auto block bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
            <div className="flex flex-wrap justify-center gap-3">
              {allTechnologies.map(tech => (
                <Badge
                  key={tech}
                  variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
                    selectedTechnologies.includes(tech)
                      ? 'bg-accent-primary text-accent-primary-foreground hover:bg-accent-secondary'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  }`}
                  onClick={() => handleTechnologyToggle(tech)}
                >
                  {tech}
                </Badge>
              ))}
              {selectedTechnologies.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTechnologies([])}
                  className="text-muted-foreground hover:text-accent-primary"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground text-lg">
              No projects found matching your criteria.
            </div>
          )}
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} John Doe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/#about" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            About
          </Link>
          <Link href="/projects" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Projects
          </Link>
          <Link href="/#contact" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
