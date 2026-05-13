import { Hero } from "@/components/landing/hero";
import { Categories } from "@/components/landing/categories";
import { ApiShowcase } from "@/components/landing/api-showcase";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Cloud, Layers, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      
      {/* Categories Section */}
      <Categories />
      
      {/* Features / Why Choose Us */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Performance</h2>
            <p className="text-muted-foreground text-lg">
              NQ Forge is engineered with the latest technologies to ensure maximum speed, 
              reliability, and ease of use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Ultra-Fast Execution",
                desc: "Every tool is optimized for near-instant results, powered by Vercel Edge Functions."
              },
              {
                icon: ShieldCheck,
                title: "Privacy First",
                desc: "We don't store your sensitive data. Processing happens locally or in secure serverless environments."
              },
              {
                icon: BarChart3,
                title: "Usage Analytics",
                desc: "Detailed insights into your tool usage and API requests via our unified dashboard."
              },
              {
                icon: Cloud,
                title: "Serverless Scale",
                desc: "Our architecture scales automatically to handle millions of requests without breaking a sweat."
              },
              {
                icon: Layers,
                title: "Modular Design",
                desc: "New tools are added weekly. Our modular system allows for rapid expansion and updates."
              },
              {
                icon: ArrowRight,
                title: "Future Ready",
                desc: "Built with Next.js 15, Tailwind CSS 4, and Supabase for a future-proof foundation."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-brand/5 text-brand flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Showcase */}
      <ApiShowcase />

      {/* Testimonials Mockup / CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-[0.02] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass-card rounded-[2.5rem] border border-border p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={200} className="text-brand" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
              Ready to supercharge <br /> your productivity?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of developers and creators using NQ Forge to build 
              better and faster. Start for free today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-10 text-base font-semibold brand-gradient text-white border-0 glow-brand rounded-xl" asChild>
                <Link href="/auth/sign-up">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold rounded-xl" asChild>
                <Link href="/tools">View All Tools</Link>
              </Button>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
              <div className="text-sm font-bold tracking-widest uppercase">Loved by teams at</div>
              <div className="font-bold text-xl">ACME CORP</div>
              <div className="font-bold text-xl italic">GLOBEX</div>
              <div className="font-bold text-xl">SAYANIC</div>
              <div className="font-bold text-xl tracking-tighter">INITECH</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about NQ Forge.</p>
        </div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          {[
            {
              q: "Is NQ Forge free to use?",
              a: "Yes! Most of our tools are completely free for personal use. We also offer a pro tier for advanced features and higher API limits."
            },
            {
              q: "How secure is the data I process?",
              a: "We take privacy very seriously. Most processing happens directly in your browser. For server-side tools, we use transient processing and never store your input data unless you explicitly save it."
            },
            {
              q: "Can I use the API for commercial projects?",
              a: "Absolutely. Our API is designed for high-availability production environments. Check our API documentation for licensing details."
            },
            {
              q: "Do you offer custom tool development?",
              a: "If there's a utility you need that we don't have, feel free to suggest it via our feedback form! We're always looking to expand our ecosystem."
            }
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-2">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

