import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Sign In – Welcome Back",
  description: "Sign in to your NQ Forge account to access your dashboard, saved tools, and API keys.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 relative flex items-center justify-center">
              <div className="absolute inset-0 brand-gradient rounded-lg" />
              <Zap className="relative w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg">NQ Forge</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your account to continue</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* OAuth */}
          <Button variant="outline" className="w-full h-11 rounded-xl mb-3 gap-3" disabled>
            <Mail size={18} />
            Continue with GitHub
            <span className="ml-auto text-[10px] text-muted-foreground">Soon</span>
          </Button>
          <Button variant="outline" className="w-full h-11 rounded-xl mb-6 gap-3" disabled>
            <Mail size={18} />
            Continue with Google
            <span className="ml-auto text-[10px] text-muted-foreground">Soon</span>
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="h-11 rounded-xl" autoComplete="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-xs text-brand hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" className="h-11 rounded-xl" autoComplete="current-password" />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl brand-gradient text-white border-0 font-bold text-base">
              Sign In <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="font-semibold text-brand hover:underline">Create one free</Link>
        </p>
      </div>
    </div>
  );
}
