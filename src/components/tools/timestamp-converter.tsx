"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const TIMEZONES = Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone").slice(0, 50) : ["UTC","America/New_York","America/Chicago","America/Denver","America/Los_Angeles","Europe/London","Europe/Paris","Europe/Berlin","Asia/Tokyo","Asia/Shanghai","Asia/Kolkata","Australia/Sydney"];

function formatDate(date: Date, tz: string): Record<string, string> {
  const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...opts, timeZone: tz }).format(date);
  return {
    "ISO 8601": date.toISOString(),
    "RFC 2822": date.toUTCString(),
    "Local Date": fmt({ dateStyle: "full" }),
    "Local Time": fmt({ timeStyle: "long" }),
    "Date + Time": fmt({ dateStyle: "medium", timeStyle: "medium" }),
    "Unix (seconds)": String(Math.floor(date.getTime() / 1000)),
    "Unix (milliseconds)": String(date.getTime()),
    "Unix (nanoseconds)": String(date.getTime() * 1000000),
    "Day of Week": fmt({ weekday: "long" }),
    "Year / Month / Day": `${date.getUTCFullYear()} / ${String(date.getUTCMonth()+1).padStart(2,"0")} / ${String(date.getUTCDate()).padStart(2,"0")}`,
  };
}

export function TimestampConverter() {
  const [input, setInput] = useState(String(Math.floor(Date.now() / 1000)));
  const [inputType, setInputType] = useState<"unix-s" | "unix-ms" | "iso" | "human">("unix-s");
  const [tz, setTz] = useState("UTC");
  const [result, setResult] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    try {
      let date: Date;
      if (inputType === "unix-s") date = new Date(parseFloat(input) * 1000);
      else if (inputType === "unix-ms") date = new Date(parseFloat(input));
      else date = new Date(input);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      setResult(formatDate(date, tz));
    } catch {
      setError("Could not parse input as a valid date/timestamp.");
      setResult({});
    }
  };

  const now = () => {
    setInputType("unix-s");
    setInput(String(Math.floor(Date.now() / 1000)));
  };

  useEffect(() => { convert(); }, []);

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success("Copied!"); };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label>Input</Label>
          <div className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} className="rounded-xl h-11 font-mono" placeholder="e.g. 1700000000 or 2024-01-15T10:30:00Z" />
            <Button variant="outline" onClick={now} className="h-11 px-3 rounded-xl flex-shrink-0" title="Use current time">
              <RefreshCw size={16}/>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Input Format</Label>
          <Select value={inputType} onValueChange={v => setInputType(v as typeof inputType)}>
            <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="unix-s">Unix (seconds)</SelectItem>
              <SelectItem value="unix-ms">Unix (milliseconds)</SelectItem>
              <SelectItem value="iso">ISO 8601</SelectItem>
              <SelectItem value="human">Human-readable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Display Timezone</Label>
        <Select value={tz} onValueChange={(val: any) => setTz(val)}>
          <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
          <SelectContent className="max-h-60">
            {TIMEZONES.map(z => <SelectItem key={z} value={z}>{z}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={convert} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        Convert Timestamp
      </Button>

      {error && <p className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-xl p-4">{error}</p>}

      {Object.keys(result).length > 0 && (
        <div className="space-y-2">
          {Object.entries(result).map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-muted/30 border border-border group hover:bg-muted/50 transition-colors">
              <span className="text-xs text-muted-foreground font-medium w-48 flex-shrink-0">{label}</span>
              <span className="font-mono text-sm text-foreground flex-1 truncate">{value}</span>
              <Button variant="ghost" size="icon" className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copy(value)}>
                <Copy size={12}/>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
