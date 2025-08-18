'use client'
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { getAllProjectsData } from "@/src/lib/projects-data";
import { ProjectCard } from "../project-card";
import { Button } from "../ui/button";

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const featuredProjects = getAllProjectsData().slice(0, 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.8
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      className="w-full py-24 md:py-32 relative overflow-hidden bg-card bg-opacity-50"
      style={{ opacity, scale }}
    >
      {/* Floating background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-accent-primary/10 blur-xl"
          variants={floatingVariants}
          initial="animate"
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-accent-secondary/10 blur-xl"
          variants={floatingVariants}
          initial="animate"
          animate="animate"
          transition={{ delay: 1 }}
        />
      </motion.div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"
            variants={itemVariants}
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
              Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Selected works showcasing my expertise in full-stack development
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
        >
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              custom={index}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.4
          }}
        >
          <Link href="/projects">
            <Button className="relative overflow-hidden px-8 py-6 text-lg font-medium rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-background hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all group">
              <span className="relative z-10">View All Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-accent-primary/80 to-accent-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4 text-accent-primary" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}