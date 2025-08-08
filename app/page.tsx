import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Code, Layers, Terminal, Server, Database, GitBranch } from 'lucide-react'
import { TypingEffect } from "@/components/typing-effect"
import { ProjectCard } from "@/components/project-card"
import { getAllProjectsData } from "@/lib/projects-data"

export default function Component() {
  const featuredProjects = getAllProjectsData().slice(0, 3);

  return (
    <div className="flex flex-col min-h-[100dvh]  text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Code className="h-6 w-6 text-accent-primary" />
          <span className="text-lg font-semibold">DevPortfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#about" className="text-sm font-medium hover:text-accent-primary transition-colors">
            About
          </Link>
          <Link href="#skills" className="text-sm font-medium hover:text-accent-primary transition-colors">
            Skills
          </Link>
          <Link href="/projects" className="text-sm font-medium hover:text-accent-primary transition-colors">
            Projects
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-accent-primary transition-colors"> {/* New link */}
            Services
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-accent-primary transition-colors">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative w-full py-24 md:py-32 lg:py-40 flex items-center justify-center text-center overflow-hidden bg-background bg-opacity-50"
        >
          <div className="container px-4 md:px-6 max-w-3xl space-y-6 z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-fade-in-up">
              Hi, I'm <span className="text-accent-primary">John Doe</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <TypingEffect
                text="I build high-performance web applications and APIs using Node.js, React, Next.js, Express, and Nest.js, delivering exceptional user experiences."
                speed={50}
                delay={500}
              />
            </p>
            <div className="space-x-4 pt-4 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Link href="/projects">
                <Button 
                  className="relative overflow-hidden bg-gradient-to-r from-[#12f7d6] to-[#4f46e5] text-accent-primary-foreground hover:from-[#00e0c0] hover:to-[#3e35d1] transition-all duration-300 transform hover:scale-105"
                >
                  View All Projects
                </Button>
              </Link>
              <Link href="#contact">
                <Button 
                  variant="outline" 
                  className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground transition-colors transform hover:scale-105"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-16 md:py-24 bg-card bg-opacity-50">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                width={400}
                height={400}
                alt="Professional developer headshot"
                className="mx-auto rounded-lg object-cover aspect-square border border-border shadow-lg"
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  As a dedicated Node.js developer, I specialize in building efficient and high-performing backend systems. My expertise spans across various frameworks, including React, Next.js for frontend, and Express, Nest.js for robust backend solutions. I thrive on solving complex problems and delivering clean, maintainable code.
                </p>
                <p>
                  I am constantly exploring new technologies and best practices to stay at the forefront of web development. My goal is to create seamless digital experiences that are both powerful and intuitive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">My Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
                <Terminal className="h-8 w-8 text-accent-primary mb-2" />
                <CardTitle className="text-lg">Node.js</CardTitle>
              </Card>
              <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
                <Layers className="h-8 w-8 text-accent-primary mb-2" />
                <CardTitle className="text-lg">React</CardTitle>
              </Card>
              <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
                <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="Next.js logo" className="mb-2" />
                <CardTitle className="text-lg">Next.js</CardTitle>
              </Card>
              <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
                <Server className="h-8 w-8 text-accent-primary mb-2" />
                <CardTitle className="text-lg">Express.js</CardTitle>
              </Card>
              <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
                <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="Nest.js logo" className="mb-2" />
                <CardTitle className="text-lg">Nest.js</CardTitle>
              </Card>
              <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
                <Database className="h-8 w-8 text-accent-primary mb-2" />
                <CardTitle className="text-lg">Databases (SQL/NoSQL)</CardTitle>
              </Card>
              <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
                <GitBranch className="h-8 w-8 text-accent-primary mb-2" />
                <CardTitle className="text-lg">Git & GitHub</CardTitle>
              </Card>
              <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
                <Code className="h-8 w-8 text-accent-primary mb-2" />
                <CardTitle className="text-lg">TypeScript</CardTitle>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-16 md:py-24 bg-card bg-opacity-50">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">Featured Projects</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/projects">
                <Button 
                  className="relative overflow-hidden bg-gradient-to-r from-[#12f7d6] to-[#4f46e5] text-accent-primary-foreground hover:from-[#00e0c0] hover:to-[#3e35d1] transition-all duration-300 transform hover:scale-105"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8">Get in Touch</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mb-8">
              Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
            <form className="grid gap-4 max-w-md mx-auto">
              <Input type="text" placeholder="Your Name" className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
              <Input type="email" placeholder="Your Email" className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
              <Textarea placeholder="Your Message" rows={5} className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
              <Button type="submit" className="bg-accent-primary hover:bg-accent-secondary text-accent-primary-foreground transition-colors">Send Message</Button>
            </form>
            <div className="flex justify-center gap-6 mt-10">
              <Link href="mailto:john.doe@example.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-primary transition-colors">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
              <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-primary transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-primary transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} John Doe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/#about" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            About
          </Link>
          <Link href="/projects" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Projects
          </Link>
          <Link href="/services" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Services
          </Link>
          <Link href="/#contact" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
