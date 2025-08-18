"use client";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export function ContactSection() {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async () => {
    await controls.start({
      y: -10,
      transition: { type: "spring", stiffness: 300 },
    });
    reset();
    setTimeout(() => controls.start({ y: 0 }), 1000);
  };

  const socialLinks = [
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:meraj@example.com",
      label: "Email",
    },
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/meraj",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/in/meraj",
      label: "LinkedIn",
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="w-full py-20 md:py-28 relative overflow-hidden "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-accent-primary/10 blur-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent-secondary/10 blur-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </div>

      <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
        <motion.div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
              Connect
            </span>
          </motion.h2>
          <motion.p
            className="mx-auto max-w-[600px] text-muted-foreground md:text-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind or just want to say hello? I'd love to hear
            from you!
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Input
              {...register("name")}
              type="text"
              placeholder="Your Name"
              className="bg-background border-border/50 h-12 px-4 text-foreground placeholder:text-muted-foreground hover:border-accent-primary/50 focus:border-accent-primary transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Input
              {...register("email")}
              type="email"
              placeholder="Your Email"
              className="bg-background border-border/50 h-12 px-4 text-foreground placeholder:text-muted-foreground hover:border-accent-primary/50 focus:border-accent-primary transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Textarea
              {...register("message")}
              placeholder="Your Message"
              rows={5}
              className="bg-background border-border/50 px-4 py-3 text-foreground placeholder:text-muted-foreground hover:border-accent-primary/50 focus:border-accent-primary transition-all"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-accent-primary to-accent-secondary text-background hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all group relative overflow-hidden"
            animate={controls}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              Send Message
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent-primary/80 to-accent-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.form>

        <motion.div
          className="flex justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-12 w-12 rounded-full bg-background border border-border/50 text-muted-foreground hover:text-accent-primary hover:border-accent-primary/50 hover:shadow-[0_0_15px_rgba(18,247,214,0.2)] transition-all"
              >
                {link.icon}
                <span className="sr-only">{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
