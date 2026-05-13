import Link from "next/link";
import { Zap, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Tools: [
    { label: "UUID Generator", href: "/tools/uuid-generator" },
    { label: "Password Generator", href: "/tools/password-generator" },
    { label: "QR Code Generator", href: "/tools/qr-code-generator" },
    { label: "JSON Formatter", href: "/tools/json-formatter" },
    { label: "Base64 Encoder", href: "/tools/base64-encoder" },
    { label: "All Tools", href: "/tools" },
  ],
  Developers: [
    { label: "API Platform", href: "/api-platform" },
    { label: "API Docs", href: "/api-platform" },
    { label: "API Pricing", href: "/api-platform#pricing" },
    { label: "API Playground", href: "/api-platform/playground" },
    { label: "API Status", href: "/status" },
  ],
  Company: [
    { label: "About NOYEQ", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/60 backdrop-blur-sm" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand col */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-4" aria-label="NQ Forge">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 brand-gradient rounded-lg opacity-90" />
                <Zap className="relative w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base tracking-tight text-foreground">NQ Forge</span>
                <span className="text-[9px] font-medium tracking-widest text-muted-foreground uppercase">
                  by NOYEQ
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-52">
              Modern utilities and scalable APIs for developers, creators, and businesses.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <a
                href="https://github.com/noyeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-border/80 hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/noyeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-border/80 hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Twitter / X"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://noyeq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-border/80 hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                aria-label="NOYEQ website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NOYEQ. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Built by</span>
            <a
              href="https://noyeq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline underline-offset-2"
            >
              NOYEQ
            </a>
            <span>·</span>
            <span>Deployed on</span>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline underline-offset-2"
            >
              Vercel
            </a>
          </div>
        </div>

        {/* AdSense placeholder - footer */}
        <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/30 h-16 flex items-center justify-center" aria-hidden="true">
          <span className="text-xs text-muted-foreground/40 font-mono">— advertisement —</span>
        </div>
      </div>
    </footer>
  );
}
