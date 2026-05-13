"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOOLS, CATEGORIES, ToolCategory } from "@/lib/tools";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRight, Zap, Star } from "lucide-react";
import * as Icons from "lucide-react";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(search.toLowerCase()) || 
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <>
      <section className="pt-20 pb-24 border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore the Toolbox</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Discover a wide range of utility tools and APIs designed to simplify 
            your development workflow and boost productivity.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-brand transition-colors">
              <Search size={20} />
            </div>
            <Input 
              placeholder="Search tools (e.g. 'uuid', 'json', 'image')..." 
              className="h-14 pl-12 pr-4 text-lg rounded-2xl border-2 focus-visible:ring-brand shadow-sm bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-6 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                  <Filter size={14} />
                  <span>Categories</span>
                </div>
                
                <div className="flex flex-wrap lg:flex-col gap-2">
                  <Button 
                    variant={activeCategory === "all" ? "default" : "ghost"}
                    className={cn(
                      "justify-start rounded-xl h-10 px-4",
                      activeCategory === "all" ? "brand-gradient text-white border-0" : ""
                    )}
                    onClick={() => setActiveCategory("all")}
                  >
                    All Tools
                  </Button>
                  
                  {Object.entries(CATEGORIES).map(([key, cat]) => (
                    <Button 
                      key={key}
                      variant={activeCategory === key ? "default" : "ghost"}
                      className={cn(
                        "justify-start rounded-xl h-10 px-4",
                        activeCategory === key ? "brand-gradient text-white border-0" : ""
                      )}
                      onClick={() => setActiveCategory(key as ToolCategory)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-brand/5 border border-brand/10">
                  <h4 className="font-bold text-sm mb-3">Suggest a Tool</h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Can't find what you're looking for? Let us know!
                  </p>
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold rounded-lg">
                    Request Tool
                  </Button>
                </div>
              </div>
            </aside>

            {/* Tools Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {activeCategory === "all" ? "All Tools" : CATEGORIES[activeCategory as ToolCategory].label}
                  <Badge variant="secondary" className="ml-2 bg-muted text-muted-foreground">
                    {filteredTools.length}
                  </Badge>
                </h2>
                
                {search && (
                  <Button variant="ghost" size="sm" onClick={() => setSearch("")} className="text-xs">
                    Clear Search
                  </Button>
                )}
              </div>

              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool, i) => {
                      // @ts-ignore
                      const Icon = Icons[tool.icon as keyof typeof Icons] || Icons.HelpCircle;
                      
                      return (
                        <motion.div
                          key={tool.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link 
                            href={`/tools/${tool.slug}`}
                            className="group flex flex-col p-6 h-full rounded-2xl border border-border bg-card hover:bg-accent hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                                {React.createElement(Icon as React.ElementType, { size: 24 })}
                              </div>
                              <div className="flex gap-2">
                                {tool.trending && (
                                  <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 px-2 py-0 h-5 text-[10px] uppercase font-bold tracking-wider">
                                    Trending
                                  </Badge>
                                )}
                                {tool.isNew && (
                                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-2 py-0 h-5 text-[10px] uppercase font-bold tracking-wider">
                                    New
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-bold mb-2 group-hover:text-brand transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                              {tool.description}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                {tool.apiSupported ? (
                                  <div className="flex items-center gap-1 text-brand">
                                    <Icons.Code size={12} />
                                    <span>API Available</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <Icons.Globe size={12} />
                                    <span>Web Only</span>
                                  </div>
                                )}
                              </div>
                              <span className="text-xs font-bold text-brand group-hover:translate-x-1 transition-transform">
                                Use Tool →
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="py-24 text-center rounded-3xl border-2 border-dashed border-border">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No tools found</h3>
                  <p className="text-muted-foreground mb-8">
                    We couldn't find any tools matching "{search}".
                  </p>
                  <Button onClick={() => { setSearch(""); setActiveCategory("all"); }} variant="outline">
                    Browse All Tools
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AdSense placeholder - In-content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 h-32 flex items-center justify-center" aria-hidden="true">
          <span className="text-xs text-muted-foreground/30 font-mono">— space for advertisements —</span>
        </div>
      </div>
    </>
  );
}
