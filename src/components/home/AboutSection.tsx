'use client'
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Server, Cpu, Database, Cloud, GitBranch } from "lucide-react";

const techIcons: Record<string, JSX.Element> = {
  "Node.js": <Code className="h-4 w-4" />,
  "TypeScript": <Code className="h-4 w-4" />,
  "React": <Cpu className="h-4 w-4" />,
  "Next.js": <Server className="h-4 w-4" />,
  "Nest.js": <Server className="h-4 w-4" />,
  "AWS": <Cloud className="h-4 w-4" />,
  "GraphQL": <Database className="h-4 w-4" />,
  "Docker": <Database className="h-4 w-4" />
};

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

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

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0, rotate: -2 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.5
      }
    },
    hover: {
      scale: 1.02,
      transition: { 
        type: "spring", 
        stiffness: 200,
        damping: 10
      }
    }
  };

  const techVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.07,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }),
    hover: {
      y: -4,
      scale: 1.05,
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
      boxShadow: "0 8px 20px -5px rgba(18,247,214,0.3)",
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      className="w-full py-24 md:py-32 bg-card/50 overflow-hidden relative"
      style={{ opacity, scale }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
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
          className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-primary/10 blur-xl"
          variants={floatingVariants}
          initial="animate"
          animate="animate"
          transition={{ delay: 1 }}
        />
      </motion.div>

      <div className="container px-4 md:px-6 max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with interactive effects */}
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="relative group"
          >
            <div className="absolute inset-0 rounded-3xl border-2 border-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-accent-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Image
              src="/professional-headshot.jpg"
              width={600}
              height={600}
              alt="Professional developer headshot"
              className="mx-auto rounded-3xl object-cover aspect-square border-2 border-border/50 shadow-2xl z-10 relative"
              priority
            />

            {/* Floating tech badges */}
            <AnimatePresence>
              {hoveredTech && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-4 -right-4 bg-background border border-border/50 rounded-full px-4 py-2 shadow-lg z-20 flex items-center gap-2"
                >
                  {techIcons[hoveredTech]}
                  <span className="text-sm font-medium">{hoveredTech}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Content */}
          <div className="space-y-8">
            <motion.h2 
              className="text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-foreground to-foreground/90 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Engineering <span className="text-accent-primary">Digital</span> Solutions
            </motion.h2>
            
            <div className="space-y-6 text-muted-foreground">
              <motion.p variants={itemVariants} className="text-lg leading-relaxed">
                As a <span className="font-semibold text-foreground">Full Stack Architect</span>, I specialize in building 
                performant, scalable applications using modern JavaScript ecosystems. 
                With expertise across the entire stack, I bridge the gap between 
                innovative design and robust engineering.
              </motion.p>
              
              <motion.p variants={itemVariants} className="text-lg leading-relaxed">
                My approach combines <span className="font-semibold text-foreground">technical excellence</span> with 
                product-focused thinking. I don't just write code—I craft solutions 
                that drive business value while maintaining exceptional user experiences.
              </motion.p>
            </div>

            {/* Technologies */}
            <motion.div 
              variants={itemVariants}
              className="pt-2"
            >
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Core Technology Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {Object.keys(techIcons).map((tech, i) => (
                  <motion.button
                    key={tech}
                    custom={i}
                    variants={techVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredTech(tech)}
                    onHoverEnd={() => setHoveredTech(null)}
                    className="px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full text-sm font-medium flex items-center gap-2 hover:z-10"
                  >
                    {techIcons[tech]}
                    {tech}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}