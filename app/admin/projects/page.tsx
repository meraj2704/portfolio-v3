'use client'

import { useTransition, useState } from 'react'
import Link from 'next/link'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast'
import { getAllProjectsData } from '@/lib/projects-data'
import { deleteProject } from './actions'

export default function AdminProjectsPage() {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const projects = getAllProjectsData(); // Get current in-memory projects

  const handleDelete = async (projectId: string) => {
    startTransition(async () => {
      await deleteProject(projectId)
      toast({
        title: 'Project Deleted',
        description: 'The project has been successfully removed.',
        variant: 'destructive',
      })
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link href="/admin/projects/new">
          <Button className="bg-accent-primary hover:bg-accent-secondary">
            <PlusCircle className="h-4 w-4 mr-2" /> Add New Project
          </Button>
        </Link>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No projects found. Add your first project!</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead className="w-[150px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map(tech => (
                            <Badge key={tech} variant="outline" className="text-muted-foreground">{tech}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Button variant="outline" size="icon" className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-card border-border text-foreground">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground">
                                  This action cannot be undone. This will permanently delete your
                                  project "{project.title}" from the in-memory data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-border text-foreground hover:bg-muted">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(project.id)}
                                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                  disabled={isPending}
                                >
                                  {isPending ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
