"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface JwtParts { header: Record<string, unknown>; payload: Record<string, unknown>; signature: string; }

function parseJwt(token: string): JwtParts {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 parts separated by dots");
  const decode = (b64: string) => {
    const padded = b64.replace(/-/g,"+").replace(/_/g,"/");
    const pad = padded.length % 4;
    const full = pad ? padded + "=".repeat(4 - pad) : padded;
    return JSON.parse(atob(full));
  };
  return { header: decode(parts[0]), payload: decode(parts[1]), signature: parts[2] };
}

const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function ClaimRow({ label, value }: { label: string; value: unknown }) {
  const isExp = label === "exp" || label === "iat" || label === "nbf";
  const formatted = isExp && typeof value === "number"
    ? new Date(value * 1000).toLocaleString()
    : JSON.stringify(value);
  const expired = label === "exp" && typeof value === "number" && value < Date.now() / 1000;
  return (
    <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors group">
      <span className="text-xs font-mono text-muted-foreground w-24 flex-shrink-0">{label}</span>
      <span className="text-sm font-mono flex-1 break-all">{formatted}</span>
      {expired && <span className="text-[10px] bg-destructive/10 text-destructive px-2 py-0.5 rounded font-bold flex-shrink-0">EXPIRED</span>}
    </div>
  );
}

export function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [result, setResult] = useState<JwtParts | null>(null);
  const [error, setError] = useState("");

  const decode = () => {
    setError("");
    try {
      setResult(parseJwt(token));
    } catch (e) {
      setError(String(e));
      setResult(null);
    }
  };

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success("Copied!"); };

  const isExpired = result?.payload?.exp && typeof result.payload.exp === "number" && result.payload.exp < Date.now() / 1000;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>JWT Token</Label>
        <textarea
          value={token}
          onChange={e => setToken(e.target.value)}
          rows={4}
          className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-xs resize-none focus:outline-none focus:ring-1 focus:ring-brand/50 break-all"
          placeholder="Paste your JWT token here..."
        />
        <p className="text-[10px] text-muted-foreground px-1">⚠ This tool does not verify the signature. Do not paste tokens from production systems.</p>
      </div>

      <Button onClick={decode} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        Decode JWT
      </Button>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
          <AlertCircle size={16} className="text-destructive mt-0.5 flex-shrink-0"/>
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Status banner */}
          <div className={`flex items-center gap-3 p-3 rounded-xl border ${isExpired ? "bg-destructive/5 border-destructive/20" : "bg-green-500/5 border-green-500/20"}`}>
            {isExpired ? <AlertCircle size={16} className="text-destructive"/> : <CheckCircle2 size={16} className="text-green-500"/>}
            <span className="text-sm font-medium">{isExpired ? "Token is EXPIRED" : "Token format is valid (signature not verified)"}</span>
          </div>

          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block"/>
                Header
              </h3>
              <Button variant="ghost" size="sm" onClick={() => copy(JSON.stringify(result.header, null, 2))} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>
            </div>
            <div className="space-y-1.5">
              {Object.entries(result.header).map(([k, v]) => <ClaimRow key={k} label={k} value={v}/>)}
            </div>
          </div>

          {/* Payload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"/>
                Payload
              </h3>
              <Button variant="ghost" size="sm" onClick={() => copy(JSON.stringify(result.payload, null, 2))} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>
            </div>
            <div className="space-y-1.5">
              {Object.entries(result.payload).map(([k, v]) => <ClaimRow key={k} label={k} value={v}/>)}
            </div>
          </div>

          {/* Signature */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"/>
              Signature (Base64URL)
            </h3>
            <div className="p-3 rounded-xl bg-muted/30 border border-border font-mono text-xs break-all text-muted-foreground">
              {result.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
