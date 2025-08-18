"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Card, CardTitle } from "../ui/card";
import {
  Terminal,
  Layers,
  Server,
  Database,
  GitBranch,
  Code,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(18,247,214,0.4)" as const,
    borderColor: "hsl(var(--accent-primary))" as const,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const icons = [
    {
      icon: <Terminal className="h-8 w-8 text-accent-primary mb-2" />,
      title: "Node.js",
    },
    {
      icon: <Layers className="h-8 w-8 text-accent-primary mb-2" />,
      title: "React",
    },
    {
      icon: (
        <Image
          src="/nextjs-icon.svg"
          width={32}
          height={32}
          alt="Next.js"
          className="mb-2"
        />
      ),
      title: "Next.js",
    },
    {
      icon: <Server className="h-8 w-8 text-accent-primary mb-2" />,
      title: "Express.js",
    },
    {
      icon: (
        <Image
          src="/nestjs-icon.svg"
          width={32}
          height={32}
          alt="Nest.js"
          className="mb-2"
        />
      ),
      title: "Nest.js",
    },
    {
      icon: <Database className="h-8 w-8 text-accent-primary mb-2" />,
      title: "Databases",
    },
    {
      icon: <GitBranch className="h-8 w-8 text-accent-primary mb-2" />,
      title: "Git & GitHub",
    },
    {
      icon: <Code className="h-8 w-8 text-accent-primary mb-2" />,
      title: "TypeScript",
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="skills"
      className="w-full py-24 md:py-32 bg-background/50 overflow-hidden relative"
      style={{ opacity, scale }}
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-56 h-56 rounded-full bg-accent-primary/5 blur-xl"
          variants={floatingVariants}
          initial="animate"
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-accent-secondary/5 blur-xl"
          variants={floatingVariants}
          initial="animate"
          animate="animate"
          transition={{ delay: 1 }}
        />
      </motion.div>

      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative">
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
            Technical Skills
          </span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {icons.map((skill, index) => (
            <motion.div key={index} variants={item} custom={index}>
              <motion.div
                whileHover={hoverEffect}
                className="h-full"
                initial="hidden"
                animate="visible"
              >
                <Card className="bg-card border-border/50 text-center p-6 flex flex-col items-center justify-center h-full relative overflow-hidden group">
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Skill icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skill.icon}
                  </motion.div>

                  {/* Skill title */}
                  <CardTitle className="text-lg font-medium mt-2">
                    {skill.title}
                  </CardTitle>

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-lg border border-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
