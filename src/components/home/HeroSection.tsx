"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { TypingEffect } from "../typing-effect";
import { useState, useEffect, useRef } from "react";

const HTML_TAGS = [
  "<div>",
  "<section>",
  "<h1>",
  "<p>",
  "<button>",
  "<span>",
  "<a>",
  "<main>",
  "<header>",
  "<footer>",
  "<nav>",
  "<ul>",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  // Personal information
  const personalInfo = {
    name: "Meraj Hossain",
    title: "Full Stack Developer",
    specialties: [
      "Node.js",
      "React",
      "Next.js",
      "TypeScript",
      "Nest.js",
      "PostgreSql",
    ],
    currentRole: "Senior Developer at TechCorp",
    yearsExperience: "5+",
    location: "Dhaka, Bangladesh",
    email: "merajhossain15901@gmail.com",
    phone: "+8801684088348",
  };

  // Mouse position and tags state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tags, setTags] = useState<
    { id: string; x: number; y: number; tag: string }[]
  >([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        mass: 0.8,
      },
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

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);

    // Add new tag at mouse position
    if (tags.length < 8) {
      // Limit number of visible tags
      const newTag = {
        id: Math.random().toString(36).substring(2, 9),
        x: x + (Math.random() * 40 - 20), // Random offset
        y: y + (Math.random() * 40 - 20), // Random offset
        tag: HTML_TAGS[Math.floor(Math.random() * HTML_TAGS.length)],
      };
      setTags((prev) => [...prev, newTag]);
    }
  };

  useEffect(() => {
    // Remove oldest tag when we have too many
    const interval = setInterval(() => {
      if (tags.length > 0) {
        setTags((prev) => prev.slice(1));
      }
    }, 800); // Controls how long tags stay visible

    return () => clearInterval(interval);
  }, [tags]);

  const background = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(18,247,214,0.03) 0%, rgba(0,0,0,0) 60%)`;

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-background/90"
      onMouseMove={handleMouseMove}
      style={{ opacity, scale }}
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-accent-primary/5 blur-xl"
          variants={floatingVariants}
          initial="animate"
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent-secondary/10 blur-3xl"
          variants={floatingVariants}
          initial="animate"
          animate="animate"
          transition={{ delay: 1 }}
        />
      </motion.div>

      {/* HTML tags that appear and fade out */}
      <AnimatePresence>
        {tags.map(({ id, x, y, tag }) => (
          <motion.span
            key={id}
            initial={{
              x,
              y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 1.3,
              transition: { duration: 0.8 },
            }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none text-muted-foreground/40 font-mono text-sm"
            style={{
              left: x,
              top: y,
              zIndex: 10,
            }}
          >
            {tag}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Clean background with subtle texture */}
      <div className="absolute inset-0">
        {/* Very subtle noise texture */}
        <div className="absolute inset-0 opacity-[1%] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAxKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]" />

        {/* Subtle interactive light */}
        <motion.div
          style={{ background }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        />
      </div>

      {/* Content container */}
      <div className="container px-4 md:px-6 max-w-6xl space-y-8 z-20 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-4"
        >
          <motion.h1
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            variants={itemVariants}
          >
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                {personalInfo.name}
              </span>
            </span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground font-medium"
          >
            {personalInfo.title}
          </motion.h2>
        </motion.div>

        {/* Specialties with clean animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
        >
          {personalInfo.specialties.map((specialty, index) => (
            <motion.span
              key={specialty}
              custom={index}
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-background border border-border rounded-full text-sm font-medium hover:text-accent-primary transition-colors"
            >
              {specialty}
            </motion.span>
          ))}
        </motion.div>

        {/* Typing effect with clean presentation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mx-auto max-w-3xl relative"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            <TypingEffect
              text={`With ${personalInfo.yearsExperience} years of experience, I specialize in building scalable web applications and cloud-native solutions. Currently ${personalInfo.currentRole}, I bridge the gap between development and operations.`}
              speed={30}
              delay={500}
            />
            <span className="ml-1 inline-block w-2 h-6 bg-accent-primary animate-pulse rounded-full" />
          </p>
        </motion.div>

        {/* Clean action buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-10"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <Link href="/projects">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-medium rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-background hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all shadow-md"
              >
                View My Projects
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <Link href="#contact">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-medium rounded-xl border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/5 transition-colors"
              >
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Minimal contact info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 pt-12 text-sm text-muted-foreground"
        >
          <motion.a
            href={`mailto:${personalInfo.email}`}
            variants={itemVariants}
            className="hover:text-accent-primary transition-colors"
          >
            {personalInfo.email}
          </motion.a>
          <motion.span
            variants={itemVariants}
            className="hidden sm:inline-block"
          >
            •
          </motion.span>
          <motion.span variants={itemVariants}>
            {personalInfo.phone}
          </motion.span>
          <motion.span
            variants={itemVariants}
            className="hidden sm:inline-block"
          >
            •
          </motion.span>
          <motion.span variants={itemVariants}>
            {personalInfo.location}
          </motion.span>
        </motion.div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="animate-bounce w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-muted-foreground/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
