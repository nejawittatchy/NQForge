"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const ENDPOINTS = [
  { method: "GET", path: "/api/v1/generate/uuid", desc: "Generate UUIDs (v1, v4, v7)", params: "?version=v4&count=10" },
  { method: "GET", path: "/api/v1/generate/password", desc: "Generate secure passwords", params: "?length=24&symbols=true" },
  { method: "GET", path: "/api/v1/convert/base64", desc: "Encode/decode Base64", params: "?mode=encode&input=Hello" },
  { method: "GET", path: "/api/v1/dev/hash", desc: "Generate cryptographic hashes", params: "?algo=sha256&input=Hello" },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-green-500/15 text-green-500",
  POST: "bg-blue-500/15 text-blue-500",
  DELETE: "bg-red-500/15 text-red-500",
};

export function EndpointsTable() {
  const [copied, setCopied] = useState<number | null>(null);

  const copyEndpoint = (i: number, ep: typeof ENDPOINTS[0]) => {
    navigator.clipboard.writeText(`curl "https://nqforge.com${ep.path}${ep.params}"`);
    setCopied(i);
    toast.success("cURL command copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      <div className="px-6 py-4 bg-muted/50 border-b border-border">
        <p className="text-sm font-mono text-muted-foreground">
          Base URL: <span className="text-foreground font-bold">https://nqforge.com</span>
        </p>
      </div>
      <div className="divide-y divide-border">
        {ENDPOINTS.map((ep, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors group">
            <span className={`text-xs font-bold px-2 py-1 rounded font-mono flex-shrink-0 ${METHOD_COLORS[ep.method]}`}>
              {ep.method}
            </span>
            <div className="flex-1 min-w-0">
              <code className="text-sm font-mono text-foreground">{ep.path}</code>
              <p className="text-xs text-muted-foreground mt-0.5">{ep.desc}</p>
            </div>
            <code className="text-xs font-mono text-muted-foreground hidden md:block flex-shrink-0 max-w-48 truncate">
              {ep.params}
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 text-xs rounded-lg flex-shrink-0"
              onClick={() => copyEndpoint(i, ep)}
            >
              {copied === i ? <Check size={12} className="mr-1 text-green-500" /> : <Copy size={12} className="mr-1" />}
              Copy
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
