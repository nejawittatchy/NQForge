"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Match { index: number; length: number; groups: Record<string, string>; }

const CHEATSHEET = [
  { pattern: ".", desc: "Any character (except newline)" },
  { pattern: "\\d", desc: "Digit [0-9]" },
  { pattern: "\\w", desc: "Word character [a-zA-Z0-9_]" },
  { pattern: "\\s", desc: "Whitespace" },
  { pattern: "^", desc: "Start of string" },
  { pattern: "$", desc: "End of string" },
  { pattern: "*", desc: "0 or more" },
  { pattern: "+", desc: "1 or more" },
  { pattern: "?", desc: "0 or 1" },
  { pattern: "{n,m}", desc: "Between n and m times" },
  { pattern: "[abc]", desc: "Character class" },
  { pattern: "(abc)", desc: "Capture group" },
];

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
  const [flags, setFlags] = useState("gi");
  const [testString, setTestString] = useState("Contact us at hello@nqforge.com or support@noyeq.com for assistance.");
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern) return { matches: [], error: "", highlighted: testString };
    try {
      const regex = new RegExp(pattern, flags.replace(/[^gimsuy]/g, ""));
      const matches: Match[] = [];
      let m: RegExpExecArray | null;
      const rx = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((m = rx.exec(testString)) !== null) {
        matches.push({ index: m.index, length: m[0].length, groups: m.groups ?? {} });
        if (!flags.includes("g")) break;
      }
      // Build highlighted HTML
      let result = "";
      let cursor = 0;
      const escape = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
      for (const match of matches) {
        result += escape(testString.slice(cursor, match.index));
        result += `<mark class="bg-brand/30 text-foreground rounded px-0.5">${escape(testString.slice(match.index, match.index + match.length))}</mark>`;
        cursor = match.index + match.length;
      }
      result += escape(testString.slice(cursor));
      return { matches, error: "", highlighted: result };
    } catch (e) {
      return { matches: [], error: String(e).replace("SyntaxError: ", ""), highlighted: testString };
    }
  }, [pattern, flags, testString]);

  const toggleFlag = (f: string) => setFlags(prev => prev.includes(f) ? prev.replace(f, "") : prev + f);

  return (
    <div className="space-y-6">
      {/* Pattern input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Regular Expression</Label>
          <Button variant="ghost" size="sm" onClick={() => setShowCheatsheet(s => !s)} className="h-7 text-xs">
            {showCheatsheet ? "Hide" : "Show"} Cheat Sheet
          </Button>
        </div>
        <div className="flex items-center border border-border rounded-xl overflow-hidden bg-muted/30 focus-within:ring-1 focus-within:ring-brand/50">
          <span className="px-3 py-2.5 text-muted-foreground font-mono text-sm border-r border-border select-none">/</span>
          <Input value={pattern} onChange={e => setPattern(e.target.value)} className="border-0 rounded-none font-mono bg-transparent focus-visible:ring-0 h-10" placeholder="Enter regex pattern..." />
          <span className="px-2 py-2.5 text-muted-foreground font-mono text-sm border-l border-border select-none">/</span>
          <div className="flex items-center gap-1 px-2">
            {["g","i","m","s"].map(f => (
              <button key={f} onClick={() => toggleFlag(f)} className={cn("w-6 h-6 rounded text-xs font-mono font-bold transition-colors", flags.includes(f) ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted")}>
                {f}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>}
      </div>

      {/* Cheatsheet */}
      {showCheatsheet && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 rounded-2xl bg-muted/30 border border-border">
          {CHEATSHEET.map(item => (
            <button key={item.pattern} onClick={() => setPattern(p => p + item.pattern)} className="flex items-center gap-2 text-left p-2 rounded-lg hover:bg-muted transition-colors group">
              <code className="text-xs font-mono text-brand bg-brand/10 px-1.5 py-0.5 rounded">{item.pattern}</code>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </button>
          ))}
        </div>
      )}

      {/* Test string */}
      <div className="space-y-2">
        <Label>Test String</Label>
        <textarea
          value={testString}
          onChange={e => setTestString(e.target.value)}
          rows={5}
          className="w-full bg-muted/30 border border-border rounded-2xl p-4 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand/50"
        />
      </div>

      {/* Highlighted matches */}
      {testString && !error && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Matches</Label>
            <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", matches.length > 0 ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground")}>
              {matches.length} match{matches.length !== 1 ? "es" : ""}
            </span>
          </div>
          <div className="p-4 rounded-2xl border border-border bg-background text-sm leading-relaxed font-mono whitespace-pre-wrap break-all" dangerouslySetInnerHTML={{__html: highlighted}} />

          {matches.length > 0 && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {matches.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-brand/5 border border-brand/10">
                  <span className="text-[10px] font-bold text-brand w-14 flex-shrink-0">Match {i+1}</span>
                  <code className="text-xs font-mono flex-1 text-foreground">{testString.slice(m.index, m.index + m.length)}</code>
                  <span className="text-[10px] text-muted-foreground">@{m.index}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
