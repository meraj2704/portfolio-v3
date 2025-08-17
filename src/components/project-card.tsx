import Link from "next/link"
import Image from "next/image"

import { Github } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ProjectCardProps {
  id: string; // Add id to props
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

export function ProjectCard({ id, title, description, imageUrl, demoUrl, githubUrl, technologies }: ProjectCardProps) {
  return (
    <Card className="bg-card border-border flex flex-col hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
      <Image
        src={imageUrl || "/placeholder.svg"}
        width={300}
        height={200}
        alt={`Screenshot of ${title}`}
        className="rounded-t-lg object-cover w-full h-48"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-muted text-muted-foreground">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 mt-auto"> {/* Use mt-auto to push buttons to the bottom */}
          <Link href={`/projects/${id}`}>
             <Button variant="outline" size="sm" className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground transition-colors">
               View Details
             </Button>
          </Link>
          {demoUrl && (
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent-primary">
                View Demo
              </Button>
            </Link>
          )}
          {githubUrl && (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent-primary">
                <Github className="h-4 w-4 mr-1" /> Code
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
