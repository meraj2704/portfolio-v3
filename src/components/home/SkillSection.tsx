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

export function SkillsSection() {
  return (
    <section id="skills" className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">
          My Skills
        </h2>
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
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="Next.js logo"
              className="mb-2"
            />
            <CardTitle className="text-lg">Next.js</CardTitle>
          </Card>
          <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
            <Server className="h-8 w-8 text-accent-primary mb-2" />
            <CardTitle className="text-lg">Express.js</CardTitle>
          </Card>
          <Card className="bg-card border-border text-center p-4 flex flex-col items-center justify-center hover:shadow-[0_0_20px_rgba(18,247,214,0.5)] hover:border-accent-primary hover:scale-[1.02] transition-all duration-300">
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="Nest.js logo"
              className="mb-2"
            />
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
  );
}
