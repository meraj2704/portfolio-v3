'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { createProject } from '../actions'

export default function AdminNewProjectPage() {
  const [state, formAction, isPending] = useActionState(createProject, null)
  const { toast } = useToast()

  // Display toast messages based on action state
  // This useEffect will run when `state` changes
  // You might want to clear the form after success, but redirect handles it here.
  if (state?.success === false) {
    toast({
      title: 'Error Creating Project',
      description: state.error || 'Something went wrong.',
      variant: 'destructive',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <Button variant="outline" className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground">
          <Link href="/admin/projects">← Back to Projects</Link>
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" name="title" required className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea id="description" name="description" required rows={3} className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longDescription">Full Description</Label>
              <Textarea id="longDescription" name="longDescription" required rows={7} className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Thumbnail Image URL</Label>
              <Input id="imageUrl" name="imageUrl" type="url" placeholder="/placeholder.svg" required className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="images">Carousel Image URLs (comma-separated)</Label>
              <Textarea id="images" name="images" placeholder="/image1.png, /image2.png" rows={4} className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="demoUrl">Live Demo URL (Optional)</Label>
              <Input id="demoUrl" name="demoUrl" type="url" placeholder="https://livedemo.com" className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
              <Input id="githubUrl" name="githubUrl" type="url" placeholder="https://github.com/my-repo" className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input id="technologies" name="technologies" placeholder="Next.js, React, Tailwind CSS" required className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resources">Resources (JSON format: `{"{"}name: "Doc", url: "url"{"}"}`) (Optional)</Label>
              <Textarea id="resources" name="resources" placeholder='[{"name": "Vercel", "url": "https://vercel.com"}]' rows={4} className="bg-input border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <Button type="submit" className="w-full bg-accent-primary hover:bg-accent-secondary" disabled={isPending}>
              {isPending ? 'Adding Project...' : 'Add Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
