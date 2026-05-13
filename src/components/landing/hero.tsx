"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, Code } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-brand/5 blur-[100px] animate-float" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-muted border border-brand/20 text-brand text-xs font-semibold mb-6"
          >
            <Zap className="w-3.5 h-3.5 fill-brand" />
            <span>Introducing NQ Forge v1.0</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Generate. Convert. <br />
            <span className="brand-gradient-text">Build Faster.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Modern utilities and scalable APIs for developers, creators, and businesses. 
            The all-in-one ecosystem for your daily digital tasks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-base font-semibold brand-gradient text-white border-0 glow-brand rounded-xl group" asChild>
              <Link href="/tools">
                Explore Tools
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-xl bg-background/50 backdrop-blur-sm" asChild>
              <Link href="/api-platform">
                <Code className="mr-2 w-4 h-4" />
                API Platform
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-20 pt-12 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-8 grayscale opacity-60"
          >
            <div className="flex items-center justify-center font-bold text-xl tracking-tighter italic">SUPABASE</div>
            <div className="flex items-center justify-center font-bold text-xl tracking-tighter">VERCEL</div>
            <div className="flex items-center justify-center font-bold text-xl tracking-tighter italic">STRIPE</div>
            <div className="flex items-center justify-center font-bold text-xl tracking-tighter">NEXT.JS</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
