"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-medium">Join in seconds</h2>
        <p className="text-muted-foreground">Get started with just 3 fields</p>
      </div>

      <form className="space-y-4">
        <Input
          placeholder="Username"
          className="border-border rounded-3xl"
          autoComplete="username"
          required
        />

        <Input
          type="email"
          placeholder="Email or mobile number"
          className="border-border rounded-3xl"
          autoComplete="email"
          required
        />

        <Input
          type="password"
          placeholder="Password"
          className="border-border rounded-3xl"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <Button type="submit" className="w-full rounded-3xl">
          Sign Up
        </Button>
      </form>

      <Separator className="my-4" />

      <div className="space-y-3">
        <Button variant="outline" className="w-full gap-2 rounded-3xl">
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full gap-2 rounded-3xl">
          <Github className="h-4 w-4" />
          Continue with GitHub
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground hover:underline"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
