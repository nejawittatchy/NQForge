"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

type Mode = "md-to-html" | "html-to-md";

function mdToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^---$/gm, "<hr>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>\n${m}</ul>`);
  // Wrap paragraphs
  const lines = html.split(/\n\n+/);
  return lines.map(block => {
    if (/^<(h[1-6]|ul|ol|blockquote|hr|pre|div)/.test(block.trim())) return block;
    return block.trim() ? `<p>${block.trim().replace(/\n/g, "<br>")}</p>` : "";
  }).filter(Boolean).join("\n");
}

function htmlToMd(html: string): string {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function MarkdownHtmlConverter() {
  const [mode, setMode] = useState<Mode>("md-to-html");
  const [input, setInput] = useState("# Hello, NQ Forge!\n\nThis is **bold** and *italic* text.\n\n- Item one\n- Item two\n\n[Visit NQ Forge](https://nqforge.com)");
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState(false);

  const convert = () => {
    if (mode === "md-to-html") setOutput(mdToHtml(input));
    else setOutput(htmlToMd(input));
  };

  const swap = () => {
    setMode(m => m === "md-to-html" ? "html-to-md" : "md-to-html");
    setInput(output); setOutput(""); setPreview(false);
  };
  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success("Copied!"); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <Label>Direction</Label>
          <Select value={mode} onValueChange={v => { setMode(v as Mode); setOutput(""); }}>
            <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="md-to-html">Markdown → HTML</SelectItem>
              <SelectItem value="html-to-md">HTML → Markdown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-8">
          <Button variant="outline" size="icon" onClick={swap} className="w-10 h-10 rounded-xl" title="Swap"><ArrowLeftRight size={16}/></Button>
        </div>
        {output && mode === "md-to-html" && (
          <div className="pt-8">
            <Button variant="outline" size="sm" onClick={() => setPreview(p => !p)} className="h-10 rounded-xl px-4">{preview ? "Show Code" : "Preview HTML"}</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Input ({mode === "md-to-html" ? "Markdown" : "HTML"})</Label>
            <Button variant="ghost" size="sm" onClick={() => copy(input)} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={14} className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand/50" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Output ({mode === "md-to-html" ? "HTML" : "Markdown"})</Label>
            {output && <Button variant="ghost" size="sm" onClick={() => copy(output)} className="h-7 text-xs"><Copy className="mr-1 w-3 h-3"/>Copy</Button>}
          </div>
          {preview && mode === "md-to-html" ? (
            <div className="rounded-2xl border border-border p-4 min-h-48 bg-background prose prose-sm max-w-none text-foreground" dangerouslySetInnerHTML={{__html: output}} />
          ) : (
            <textarea readOnly value={output} rows={14} className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none" placeholder="Output appears here..." />
          )}
        </div>
      </div>

      <Button onClick={convert} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        Convert {mode === "md-to-html" ? "Markdown → HTML" : "HTML → Markdown"}
      </Button>
    </div>
  );
}
