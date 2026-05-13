"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4, v1 as uuidv1, v7 as uuidv7 } from "uuid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Check, Download } from "lucide-react";
import { toast } from "sonner";

export function UuidGenerator() {
  const [version, setVersion] = useState("v4");
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      if (version === "v1") newUuids.push(uuidv1());
      else if (version === "v7") newUuids.push(uuidv7());
      else newUuids.push(uuidv4());
    }
    setUuids(newUuids);
  };

  useEffect(() => {
    generate();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    toast.success("UUIDs copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>UUID Version</Label>
          <Select value={version} onValueChange={(val: any) => setVersion(val)}>
            <SelectTrigger className="rounded-xl h-11">
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v4">Version 4 (Random)</SelectItem>
              <SelectItem value="v7">Version 7 (Time-ordered)</SelectItem>
              <SelectItem value="v1">Version 1 (Timestamp)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-[10px] text-muted-foreground px-1">
            {version === "v4" && "Default choice. Cryptographically secure random UUID."}
            {version === "v7" && "Recommended for database keys. Better indexing performance."}
            {version === "v1" && "Based on timestamp and MAC address."}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Count</Label>
          <Input 
            type="number" 
            min={1} 
            max={100} 
            value={count} 
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="rounded-xl h-11"
          />
          <p className="text-[10px] text-muted-foreground px-1">Max 100 per generation.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={generate} className="brand-gradient text-white border-0 flex-1 h-12 font-bold rounded-xl shadow-lg shadow-brand/20">
          <RefreshCw className="mr-2 w-4 h-4" />
          Generate UUIDs
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Output</Label>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={downloadTxt} className="h-8 text-xs font-semibold">
              <Download className="mr-1.5 w-3.5 h-3.5" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 text-xs font-semibold rounded-lg">
              {copied ? <Check className="mr-1.5 w-3.5 h-3.5 text-green-500" /> : <Copy className="mr-1.5 w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy All"}
            </Button>
          </div>
        </div>
        
        <div className="relative group">
          <textarea
            readOnly
            value={uuids.join("\n")}
            rows={Math.max(5, Math.min(15, count))}
            className="w-full bg-muted/30 border border-border rounded-2xl p-5 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand/50 transition-all"
          />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="px-2 py-1 bg-brand text-white text-[10px] font-bold rounded-md">
              {uuids.length} Generated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
