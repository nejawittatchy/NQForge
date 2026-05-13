"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type Indent = "2" | "4" | "tab" | "minify";

export function JsonFormatter() {
  const [input, setInput] = useState(`{\n  "name": "NQ Forge",\n  "version": "1.0.0",\n  "tools": ["uuid", "password", "qrcode"],\n  "api": true,\n  "author": "NOYEQ"\n}`);
  const [indent, setIndent] = useState<Indent>("2");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      if (indent === "minify") setOutput(JSON.stringify(parsed));
      else if (indent === "tab") setOutput(JSON.stringify(parsed, null, "\t"));
      else setOutput(JSON.stringify(parsed, null, Number(indent)));
    } catch (e) {
      setError(String(e));
      setOutput("");
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      toast.success("✓ Valid JSON");
    } catch (e) {
      toast.error("Invalid JSON: " + String(e).replace("SyntaxError: ", ""));
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output || input);
    setCopied(true); toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([output || input], {type:"application/json"}));
    a.download = "formatted.json"; a.click();
  };

  const stats = () => {
    try { const o = JSON.parse(input); const keys = JSON.stringify(o).match(/"[^"]+"\s*:/g)?.length ?? 0; return { valid: true, keys }; }
    catch { return { valid: false, keys: 0 }; }
  };
  const { valid, keys } = stats();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <Label>Indentation</Label>
          <Select value={indent} onValueChange={v => setIndent(v as Indent)}>
            <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Spaces</SelectItem>
              <SelectItem value="4">4 Spaces</SelectItem>
              <SelectItem value="tab">Tab</SelectItem>
              <SelectItem value="minify">Minify</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-8 flex gap-2">
          <Button variant="outline" onClick={validate} className="h-11 rounded-xl">Validate</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Input JSON</Label>
            <div className="flex items-center gap-1.5">
              {valid ? <span className="text-xs text-green-500 font-medium flex items-center gap-1"><Check size={10}/>Valid</span> : <span className="text-xs text-destructive font-medium flex items-center gap-1"><AlertCircle size={10}/>Invalid</span>}
            </div>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={16} className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-xs resize-none focus:outline-none focus:ring-1 focus:ring-brand/50 leading-relaxed" placeholder='{"key": "value"}' />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Output</Label>
            {output && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={download} className="h-7 text-xs"><Download className="mr-1 w-3 h-3"/>Download</Button>
                <Button variant="ghost" size="sm" onClick={copy} className="h-7 text-xs">
                  {copied ? <Check className="mr-1 w-3 h-3 text-green-500"/> : <Copy className="mr-1 w-3 h-3"/>}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            )}
          </div>
          {error ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 min-h-48">
              <p className="text-xs text-destructive font-mono whitespace-pre-wrap">{error}</p>
            </div>
          ) : (
            <textarea readOnly value={output} rows={16} className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-xs resize-none focus:outline-none leading-relaxed" placeholder="Formatted output..." />
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={format} className="flex-1 brand-gradient text-white border-0 h-12 rounded-xl font-bold">
          {indent === "minify" ? "Minify JSON" : "Format JSON"}
        </Button>
      </div>

      {valid && (
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-muted/50 border border-border"><p className="text-xs text-muted-foreground">Status</p><p className="font-bold text-green-500">Valid</p></div>
          <div className="p-3 rounded-xl bg-muted/50 border border-border"><p className="text-xs text-muted-foreground">Keys</p><p className="font-bold">{keys}</p></div>
          <div className="p-3 rounded-xl bg-muted/50 border border-border"><p className="text-xs text-muted-foreground">Size</p><p className="font-bold">{input.length}B</p></div>
        </div>
      )}
    </div>
  );
}
