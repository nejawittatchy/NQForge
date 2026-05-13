"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Check, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const charset = {
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
    };

    let chars = "";
    if (includeUpper) chars += charset.upper;
    if (includeLower) chars += charset.lower;
    if (includeNumbers) chars += charset.numbers;
    if (includeSymbols) chars += charset.symbols;

    if (!chars) {
      setPassword("");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
    setPassword(result);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { label: "Very Weak", color: "text-red-500", bg: "bg-red-500", icon: ShieldAlert, width: "20%" };
    if (length < 12) return { label: "Weak", color: "text-orange-500", bg: "bg-orange-500", icon: ShieldAlert, width: "40%" };
    
    let entropy = 0;
    if (includeLower) entropy += 26;
    if (includeUpper) entropy += 26;
    if (includeNumbers) entropy += 10;
    if (includeSymbols) entropy += 32;
    
    const strength = length * Math.log2(entropy || 1);
    
    if (strength < 60) return { label: "Fair", color: "text-yellow-500", bg: "bg-yellow-500", icon: Shield, width: "60%" };
    if (strength < 80) return { label: "Strong", color: "text-green-500", bg: "bg-green-500", icon: ShieldCheck, width: "80%" };
    return { label: "Very Strong", color: "text-brand", bg: "bg-brand", icon: ShieldCheck, width: "100%" };
  };

  const strength = getStrength();

  return (
    <div className="space-y-8">
      {/* Password Display */}
      <div className="relative group">
        <div className="absolute inset-0 brand-gradient opacity-10 blur-xl group-hover:opacity-15 transition-opacity" />
        <div className="relative flex items-center bg-card border-2 border-border rounded-2xl h-20 px-6 shadow-sm group-hover:border-brand/30 transition-all">
          <div className="flex-1 overflow-hidden">
            <span className={cn(
              "font-mono text-2xl md:text-3xl tracking-wider select-all break-all whitespace-nowrap overflow-hidden block",
              !password && "text-muted-foreground"
            )}>
              {password || "No options selected"}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="icon" onClick={generate} className="w-10 h-10 rounded-xl hover:bg-brand/10 hover:text-brand">
              <RefreshCw className="w-5 h-5" />
            </Button>
            <Button size="icon" onClick={copyToClipboard} className="w-10 h-10 rounded-xl brand-gradient text-white border-0">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Strength Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <strength.icon size={16} className={strength.color} />
            <span className={cn("text-sm font-bold", strength.color)}>{strength.label}</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Strength Meter</span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            className={cn("h-full", strength.bg)} 
            initial={{ width: 0 }}
            animate={{ width: strength.width }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4">
        {/* Settings */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-bold">Length: <span className="text-brand ml-1">{length}</span></Label>
              <span className="text-xs text-muted-foreground">8 - 64 characters</span>
            </div>
            <Slider 
              value={[length]} 
              min={8} 
              max={64} 
              step={1} 
              onValueChange={(val) => setLength(val[0])}
              className="py-4"
            />
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Uppercase", state: includeUpper, setter: setIncludeUpper },
            { label: "Lowercase", state: includeLower, setter: setIncludeLower },
            { label: "Numbers", state: includeNumbers, setter: setIncludeNumbers },
            { label: "Symbols", state: includeSymbols, setter: setIncludeSymbols },
          ].map((opt) => (
            <div key={opt.label} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30">
              <Label className="text-sm font-medium cursor-pointer" onClick={() => opt.setter(!opt.state)}>{opt.label}</Label>
              <Switch checked={opt.state} onCheckedChange={opt.setter} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
