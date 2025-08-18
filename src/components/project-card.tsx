import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRef } from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

export function ProjectCard({
  id,
  title,
  description,
  imageUrl,
  demoUrl,
  githubUrl,
  technologies,
}: ProjectCardProps) {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <motion.div
        whileHover={{
          y: -10,
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        <Card className="group relative bg-card border-border/50 flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-accent-primary hover:shadow-xl">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/90 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Image with parallax effect */}
          <motion.div
            className="overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              width={400}
              height={250}
              alt={`Screenshot of ${title}`}
              className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </motion.div>

          <CardHeader className="relative z-20">
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-20 flex-grow flex flex-col justify-end">
            {/* Technologies */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:bg-accent-primary/20 hover:text-accent-primary transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>

            {/* Buttons */}
            <div className="flex gap-2 mt-auto">
              <Link href={`/projects/${id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-accent-primary text-accent-primary hover:bg-accent-primary/10 hover:shadow-[0_0_15px_rgba(18,247,214,0.3)] transition-all group/details"
                >
                  Details
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/details:translate-x-1" />
                </Button>
              </Link>

              {demoUrl && (
                <Link
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground hover:text-accent-primary hover:bg-accent-primary/10 transition-colors group/demo"
                  >
                    <ExternalLink className="h-4 w-4 mr-1 transition-transform group-hover/demo:translate-x-0.5" />
                    Demo
                  </Button>
                </Link>
              )}

              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground hover:text-accent-primary hover:bg-accent-primary/10 transition-colors group/code"
                  >
                    <Github className="h-4 w-4 mr-1 transition-transform group-hover/code:rotate-12" />
                    Code
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
