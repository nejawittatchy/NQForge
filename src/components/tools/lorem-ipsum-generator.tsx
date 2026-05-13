"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw, Check, Download } from "lucide-react";
import { toast } from "sonner";

const LOREM_WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","eu","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum"];
const CLASSIC = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

function rw() { return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]; }
function sentence() { const n = 8 + Math.floor(Math.random() * 10); const w = Array.from({length:n}, rw); w[0] = w[0][0].toUpperCase() + w[0].slice(1); return w.join(" ") + "."; }
function paragraph() { return Array.from({length: 3 + Math.floor(Math.random() * 4)}, sentence).join(" "); }

type Mode = "paragraphs" | "sentences" | "words";

export function LoremIpsumGenerator() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [classic, setClassic] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = "";
    if (mode === "paragraphs") {
      result = Array.from({length: count}, (_, i) => i === 0 && classic ? CLASSIC : paragraph()).join("\n\n");
    } else if (mode === "sentences") {
      result = Array.from({length: count}, (_, i) => i === 0 && classic ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : sentence()).join(" ");
    } else {
      result = Array.from({length: count}, (_, i) => i === 0 && classic ? "Lorem" : rw()).join(" ");
    }
    setOutput(result);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true); toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([output], {type:"text/plain"}));
    a.download = "lorem-ipsum.txt"; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={mode} onValueChange={v => setMode(v as Mode)}>
            <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Paragraphs</SelectItem>
              <SelectItem value="sentences">Sentences</SelectItem>
              <SelectItem value="words">Words</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Count</Label>
          <Input type="number" min={1} max={50} value={count} onChange={e => setCount(Math.max(1, parseInt(e.target.value)||1))} className="rounded-xl h-11" />
        </div>
        <div className="space-y-2">
          <Label>Start with classic Lorem</Label>
          <Select value={classic ? "yes" : "no"} onValueChange={v => setClassic(v === "yes")}>
            <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No (Random)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={generate} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        <RefreshCw className="mr-2 w-4 h-4" /> Generate
      </Button>
      {output && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Output</Label>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={download} className="h-8 text-xs"><Download className="mr-1 w-3.5 h-3.5"/>Download</Button>
              <Button variant="outline" size="sm" onClick={copy} className="h-8 text-xs rounded-lg">
                {copied ? <Check className="mr-1 w-3.5 h-3.5 text-green-500"/> : <Copy className="mr-1 w-3.5 h-3.5"/>}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea readOnly value={output} rows={10} className="w-full bg-muted/30 border border-border rounded-2xl p-5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand/50 leading-relaxed" />
          <p className="text-xs text-muted-foreground">{output.split(/\s+/).filter(Boolean).length} words · {output.length} chars</p>
        </div>
      )}
    </div>
  );
}
