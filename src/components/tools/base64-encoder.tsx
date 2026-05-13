"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

type Mode = "encode" | "decode";
type Variant = "standard" | "url-safe";

export function Base64Encoder() {
  const [mode, setMode] = useState<Mode>("encode");
  const [variant, setVariant] = useState<Variant>("standard");
  const [input, setInput] = useState("Hello, NQ Forge! 🚀");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    setError("");
    try {
      if (mode === "encode") {
        let encoded = btoa(unescape(encodeURIComponent(input)));
        if (variant === "url-safe") encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        setOutput(encoded);
      } else {
        let decoded = input;
        if (variant === "url-safe") {
          decoded = decoded.replace(/-/g, "+").replace(/_/g, "/");
          while (decoded.length % 4) decoded += "=";
        }
        setOutput(decodeURIComponent(escape(atob(decoded))));
      }
    } catch {
      setError("Invalid input for " + (mode === "decode" ? "Base64 decoding" : "encoding"));
      setOutput("");
    }
  };

  const swap = () => {
    setMode(m => m === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError("");
  };

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success("Copied!"); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Mode</Label>
            <Select value={mode} onValueChange={v => { setMode(v as Mode); setOutput(""); setError(""); }}>
              <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="encode">Encode → Base64</SelectItem>
                <SelectItem value="decode">Decode ← Base64</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Variant</Label>
            <Select value={variant} onValueChange={v => setVariant(v as Variant)}>
              <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="url-safe">URL-Safe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="pt-8 flex-shrink-0">
          <Button variant="outline" size="icon" onClick={swap} className="w-10 h-10 rounded-xl" title="Swap">
            <ArrowLeftRight size={16}/>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Input ({mode === "encode" ? "Plain Text" : "Base64"})</Label>
            <Button variant="ghost" size="sm" onClick={() => copy(input)} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand/50" placeholder="Enter text to encode or Base64 to decode..." />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Output ({mode === "encode" ? "Base64" : "Plain Text"})</Label>
            {output && <Button variant="ghost" size="sm" onClick={() => copy(output)} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>}
          </div>
          {error ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 min-h-40 flex items-start">
              <p className="text-xs text-destructive font-mono">{error}</p>
            </div>
          ) : (
            <textarea readOnly value={output} rows={10} className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none" placeholder="Output will appear here..." />
          )}
        </div>
      </div>

      <Button onClick={process} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
      </Button>

      {output && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">Input length</p>
            <p className="font-bold">{input.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">Output length</p>
            <p className="font-bold">{output.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">Size ratio</p>
            <p className="font-bold">{output.length > 0 ? ((output.length / Math.max(input.length,1)) * 100).toFixed(0) + "%" : "—"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
