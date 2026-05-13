"use client";

import * as React from "react";

import { motion } from "framer-motion";
import { CATEGORIES, ToolCategory } from "@/lib/tools";
import * as Icons from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Categories() {
  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tool Categories</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to boost your productivity and streamline your workflow.
            </p>
          </div>
          <Link href="/tools" className="text-brand font-medium flex items-center gap-1 hover:underline">
            View all tools <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(CATEGORIES).map(([key, cat], idx) => {
            // @ts-ignore
            const Icon = Icons[cat.icon as keyof typeof Icons] || Icons.HelpCircle;
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  href={`/tools?category=${key}`}
                  className="group block p-8 rounded-3xl border border-border bg-card hover:bg-accent hover:border-brand/20 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    {React.createElement(Icon as React.ElementType, { size: 120 })}
                  </div>
                  
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {React.createElement(Icon as React.ElementType, { size: 24 })}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">{cat.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
