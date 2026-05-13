import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowRight, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Sign Up – Create Your Free Account",
  description: "Create your free NQ Forge account. Access 15+ tools, API keys, and usage analytics.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel – brand */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-foreground text-background p-12 relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-10" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand/20 blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-brand/10 blur-[80px]" />
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 relative flex items-center justify-center">
            <div className="absolute inset-0 brand-gradient rounded-lg" />
            <Zap className="relative w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base text-background">NQ Forge</span>
            <span className="text-[9px] font-medium tracking-widest text-background/50 uppercase">by NOYEQ</span>
          </div>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold leading-tight mb-6">
            Generate. Convert.<br />
            <span className="brand-gradient-text">Build Faster.</span>
          </h2>
          <ul className="space-y-4 text-background/70 text-sm">
            {[
              "Access 15+ free utility tools",
              "500 API requests per day on free plan",
              "Save your tool history & favorites",
              "Manage API keys from your dashboard",
            ].map(item => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-background/30 relative z-10">© 2024 NOYEQ. All rights reserved.</p>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="absolute inset-0 brand-gradient rounded-lg" />
                <Zap className="relative w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-base">NQ Forge</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-muted-foreground text-sm mb-8">Free forever. No credit card required.</p>

          {/* OAuth */}
          <Button variant="outline" className="w-full h-11 rounded-xl mb-4 gap-3" disabled>
            <Github size={18} />
            Continue with GitHub
            <span className="ml-auto text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Soon</span>
          </Button>
          <Button variant="outline" className="w-full h-11 rounded-xl mb-6 gap-3" disabled>
            <Mail size={18} />
            Continue with Google
            <span className="ml-auto text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Soon</span>
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <Separator className="flex-1" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" className="h-11 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Min. 8 characters" className="h-11 rounded-xl" />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl brand-gradient text-white border-0 font-bold text-base mt-2">
              Create Account <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</Link>.
          </p>

          <p className="text-center text-sm mt-8">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="font-semibold text-brand hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
