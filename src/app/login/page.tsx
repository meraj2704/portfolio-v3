"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useAddData } from "@/src/hooks/useApi";
import { setCookie } from "cookies-next/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const login = useAddData(["login"], "/auth/login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
    };

    login.mutate(data, {
      onSuccess: (response) => {
        console.log("response", response);
        setCookie("portfolio-token", response?.data?.accessToken);
        toast({
          title: "Login Successful",
          description: "Redirecting to admin dashboard.",
          variant: "default",
        });
        router.push("/admin/dashboard");
      },
      onError: (error: any) => {
        toast({
          title: "Login Failed",
          description: error || "Please check your password.",
          variant: "destructive",
        });
      },
    });
    // if (result.success) {
    //   toast({
    //     title: "Login Successful",
    //     description: "Redirecting to admin dashboard.",
    //     variant: "default",
    //   });
    //   router.push("/admin/dashboard");
    // } else {
    //   toast({
    //     title: "Login Failed",
    //     description: result.error || "Please check your password.",
    //     variant: "destructive",
    //   });
    // }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-sm bg-card border-border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your password to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              className="w-full bg-accent-primary hover:bg-accent-secondary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
