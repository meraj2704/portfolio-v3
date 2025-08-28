// File: /src/app/technologies/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAddData, useDeleteData, useFetchData } from "@/hooks/useApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Technology } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Form validation schema
const technologyFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional(),
  category: z.string().optional(),
});

type TechnologyFormValues = z.infer<typeof technologyFormSchema>;

export default function TechnologiesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch technologies
  const {
    data: technologies = [],
    isLoading,
    error,
  } = useFetchData<Technology[]>(["technologies"], "/api/technologies");

  // Add technology mutation
  const addMutation = useAddData(["technologies"], "/api/technologies");

  // Delete technology mutation
  const deleteMutation = useDeleteData(["technologies"], "/api/technologies");

  // Initialize form
  const form = useForm<TechnologyFormValues>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: {
      name: "",
      icon: "",
      category: "",
    },
  });

  const onSubmit = async (data: TechnologyFormValues) => {
    try {
      await addMutation.mutateAsync(data);
      form.reset();
      setIsDialogOpen(false);
      toast("Technology created successfully");
    } catch (error: any) {
      toast(error.message || "Failed to create technology");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this technology?")) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id.toString());
      toast.success("Technology created successfully");
    } catch (error: any) {
      toast(error.message || "Failed to delete technology");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              {/* Error loading technologies: {error.message} */}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Technologies</h1>
          <p className="text-muted-foreground mt-2">
            Manage your technologies stack
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Technology
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Technology</DialogTitle>
              <DialogDescription>
                Add a new technology to your stack.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., React, Node.js" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ⚛️, 🟢" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Frontend, Backend"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={addMutation.isPending}>
                    {addMutation.isPending && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Add Technology
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : technologies.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No technologies found.
              </p>
              <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Technology
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <Card
              key={tech.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {tech.icon && <span className="text-2xl">{tech.icon}</span>}
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(tech.id)}
                    disabled={deleteMutation.isPending}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {deleteMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 text-destructive" />
                    )}
                  </Button>
                </div>
                <CardDescription>
                  {/* {tech?.Project?.length || 0} projects */}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tech.category && (
                  <Badge variant="secondary" className="mb-3">
                    {tech.category}
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(tech.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
