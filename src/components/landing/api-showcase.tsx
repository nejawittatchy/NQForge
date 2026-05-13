"use client";

import { motion } from "framer-motion";
import { Code, Terminal, Zap, Globe, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CODE_SAMPLES = {
  curl: `curl -X GET "https://api.nqforge.com/v1/generate/uuid" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  javascript: `const response = await fetch('https://api.nqforge.com/v1/generate/uuid', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const { uuid } = await response.json();`,
  python: `import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("https://api.nqforge.com/v1/generate/uuid", headers=headers)
data = response.json()
print(data['uuid'])`
};

export function ApiShowcase() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 -z-10 dot-bg opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold mb-6">
              <Code className="w-3.5 h-3.5" />
              <span>Developer First Platform</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Powerful APIs for <br />
              <span className="shimmer-text">Modern Developers.</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Integrate NQ Forge utilities directly into your applications with our 
              high-performance, globally distributed API. Fast, secure, and reliable.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                { icon: Zap, text: "Ultra-fast response times (< 50ms)" },
                { icon: Globe, text: "Edge-cached globally" },
                { icon: Shield, text: "Enterprise-grade rate limiting" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                    <item.icon size={14} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4">
              <Button asChild className="brand-gradient border-0 text-white font-semibold rounded-xl">
                <Link href="/api-platform">Get API Key</Link>
              </Button>
              <Button variant="ghost" asChild className="font-semibold">
                <Link href="/api-platform">View Documentation</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 brand-gradient opacity-10 blur-3xl rounded-[2rem]" />
            <div className="relative glass-card border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
                <div className="ml-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Terminal size={12} />
                  <span>api-v1-uuid.sh</span>
                </div>
              </div>
              
              <Tabs defaultValue="curl" className="w-full">
                <div className="px-4 py-2 border-b border-border/50 bg-muted/20">
                  <TabsList className="bg-transparent h-8 p-0 gap-4">
                    <TabsTrigger value="curl" className="data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none h-full border-b-2 border-transparent data-[state=active]:border-brand rounded-none px-0 text-xs font-semibold">cURL</TabsTrigger>
                    <TabsTrigger value="javascript" className="data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none h-full border-b-2 border-transparent data-[state=active]:border-brand rounded-none px-0 text-xs font-semibold">JavaScript</TabsTrigger>
                    <TabsTrigger value="python" className="data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none h-full border-b-2 border-transparent data-[state=active]:border-brand rounded-none px-0 text-xs font-semibold">Python</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="curl" className="mt-0">
                  <pre className="p-6 text-sm font-mono text-foreground/90 overflow-x-auto">
                    <code>{CODE_SAMPLES.curl}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="javascript" className="mt-0">
                  <pre className="p-6 text-sm font-mono text-foreground/90 overflow-x-auto">
                    <code>{CODE_SAMPLES.javascript}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="python" className="mt-0">
                  <pre className="p-6 text-sm font-mono text-foreground/90 overflow-x-auto">
                    <code>{CODE_SAMPLES.python}</code>
                  </pre>
                </TabsContent>
              </Tabs>
              
              <div className="p-4 bg-brand/5 border-t border-brand/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">System Live</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">Response: 200 OK</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
