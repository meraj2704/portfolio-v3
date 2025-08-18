"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { TypingEffect } from "../typing-effect";
import { motion, useMotionValue, AnimatePresence, useMotionTemplate } from "framer-motion";
import { useState, useEffect } from "react";

const HTML_TAGS = [
  "<div>", "<section>", "<h1>", "<p>", 
  "<button>", "<span>", "<a>", "<main>",
  "<header>", "<footer>", "<nav>", "<ul>"
];

export function HeroSection() {
  // Personal information
  const personalInfo = {
    name: "Meraj Hossain",
    title: "Full Stack Developer & Cloud Engineer",
    specialties: [
      "Node.js", "React", "Next.js", 
      "TypeScript", "AWS", "Serverless"
    ],
    currentRole: "Senior Developer at TechCorp",
    yearsExperience: "5+",
    location: "Dhaka, Bangladesh",
    email: "meraj@example.com",
    phone: "+880 1XXX XXXXXX"
  };

  

  // Mouse position and tags state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tags, setTags] = useState<{id: string, x: number, y: number, tag: string}[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);

    // Add new tag at mouse position
    if (tags.length < 8) { // Limit number of visible tags
      const newTag = {
        id: Math.random().toString(36).substring(2, 9),
        x: x + (Math.random() * 40 - 20), // Random offset
        y: y + (Math.random() * 40 - 20), // Random offset
        tag: HTML_TAGS[Math.floor(Math.random() * HTML_TAGS.length)]
      };
      setTags(prev => [...prev, newTag]);
    }
  };

  useEffect(() => {
    // Remove oldest tag when we have too many
    const interval = setInterval(() => {
      if (tags.length > 0) {
        setTags(prev => prev.slice(1));
      }
    }, 800); // Controls how long tags stay visible

    return () => clearInterval(interval);
  }, [tags]);

  const background = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(18,247,214,0.03) 0%, rgba(0,0,0,0) 60%)`;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-background bg-opacity-90"
      onMouseMove={handleMouseMove}
    >
      {/* HTML tags that appear and fade out */}
      <AnimatePresence>
        {tags.map(({ id, x, y, tag }) => (
          <motion.span
            key={id}
            initial={{ 
              x,
              y,
              opacity: 1,
              scale: 1
            }}
            animate={{ 
              opacity: 0,
              scale: 1.3,
              transition: { duration: 0.8 }
            }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none text-muted-foreground/40 font-mono text-sm"
            style={{
              left: x,
              top: y,
              zIndex: 10
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
        {/* Name with clean animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                {personalInfo.name}
              </span>
            </span>
          </h1>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium"
          >
            {personalInfo.title}
          </motion.h2>
        </motion.div>

        {/* Specialties with clean animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
        >
          {personalInfo.specialties.map((specialty, index) => (
            <motion.span
              key={specialty}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              className="inline-block px-4 py-2 bg-background border border-border rounded-full text-sm font-medium hover:text-accent-primary transition-colors"
            >
              {specialty}
            </motion.span>
          ))}
        </motion.div>

        {/* Typing effect with clean presentation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: "backOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-10"
        >
          <Link href="/projects" className="flex justify-center">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-medium rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-background hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all shadow-md"
            >
              View My Projects
            </Button>
          </Link>

          <Link href="#contact" className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium rounded-xl border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/5 transition-colors"
            >
              Contact Me
            </Button>
          </Link>
        </motion.div>

        {/* Minimal contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 pt-12 text-sm text-muted-foreground"
        >
          <a href={`mailto:${personalInfo.email}`} className="hover:text-accent-primary transition-colors">
            {personalInfo.email}
          </a>
          <span className="hidden sm:inline-block">•</span>
          <span>{personalInfo.phone}</span>
          <span className="hidden sm:inline-block">•</span>
          <span>{personalInfo.location}</span>
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
    </section>
  );
}