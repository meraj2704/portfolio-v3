"use client";

import { useActionState } from "react";
import Link from "next/link";
import { LucideIcons } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createService } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminNewServicePage() {
  const [state, formAction, isPending] = useActionState(createService, null);

  if (state?.success === false) {
    toast.error(state.error || "Something went wrong.");
  }

  const iconNames = Object.keys(LucideIcons); // Get available icon names

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Service</h1>
        <Button
          variant="outline"
          className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground"
        >
          <Link href="/admin/services">← Back to Services</Link>
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                name="title"
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                required
                rows={3}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longDescription">Full Description</Label>
              <Textarea
                id="longDescription"
                name="longDescription"
                required
                rows={7}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">
                Icon Name (from Lucide React, e.g., "Server", "Layers")
              </Label>
              <Input
                id="icon"
                name="icon"
                placeholder="Server"
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                list="icon-suggestions"
              />
              <datalist id="icon-suggestions">
                {iconNames.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
              <p className="text-sm text-muted-foreground">
                Choose an icon from{" "}
                <Link
                  href="https://lucide.dev/icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent-primary"
                >
                  Lucide React
                </Link>{" "}
                (use PascalCase name, e.g., "Server", "Layers").
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-accent-primary hover:bg-accent-secondary"
              disabled={isPending}
            >
              {isPending ? "Adding Service..." : "Add Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
