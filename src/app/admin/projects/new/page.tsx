"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAddData } from "@/hooks/useApi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Technology {
  id: number;
  name: string;
}

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    overview: "",
    description: "",
    liveDemo: "",
    githubLink: "",
    featured: false,
    status: "DRAFT" as const,
    startDate: "",
    endDate: "",
    technologyIds: "",
    images: [] as File[],
  });

  // Use the add mutation hook
  const addMutation = useAddData(["projects"], "/api/projects");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files!),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          // Handle file uploads separately
          formData.images.forEach((file) => {
            formDataToSend.append("images", file);
          });
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      await addMutation.mutateAsync(formDataToSend);

      toast.success("Project Created", {
        description: "The project has been successfully created.",
      });

      router.push("/admin/projects");
      router.refresh();
    } catch (error: any) {
      toast.error("Error", {
        description:
          error.message || "Failed to create project. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <Button
          variant="outline"
          className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground"
        >
          <Link href="/admin/projects">← Back to Projects</Link>
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug (URL-friendly name)</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="overview">Short Overview</Label>
              <Textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                required
                rows={3}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={7}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="images">Project Images</Label>
              <Input
                id="images"
                name="images"
                type="file"
                multiple
                onChange={handleFileChange}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="liveDemo">Live Demo URL (Optional)</Label>
              <Input
                id="liveDemo"
                name="liveDemo"
                type="url"
                value={formData.liveDemo}
                onChange={handleInputChange}
                placeholder="https://livedemo.com"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="githubLink">GitHub URL (Optional)</Label>
              <Input
                id="githubLink"
                name="githubLink"
                type="url"
                value={formData.githubLink}
                onChange={handleInputChange}
                placeholder="https://github.com/my-repo"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="technologyIds">
                Technology IDs (comma-separated)
              </Label>
              <Input
                id="technologyIds"
                name="technologyIds"
                value={formData.technologyIds}
                onChange={handleInputChange}
                placeholder="1, 2, 3"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="bg-input border-border text-foreground p-2 rounded-md"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="featured">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                Featured Project
              </Label>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date (Optional)</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent-primary hover:bg-accent-secondary"
              disabled={addMutation.isPending}
            >
              {addMutation.isPending ? "Adding Project..." : "Add Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
