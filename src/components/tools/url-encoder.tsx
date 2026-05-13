"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

type Mode = "encode" | "decode";
type Target = "full" | "component" | "query";

export function UrlEncoder() {
  const [mode, setMode] = useState<Mode>("encode");
  const [target, setTarget] = useState<Target>("component");
  const [input, setInput] = useState("https://example.com/path?q=hello world&filter=name=John Doe&special=<>&emoji=🚀");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    setError("");
    try {
      if (mode === "encode") {
        if (target === "component") setOutput(encodeURIComponent(input));
        else if (target === "query") {
          const [base, qs] = input.split("?");
          if (!qs) { setOutput(encodeURI(input)); return; }
          const params = qs.split("&").map(p => {
            const [k, v] = p.split("=");
            return `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`;
          });
          setOutput(`${base}?${params.join("&")}`);
        } else {
          setOutput(encodeURI(input));
        }
      } else {
        if (target === "component") setOutput(decodeURIComponent(input));
        else setOutput(decodeURI(input));
      }
    } catch (e) {
      setError("Could not " + mode + " the input. " + String(e));
      setOutput("");
    }
  };

  const swap = () => {
    setMode(m => m === "encode" ? "decode" : "encode");
    setInput(output); setOutput(""); setError("");
  };

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success("Copied!"); };

  // Parse URL for display
  let parsedUrl: { key: string; value: string }[] = [];
  try {
    const url = new URL(input.includes("://") ? input : "https://dummy" + (input.startsWith("/") ? input : `/${input}`));
    parsedUrl = Array.from(url.searchParams.entries()).map(([k, v]) => ({ key: k, value: v }));
  } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Mode</Label>
            <Select value={mode} onValueChange={v => { setMode(v as Mode); setOutput(""); setError(""); }}>
              <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="encode">Encode URL</SelectItem>
                <SelectItem value="decode">Decode URL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Encoding Target</Label>
            <Select value={target} onValueChange={v => setTarget(v as Target)}>
              <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="component">URI Component</SelectItem>
                <SelectItem value="full">Full URI</SelectItem>
                <SelectItem value="query">Query Parameters</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="pt-8">
          <Button variant="outline" size="icon" onClick={swap} className="w-10 h-10 rounded-xl" title="Swap">
            <ArrowLeftRight size={16}/>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Input</Label>
            <Button variant="ghost" size="sm" onClick={() => copy(input)} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand/50 break-all" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Output</Label>
            {output && <Button variant="ghost" size="sm" onClick={() => copy(output)} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>}
          </div>
          {error ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 min-h-32">
              <p className="text-xs text-destructive">{error}</p>
            </div>
          ) : (
            <textarea readOnly value={output} rows={8} className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none break-all" placeholder="Output..." />
          )}
        </div>
      </div>

      <Button onClick={process} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        {mode === "encode" ? "Encode URL" : "Decode URL"}
      </Button>

      {parsedUrl.length > 0 && (
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Parsed Query Parameters</Label>
          <div className="space-y-1.5">
            {parsedUrl.map(({ key, value }) => (
              <div key={key} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border">
                <code className="text-xs font-mono text-brand w-32 truncate">{key}</code>
                <span className="text-muted-foreground text-xs">=</span>
                <code className="text-xs font-mono flex-1 truncate">{value}</code>
                <Button variant="ghost" size="icon" className="w-7 h-7 flex-shrink-0" onClick={() => copy(value)}>
                  <Copy size={11}/>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
