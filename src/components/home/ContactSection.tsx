import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mb-8">
          Have a project in mind or just want to say hello? Feel free to reach
          out!
        </p>
        <form className="grid gap-4 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Your Name"
            className="bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <Input
            type="email"
            placeholder="Your Email"
            className="bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <Textarea
            placeholder="Your Message"
            rows={5}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            className="bg-accent-primary hover:bg-accent-secondary text-accent-primary-foreground transition-colors"
          >
            Send Message
          </Button>
        </form>
        <div className="flex justify-center gap-6 mt-10">
          <Link
            href="mailto:john.doe@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-primary transition-colors"
          >
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-primary transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-primary transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
