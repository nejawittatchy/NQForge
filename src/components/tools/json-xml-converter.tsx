"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Copy, Download } from "lucide-react";
import { toast } from "sonner";

function jsonToXml(json: string): string {
  const obj = JSON.parse(json);
  function convert(val: unknown, key: string, indent: number): string {
    const pad = " ".repeat(indent);
    if (val === null) return `${pad}<${key} xsi:nil="true"/>`;
    if (typeof val !== "object") return `${pad}<${key}>${val}</${key}>`;
    if (Array.isArray(val)) {
      return val.map(item => convert(item, key, indent)).join("\n");
    }
    const children = Object.entries(val as Record<string, unknown>).map(([k, v]) => convert(v, k, indent + 2)).join("\n");
    return `${pad}<${key}>\n${children}\n${pad}</${key}>`;
  }
  const root = Object.keys(obj)[0] || "root";
  return `<?xml version="1.0" encoding="UTF-8"?>\n${convert(obj[root], root, 0)}`;
}

function xmlToJson(xml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Invalid XML");
  function nodeToObj(node: Element): unknown {
    if (node.children.length === 0) return node.textContent ?? "";
    const result: Record<string, unknown> = {};
    for (const child of Array.from(node.children)) {
      const key = child.tagName;
      const val = nodeToObj(child);
      if (key in result) {
        if (!Array.isArray(result[key])) result[key] = [result[key]];
        (result[key] as unknown[]).push(val);
      } else {
        result[key] = val;
      }
    }
    return result;
  }
  const root = doc.documentElement;
  return JSON.stringify({ [root.tagName]: nodeToObj(root) }, null, 2);
}

export function JsonXmlConverter() {
  const [mode, setMode] = useState<"json-to-xml" | "xml-to-json">("json-to-xml");
  const [input, setInput] = useState(`{\n  "person": {\n    "name": "John Doe",\n    "age": 30,\n    "email": "john@example.com"\n  }\n}`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    try {
      if (mode === "json-to-xml") setOutput(jsonToXml(input));
      else setOutput(xmlToJson(input));
    } catch (e) {
      setError(String(e));
      setOutput("");
    }
  };

  const swap = () => {
    const newMode = mode === "json-to-xml" ? "xml-to-json" : "json-to-xml";
    setMode(newMode);
    setInput(output);
    setOutput("");
    setError("");
  };

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success("Copied!"); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <Label>Conversion Direction</Label>
          <Select value={mode} onValueChange={v => { setMode(v as typeof mode); setOutput(""); setError(""); }}>
            <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="json-to-xml">JSON → XML</SelectItem>
              <SelectItem value="xml-to-json">XML → JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-8">
          <Button variant="outline" size="icon" onClick={swap} className="w-10 h-10 rounded-xl" title="Swap & convert">
            <ArrowLeftRight size={16}/>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Input ({mode === "json-to-xml" ? "JSON" : "XML"})</Label>
            <Button variant="ghost" size="sm" onClick={() => copy(input)} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={14}
            className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-xs resize-none focus:outline-none focus:ring-1 focus:ring-brand/50 leading-relaxed"
            placeholder={mode === "json-to-xml" ? '{\n  "key": "value"\n}' : '<root>\n  <key>value</key>\n</root>'}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Output ({mode === "json-to-xml" ? "XML" : "JSON"})</Label>
            {output && <Button variant="ghost" size="sm" onClick={() => copy(output)} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>}
          </div>
          {error ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 h-48 flex items-start">
              <p className="text-xs text-destructive font-mono">{error}</p>
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              rows={14}
              className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-xs resize-none focus:outline-none leading-relaxed"
              placeholder="Output will appear here..."
            />
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={convert} className="flex-1 brand-gradient text-white border-0 h-12 rounded-xl font-bold">
          Convert
        </Button>
        {output && (
          <Button variant="outline" onClick={() => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([output])); a.download = mode === "json-to-xml" ? "output.xml" : "output.json"; a.click(); }} className="h-12 px-5 rounded-xl">
            <Download size={16}/>
          </Button>
        )}
      </div>
    </div>
  );
}
