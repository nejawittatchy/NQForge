import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Code, Zap, Shield, BarChart3, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EndpointsTable } from "@/components/api/endpoints-table";


export const metadata: Metadata = {
  title: "API Platform – Developer-First REST API",
  description: "Access NQ Forge tools via a scalable REST API. Rate limiting, analytics, versioned endpoints. Free tier with 500 requests/day.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nqforge.com";

const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for side projects and exploration",
    highlight: false,
    features: [
      "500 API requests / day",
      "All core endpoints",
      "JSON responses",
      "Basic rate limiting",
      "Community support",
    ],
    cta: "Get Started Free",
    href: "/auth/sign-up",
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For professionals and growing products",
    highlight: true,
    features: [
      "50,000 API requests / day",
      "Priority endpoints",
      "Webhook support",
      "Usage analytics dashboard",
      "Email support",
      "API key management",
    ],
    cta: "Start Pro Trial",
    href: "/auth/sign-up?plan=pro",
  },
  {
    name: "Business",
    price: "$49",
    period: "/month",
    description: "For teams and production workloads",
    highlight: false,
    features: [
      "Unlimited API requests",
      "All Pro features",
      "SLA guarantee",
      "Custom rate limits",
      "Dedicated support",
      "Invoice billing",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];



export default function ApiPlatformPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NQ Forge API",
    description: "Developer REST API for generating UUIDs, passwords, hashes, and more",
    url: `${siteUrl}/api-platform`,
    applicationCategory: "DeveloperApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section className="relative pt-24 pb-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/8 blur-[100px] rounded-full" />
          <div className="absolute inset-0 dot-bg opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="bg-brand/10 text-brand border-brand/20 mb-6 px-4 py-1.5 text-sm font-semibold">
            <Code className="w-3.5 h-3.5 mr-1.5" />
            REST API v1
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Developer-First API<br />
            <span className="brand-gradient-text">for Modern Teams</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Integrate NQ Forge utilities directly into your applications.
            Scalable, versioned, and lightning-fast REST API with generous free tier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-13 px-8 text-base brand-gradient text-white border-0 glow-brand rounded-xl" asChild>
              <Link href="/auth/sign-up">Get Free API Key <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-13 px-8 text-base rounded-xl" asChild>
              <a href="#endpoints">View Endpoints</a>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Endpoints", value: "15+" },
              { label: "Uptime", value: "99.9%" },
              { label: "Avg. Latency", value: "<50ms" },
              { label: "Free Requests/day", value: "500" },
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-2xl border border-border bg-card text-center">
                <p className="text-2xl font-extrabold brand-gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Built for Developers</h2>
            <p className="text-muted-foreground">Everything you need to integrate NQ Forge into your stack.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Instant Responses", desc: "Edge-deployed endpoints respond in under 50ms globally via Vercel's edge network." },
              { icon: Shield, title: "API Key Auth", desc: "Secure API key authentication. Rotate keys anytime from your dashboard." },
              { icon: BarChart3, title: "Usage Analytics", desc: "Real-time dashboard with per-endpoint usage, error rates, and response times." },
              { icon: Globe, title: "API Versioning", desc: "Stable, versioned endpoints. We never break your integration without a major version bump." },
              { icon: Code, title: "Multi-Language SDKs", desc: "curl, JavaScript, Python, and Go examples for every endpoint." },
              { icon: CheckCircle2, title: "Rate Limiting", desc: "Fair rate limits via Upstash Redis. Transparent headers show remaining quota." },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card hover:border-brand/20 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
                  <f.icon size={20} />
                </div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Available Endpoints</h2>
            <p className="text-muted-foreground">Production-ready REST endpoints for all NQ Forge tools.</p>
          </div>

          <EndpointsTable />

          <p className="text-center text-sm text-muted-foreground mt-6">
            All endpoints support CORS. Authentication via <code className="font-mono bg-muted px-1.5 py-0.5 rounded">X-API-Key</code> header.
          </p>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Quick Start</h2>
            <p className="text-muted-foreground">Up and running in 30 seconds.</p>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            <div className="flex items-center gap-2 px-5 py-3 bg-muted/60 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">bash</span>
            </div>
            <pre className="p-6 font-mono text-sm overflow-x-auto leading-relaxed text-foreground">
{`# Generate 5 UUIDs — no auth needed for free tier
curl "https://nqforge.com/api/v1/generate/uuid?count=5"

# Response
{
  "uuids": [
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    ...
  ],
  "version": "v4",
  "count": 5
}

# With API key for higher limits
curl "https://nqforge.com/api/v1/generate/password?length=32&symbols=true" \\
  -H "X-API-Key: nqf_your_api_key_here"`}
            </pre>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Simple Pricing</h2>
            <p className="text-muted-foreground">Start free. Scale as you grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.name} className={`rounded-2xl border p-8 flex flex-col relative ${tier.highlight ? "border-brand bg-brand/5 shadow-xl shadow-brand/10" : "border-border bg-card"}`}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="brand-gradient text-white border-0 px-4 py-1 shadow-lg">Most Popular</Badge>
                  </div>
                )}
                <h3 className="font-bold text-lg mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-extrabold">{tier.price}</span>
                  <span className="text-muted-foreground text-sm">{tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                <Separator className="mb-6" />
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full h-12 rounded-xl font-bold ${tier.highlight ? "brand-gradient text-white border-0 glow-brand-sm" : ""}`} variant={tier.highlight ? "default" : "outline"} asChild>
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
