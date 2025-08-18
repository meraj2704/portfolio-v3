'use client'
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

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
        stiffness: 100
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.85, opacity: 0, rotate: -3 },
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
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  const techVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.05,
        type: "spring",
        stiffness: 300
      }
    }),
    hover: {
      y: -3,
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: { 
        y: { type: "spring", stiffness: 400 },
        backgroundColor: { duration: 0.2 }
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      className="w-full py-20 md:py-28 bg-card bg-opacity-70 overflow-hidden relative"
      style={{ opacity, scale }}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary/10 blur-xl" />
      </motion.div>

      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="relative group"
          >
            <Image
              src="/placeholder.svg?height=500&width=500"
              width={500}
              height={500}
              alt="Professional developer headshot"
              className="mx-auto rounded-2xl object-cover aspect-square border-2 border-border/50 shadow-2xl"
              priority
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
          
          <div className="space-y-6">
            <motion.h2 
              className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Crafting Digital Excellence
            </motion.h2>
            
            <motion.div className="space-y-5 text-muted-foreground">
              <motion.p variants={itemVariants} className="text-lg leading-relaxed">
                As a passionate <span className="font-medium text-foreground">Node.js specialist</span>, I architect 
                high-performance backend systems with meticulous attention to detail. 
                My full-stack expertise spans modern frameworks like React, Next.js, 
                and the robust ecosystem of Express and Nest.js.
              </motion.p>
              
              <motion.p variants={itemVariants} className="text-lg leading-relaxed">
                I don't just write code—I <span className="font-medium text-foreground">solve complex challenges</span> 
                through clean, maintainable solutions. Continuously exploring emerging 
                technologies, I bridge innovation with practical implementation to 
                deliver seamless digital experiences.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="pt-6"
            >
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">CORE TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-3">
                {["Node.js", "TypeScript", "React", "Next.js", "Nest.js", "AWS", "GraphQL", "Docker"].map((tech, i) => (
                  <motion.span
                    key={tech}
                    custom={i}
                    variants={techVariants}
                    whileHover="hover"
                    className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}