import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code, Share2, ExternalLink } from "lucide-react";
import { getToolBySlug, getRelatedTools, TOOLS } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToolRenderer } from "@/components/tools/tool-renderer";
import * as Icons from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nqforge.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const title = `${tool.name} – Free Online Tool`;
  const description = tool.longDescription;
  const url = `${siteUrl}/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: [...tool.tags, "free tool", "online tool", "nq forge", "noyeq"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "NQ Forge",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const TOOL_FAQS: Record<string, Array<{ q: string; a: string }>> = {
  "uuid-generator": [
    { q: "What is a UUID?", a: "A UUID (Universally Unique Identifier) is a 128-bit value used to uniquely identify objects in computing systems. They're commonly used as database primary keys, session tokens, and correlation IDs." },
    { q: "Which UUID version should I use?", a: "For most use cases, UUID v4 (random) is recommended. For database keys where sorting performance matters, use UUID v7 which is time-ordered. UUID v1 is based on MAC address and timestamp." },
    { q: "Are generated UUIDs truly unique?", a: "UUID v4 uses cryptographically secure random generation. The probability of collision is astronomically low—you'd need to generate 1 billion UUIDs per second for 86 years to reach a 50% probability of a single collision." },
    { q: "Can I use the UUID Generator via API?", a: "Yes! Use GET /api/v1/generate/uuid to generate UUIDs programmatically. Add ?version=v4&count=10 parameters for bulk generation." },
  ],
  "password-generator": [
    { q: "How secure are the generated passwords?", a: "Passwords are generated using the Web Crypto API's cryptographically secure random number generator (CSPRNG), which is suitable for security-critical applications." },
    { q: "What makes a strong password?", a: "A strong password should be at least 16 characters long, use a mix of uppercase, lowercase, numbers, and symbols, and avoid dictionary words or personal information." },
    { q: "Does NQ Forge store my generated passwords?", a: "No. Password generation happens entirely in your browser. No data is ever sent to our servers." },
    { q: "What is password entropy?", a: "Entropy measures the unpredictability of a password in bits. Higher entropy means a more secure password. A 128-bit entropy password would take millions of years to brute force." },
  ],
  "qr-code-generator": [
    { q: "What can I encode in a QR code?", a: "QR codes can encode URLs, plain text, email addresses, phone numbers, WiFi credentials, vCard contact information, calendar events, and much more." },
    { q: "What is QR code error correction?", a: "QR codes include error correction that allows them to be scanned even when partially damaged. Higher error correction (H level) allows up to 30% damage while still being readable." },
    { q: "What's the maximum data a QR code can store?", a: "A QR code can store up to 7,089 numeric characters, 4,296 alphanumeric characters, or 2,953 bytes of binary data depending on the error correction level." },
  ],
  "json-formatter": [
    { q: "What is JSON formatting?", a: "JSON formatting (or pretty-printing) adds consistent indentation and whitespace to JSON data, making it human-readable. Minification does the opposite, removing all whitespace to reduce file size." },
    { q: "How do I validate JSON?", a: "Paste your JSON into the formatter and click Format. Any syntax errors will be highlighted with descriptive error messages showing exactly where the problem is." },
    { q: "What's the difference between JSON and JSONC?", a: "JSONC (JSON with Comments) allows comments in JSON files, used in configs like tsconfig.json. Standard JSON does not support comments." },
  ],
  "base64-encoder": [
    { q: "What is Base64 encoding?", a: "Base64 is a binary-to-text encoding scheme that represents binary data in ASCII format. It's commonly used to transmit data over text-based protocols, embed images in CSS/HTML, and encode JWT payloads." },
    { q: "What is URL-safe Base64?", a: "URL-safe Base64 replaces + with - and / with _ to make the encoded string safe to use in URLs without percent-encoding. It also omits padding = characters." },
    { q: "Does Base64 encrypt my data?", a: "No. Base64 is encoding, not encryption. Encoded data can be trivially decoded by anyone. Never use Base64 as a security measure—use proper encryption instead." },
  ],
  "jwt-decoder": [
    { q: "What is a JWT?", a: "A JSON Web Token (JWT) is a compact, URL-safe token format for transmitting claims between parties. It consists of three Base64URL-encoded parts: header, payload, and signature." },
    { q: "Is it safe to decode a JWT here?", a: "Yes. JWTs are not encrypted by default—they're only signed. The header and payload are publicly readable Base64URL-encoded JSON. This tool never sends your token to a server." },
    { q: "Can I verify a JWT signature here?", a: "JWT signature verification requires the secret key or public key. This tool shows you the decoded contents without signature verification, which is useful for inspecting claims." },
  ],
};

const TOOL_API_EXAMPLES: Record<string, { endpoint: string; curlExample: string; jsExample: string; pythonExample: string; response: string }> = {
  "uuid-generator": {
    endpoint: "GET /api/v1/generate/uuid",
    curlExample: `curl "https://nqforge.com/api/v1/generate/uuid?version=v4&count=5"`,
    jsExample: `const res = await fetch('https://nqforge.com/api/v1/generate/uuid?version=v4&count=5', {
  headers: { 'X-API-Key': 'your_api_key' }
});
const data = await res.json();
console.log(data.uuids); // ['550e8400-...', ...]`,
    pythonExample: `import requests

response = requests.get(
    'https://nqforge.com/api/v1/generate/uuid',
    params={'version': 'v4', 'count': 5},
    headers={'X-API-Key': 'your_api_key'}
)
print(response.json()['uuids'])`,
    response: `{
  "uuids": [
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
  ],
  "version": "v4",
  "count": 2,
  "generatedAt": "2024-01-15T10:30:00Z"
}`,
  },
  "password-generator": {
    endpoint: "GET /api/v1/generate/password",
    curlExample: `curl "https://nqforge.com/api/v1/generate/password?length=24&symbols=true&count=3"`,
    jsExample: `const res = await fetch('https://nqforge.com/api/v1/generate/password?length=24&symbols=true', {
  headers: { 'X-API-Key': 'your_api_key' }
});
const data = await res.json();
console.log(data.passwords);`,
    pythonExample: `import requests

response = requests.get(
    'https://nqforge.com/api/v1/generate/password',
    params={'length': 24, 'symbols': True, 'count': 3},
    headers={'X-API-Key': 'your_api_key'}
)
print(response.json()['passwords'])`,
    response: `{
  "passwords": ["Xk#9mP2$nQ8rL5vW"],
  "entropy": 128.4,
  "strength": "very_strong",
  "count": 1
}`,
  },
};

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const relatedTools = getRelatedTools(tool);
  const faqs = TOOL_FAQS[tool.slug] ?? [
    { q: `Is the ${tool.name} free to use?`, a: "Yes, this tool is completely free for personal and commercial use. No account required for basic usage." },
    { q: `Does ${tool.name} work offline?`, a: "Processing happens in your browser. Once the page is loaded, most functionality works without an active internet connection." },
    { q: `Can I use ${tool.name} via API?`, a: tool.apiSupported ? `Yes! Use ${tool.apiEndpoint} to access this tool programmatically. See the API section below for examples.` : "This tool is currently web-only. API support is planned for a future release." },
    { q: "How do I report a bug or suggest an improvement?", a: "Use the feedback link in the footer or contact us at support@noyeq.com. We respond within 24 hours." },
  ];
  const apiExample = tool.apiEndpoint ? TOOL_API_EXAMPLES[tool.slug] : null;

  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/tools/${tool.slug}`,
        name: tool.name,
        description: tool.longDescription,
        url: `${siteUrl}/tools/${tool.slug}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: {
          "@type": "Organization",
          name: "NOYEQ",
          url: siteUrl,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  // @ts-ignore
  const Icon = Icons[tool.icon as keyof typeof Icons] || Icons.Wrench;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{tool.name}</span>
        </div>
      </div>

      {/* Tool header */}
      <section className="pt-10 pb-0 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 border border-brand/20">
                <Icon size={28} />
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
                  {tool.trending && (
                    <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px] uppercase font-bold tracking-wider">
                      Trending
                    </Badge>
                  )}
                  {tool.isNew && (
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px] uppercase font-bold tracking-wider">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">{tool.longDescription}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                <Share2 size={14} />
                Share
              </Button>
              {tool.apiSupported && (
                <Button variant="outline" size="sm" className="gap-2 rounded-lg" asChild>
                  <a href="#api-reference">
                    <Code size={14} />
                    API
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Tool UI - main col */}
          <div className="lg:col-span-2 space-y-10">
            {/* AdSense top */}
            <div className="rounded-xl border border-dashed border-border bg-muted/20 h-20 flex items-center justify-center" aria-hidden="true">
              <span className="text-xs text-muted-foreground/30 font-mono">— advertisement —</span>
            </div>

            {/* Tool UI */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <ToolRenderer slug={tool.slug} />
            </div>

            {/* API Reference */}
            {tool.apiSupported && apiExample && (
              <div id="api-reference" className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">API Reference</h2>
                  <p className="text-sm text-muted-foreground">
                    Access this tool programmatically via the NQ Forge REST API.
                  </p>
                </div>

                <div className="rounded-2xl border border-border overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 bg-muted/50 border-b border-border">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-green-500/15 text-green-500 text-xs font-bold font-mono">GET</span>
                      <code className="text-sm font-mono text-foreground">{apiExample.endpoint}</code>
                    </div>
                  </div>

                  {/* Code tabs */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">cURL</div>
                      <pre className="code-block text-xs leading-relaxed overflow-x-auto">{apiExample.curlExample}</pre>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">JavaScript</div>
                      <pre className="code-block text-xs leading-relaxed overflow-x-auto">{apiExample.jsExample}</pre>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Python</div>
                      <pre className="code-block text-xs leading-relaxed overflow-x-auto">{apiExample.pythonExample}</pre>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Response</div>
                      <pre className="code-block text-xs leading-relaxed overflow-x-auto">{apiExample.response}</pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/5 border border-brand/10">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                    <Code size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Get your API key</p>
                    <p className="text-xs text-muted-foreground">Free tier includes 500 requests/day. No credit card required.</p>
                  </div>
                  <Button size="sm" className="brand-gradient text-white border-0 rounded-lg" asChild>
                    <Link href="/api-platform">Get API Key</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* FAQ Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="font-semibold mb-2 text-sm">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Tool info card */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <h3 className="font-semibold text-sm">About this tool</h3>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Link href={`/tools?category=${tool.category}`} className="font-medium text-brand hover:underline capitalize">
                    {tool.category}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Access</span>
                  <span className={tool.apiSupported ? "font-medium text-green-500" : "font-medium text-muted-foreground"}>
                    {tool.apiSupported ? "Available" : "Web only"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost</span>
                  <span className="font-medium text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing</span>
                  <span className="font-medium">Browser-side</span>
                </div>
              </div>
            </div>

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Related Tools</h3>
                <div className="space-y-2">
                  {relatedTools.map((related) => {
                    // @ts-ignore
                    const RelIcon = Icons[related.icon as keyof typeof Icons] || Icons.Wrench;
                    return (
                      <Link
                        key={related.id}
                        href={`/tools/${related.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-accent hover:border-brand/20 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <RelIcon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-brand transition-colors">{related.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{related.description}</p>
                        </div>
                        <ExternalLink size={12} className="text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AdSense sidebar */}
            <div className="rounded-xl border border-dashed border-border bg-muted/20 h-64 flex items-center justify-center" aria-hidden="true">
              <span className="text-xs text-muted-foreground/30 font-mono text-center px-4">— advertisement —</span>
            </div>

            <Button variant="outline" className="w-full gap-2 rounded-xl" asChild>
              <Link href="/tools">
                <ArrowLeft size={14} />
                All Tools
              </Link>
            </Button>
          </aside>
        </div>
      </div>
    </>
  );
}
