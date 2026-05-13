import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard, Zap, Clock, Star, Code, Settings, CreditCard, TrendingUp, Shield,
  ExternalLink, BarChart3, Key
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your NQ Forge personal dashboard — usage stats, saved tools, and API management.",
};

const RECENT_TOOLS = [
  { name: "UUID Generator", slug: "uuid-generator", category: "Generator", time: "2 min ago" },
  { name: "JSON Formatter", slug: "json-formatter", category: "Developer", time: "1 hour ago" },
  { name: "Base64 Encoder", slug: "base64-encoder", category: "Converter", time: "3 hours ago" },
  { name: "Password Generator", slug: "password-generator", category: "Generator", time: "Yesterday" },
];

const FAVORITE_TOOLS = [
  { name: "UUID Generator", slug: "uuid-generator" },
  { name: "JWT Decoder", slug: "jwt-decoder" },
  { name: "JSON Formatter", slug: "json-formatter" },
];

const API_USAGE = [
  { endpoint: "/api/v1/generate/uuid", calls: 248, last: "5 min ago" },
  { endpoint: "/api/v1/dev/hash", calls: 87, last: "2 hours ago" },
  { endpoint: "/api/v1/convert/base64", calls: 32, last: "Yesterday" },
];

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Welcome back! Here's your activity overview.</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1 font-semibold">
                Free Plan
              </Badge>
              <Button size="sm" className="brand-gradient text-white border-0 rounded-lg" asChild>
                <Link href="/api-platform#pricing">Upgrade to Pro</Link>
              </Button>
            </div>
          </div>

          {/* Auth Notice Banner */}
          <div className="mb-8 rounded-2xl border border-brand/20 bg-brand/5 p-5 flex items-start gap-4">
            <Shield className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">You're viewing a preview dashboard</p>
              <p className="text-sm text-muted-foreground">Sign in with your account to see your personalized stats, saved history, and manage API keys.</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" asChild className="rounded-lg">
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" className="brand-gradient text-white border-0 rounded-lg" asChild>
                <Link href="/auth/sign-up">Create Account</Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { icon: Zap, label: "Tools Used (30d)", value: "47", change: "+12%", color: "text-brand" },
              { icon: Code, label: "API Calls (30d)", value: "367", change: "+8%", color: "text-blue-500" },
              { icon: Star, label: "Favorites", value: "3", change: "", color: "text-yellow-500" },
              { icon: TrendingUp, label: "Plan Usage", value: "73%", change: "500/day", color: "text-green-500" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                  <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={15} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.change && <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left col */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Tools */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold flex items-center gap-2"><Clock size={16} className="text-muted-foreground" /> Recent Tools</h2>
                  <Button variant="ghost" size="sm" asChild className="text-xs"><Link href="/tools">View All</Link></Button>
                </div>
                <div className="space-y-2">
                  {RECENT_TOOLS.map((tool) => (
                    <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group">
                      <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                        <Zap size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium group-hover:text-brand transition-colors">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">{tool.category}</p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{tool.time}</span>
                      <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* API Usage */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold flex items-center gap-2"><BarChart3 size={16} className="text-muted-foreground" /> API Usage (30 days)</h2>
                  <Button variant="ghost" size="sm" asChild className="text-xs"><Link href="/api-platform">View API</Link></Button>
                </div>

                {/* Usage bar */}
                <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">Daily Quota</span>
                    <span className="text-xs text-muted-foreground">367 / 500 requests</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="h-2 rounded-full brand-gradient" style={{width: "73%"}} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">133 requests remaining today. <Link href="/api-platform#pricing" className="text-brand hover:underline">Upgrade for more.</Link></p>
                </div>

                <div className="space-y-2">
                  {API_USAGE.map((ep) => (
                    <div key={ep.endpoint} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border">
                      <code className="text-xs font-mono flex-1 truncate text-muted-foreground">{ep.endpoint}</code>
                      <span className="text-sm font-bold text-foreground flex-shrink-0">{ep.calls}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">{ep.last}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Favorites */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-bold flex items-center gap-2 mb-4"><Star size={16} className="text-yellow-500" /> Favorites</h2>
                <div className="space-y-2">
                  {FAVORITE_TOOLS.map(tool => (
                    <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors group">
                      <Zap size={13} className="text-brand" />
                      <span className="text-sm group-hover:text-brand transition-colors">{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* API Key */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-bold flex items-center gap-2 mb-4"><Key size={16} className="text-muted-foreground" /> API Key</h2>
                <div className="p-3 rounded-xl bg-muted/50 border border-border font-mono text-xs text-muted-foreground break-all mb-4">
                  nqf_•••••••••••••••••••••••
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-lg" asChild>
                  <Link href="/auth/sign-in">Sign in to manage keys</Link>
                </Button>
              </div>

              {/* Quick Links */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-bold mb-4">Quick Links</h2>
                <div className="space-y-2">
                  {[
                    { icon: Settings, label: "Account Settings", href: "/settings" },
                    { icon: CreditCard, label: "Billing & Plans", href: "/api-platform#pricing" },
                    { icon: Code, label: "API Docs", href: "/api-platform" },
                    { icon: Shield, label: "Security", href: "/settings#security" },
                  ].map(link => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors text-sm text-muted-foreground hover:text-foreground group">
                      <link.icon size={14} className="group-hover:text-brand transition-colors" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
