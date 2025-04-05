// app/(auth)/register/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Github, Telescope } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Telescope className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">Join Nexus</h1>
          <p className="mt-2 text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full gap-2">
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Github className="h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input placeholder="First name" className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Input placeholder="Last name" className="bg-muted/50" />
            </div>
          </div>
          <div className="space-y-2">
            <Input type="email" placeholder="Email" className="bg-muted/50" />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              className="bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              className="bg-muted/50"
            />
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
