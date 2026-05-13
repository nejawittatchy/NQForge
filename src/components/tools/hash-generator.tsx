"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

type Algorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512" | "MD5";

async function hashText(text: string, algo: Algorithm): Promise<string> {
  if (algo === "MD5") {
    // Pure-JS MD5
    function md5(input: string): string {
      function safeAdd(x: number, y: number) { const lsw=(x&0xFFFF)+(y&0xFFFF); return (((x>>16)+(y>>16)+(lsw>>16))<<16)|(lsw&0xFFFF); }
      function bitRotateLeft(num: number, cnt: number) { return (num<<cnt)|(num>>>(32-cnt)); }
      function md5cmn(q: number,a: number,b: number,x: number,s: number,t: number) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b); }
      function md5ff(a: number,b: number,c: number,d: number,x: number,s: number,t: number){return md5cmn((b&c)|((~b)&d),a,b,x,s,t);}
      function md5gg(a: number,b: number,c: number,d: number,x: number,s: number,t: number){return md5cmn((b&d)|(c&(~d)),a,b,x,s,t);}
      function md5hh(a: number,b: number,c: number,d: number,x: number,s: number,t: number){return md5cmn(b^c^d,a,b,x,s,t);}
      function md5ii(a: number,b: number,c: number,d: number,x: number,s: number,t: number){return md5cmn(c^(b|(~d)),a,b,x,s,t);}
      function str2binl(str: string) {
        const bin: number[] = [];
        const mask = (1<<8)-1;
        for(let i=0;i<str.length*8;i+=8) bin[i>>5]|=(str.charCodeAt(i/8)&mask)<<(i%32);
        return bin;
      }
      function binl2hex(binarray: number[]) {
        let hex=""; const hexTab="0123456789abcdef";
        for(let i=0;i<binarray.length*4;i++) hex+=hexTab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+hexTab.charAt((binarray[i>>2]>>((i%4)*8))&0xF);
        return hex;
      }
      function core_md5(x: number[], len: number) {
        x[len>>5]|=0x80<<(len%32); x[(((len+64)>>>9)<<4)+14]=len;
        let a=1732584193,b=-271733879,c=-1732584194,d=271733878;
        for(let i=0;i<x.length;i+=16){
          const olda=a,oldb=b,oldc=c,oldd=d;
          a=md5ff(a,b,c,d,x[i],7,-680876936); d=md5ff(d,a,b,c,x[i+1],12,-389564586); c=md5ff(c,d,a,b,x[i+2],17,606105819); b=md5ff(b,c,d,a,x[i+3],22,-1044525330);
          a=md5ff(a,b,c,d,x[i+4],7,-176418897); d=md5ff(d,a,b,c,x[i+5],12,1200080426); c=md5ff(c,d,a,b,x[i+6],17,-1473231341); b=md5ff(b,c,d,a,x[i+7],22,-45705983);
          a=md5ff(a,b,c,d,x[i+8],7,1770035416); d=md5ff(d,a,b,c,x[i+9],12,-1958414417); c=md5ff(c,d,a,b,x[i+10],17,-42063); b=md5ff(b,c,d,a,x[i+11],22,-1990404162);
          a=md5ff(a,b,c,d,x[i+12],7,1804603682); d=md5ff(d,a,b,c,x[i+13],12,-40341101); c=md5ff(c,d,a,b,x[i+14],17,-1502002290); b=md5ff(b,c,d,a,x[i+15],22,1236535329);
          a=md5gg(a,b,c,d,x[i+1],5,-165796510); d=md5gg(d,a,b,c,x[i+6],9,-1069501632); c=md5gg(c,d,a,b,x[i+11],14,643717713); b=md5gg(b,c,d,a,x[i],20,-373897302);
          a=md5gg(a,b,c,d,x[i+5],5,-701558691); d=md5gg(d,a,b,c,x[i+10],9,38016083); c=md5gg(c,d,a,b,x[i+15],14,-660478335); b=md5gg(b,c,d,a,x[i+4],20,-405537848);
          a=md5gg(a,b,c,d,x[i+9],5,568446438); d=md5gg(d,a,b,c,x[i+14],9,-1019803690); c=md5gg(c,d,a,b,x[i+3],14,-187363961); b=md5gg(b,c,d,a,x[i+8],20,1163531501);
          a=md5gg(a,b,c,d,x[i+13],5,-1444681467); d=md5gg(d,a,b,c,x[i+2],9,-51403784); c=md5gg(c,d,a,b,x[i+7],14,1735328473); b=md5gg(b,c,d,a,x[i+12],20,-1926607734);
          a=md5hh(a,b,c,d,x[i+5],4,-378558); d=md5hh(d,a,b,c,x[i+8],11,-2022574463); c=md5hh(c,d,a,b,x[i+11],16,1839030562); b=md5hh(b,c,d,a,x[i+14],23,-35309556);
          a=md5hh(a,b,c,d,x[i+1],4,-1530992060); d=md5hh(d,a,b,c,x[i+4],11,1272893353); c=md5hh(c,d,a,b,x[i+7],16,-155497632); b=md5hh(b,c,d,a,x[i+10],23,-1094730640);
          a=md5hh(a,b,c,d,x[i+13],4,681279174); d=md5hh(d,a,b,c,x[i],11,-358537222); c=md5hh(c,d,a,b,x[i+3],16,-722521979); b=md5hh(b,c,d,a,x[i+6],23,76029189);
          a=md5hh(a,b,c,d,x[i+9],4,-640364487); d=md5hh(d,a,b,c,x[i+12],11,-421815835); c=md5hh(c,d,a,b,x[i+15],16,530742520); b=md5hh(b,c,d,a,x[i+2],23,-995338651);
          a=md5ii(a,b,c,d,x[i],6,-198630844); d=md5ii(d,a,b,c,x[i+7],10,1126891415); c=md5ii(c,d,a,b,x[i+14],15,-1416354905); b=md5ii(b,c,d,a,x[i+5],21,-57434055);
          a=md5ii(a,b,c,d,x[i+12],6,1700485571); d=md5ii(d,a,b,c,x[i+3],10,-1894986606); c=md5ii(c,d,a,b,x[i+10],15,-1051523); b=md5ii(b,c,d,a,x[i+1],21,-2054922799);
          a=md5ii(a,b,c,d,x[i+8],6,1873313359); d=md5ii(d,a,b,c,x[i+15],10,-30611744); c=md5ii(c,d,a,b,x[i+6],15,-1560198380); b=md5ii(b,c,d,a,x[i+13],21,1309151649);
          a=md5ii(a,b,c,d,x[i+4],6,-145523070); d=md5ii(d,a,b,c,x[i+11],10,-1120210379); c=md5ii(c,d,a,b,x[i+2],15,718787259); b=md5ii(b,c,d,a,x[i+9],21,-343485551);
          a=safeAdd(a,olda); b=safeAdd(b,oldb); c=safeAdd(c,oldc); d=safeAdd(d,oldd);
        }
        return [a,b,c,d];
      }
      return binl2hex(core_md5(str2binl(input), input.length*8));
    }
    return md5(input);
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

const ALGOS: Algorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export function HashGenerator() {
  const [input, setInput] = useState("Hello, NQ Forge!");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const generate = async () => {
    setLoading(true);
    const results: Record<string, string> = {};
    for (const algo of ALGOS) {
      results[algo] = await hashText(input, algo);
    }
    setHashes(results);
    setLoading(false);
  };

  const copy = async (algo: string, hash: string) => {
    await navigator.clipboard.writeText(hash);
    setCopied(algo); toast.success(`${algo} hash copied!`);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Input Text</Label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={4}
          className="w-full bg-muted/30 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-brand/50"
          placeholder="Enter text to hash..."
        />
        <p className="text-[10px] text-muted-foreground px-1">{input.length} characters · {new TextEncoder().encode(input).length} bytes</p>
      </div>

      <Button onClick={generate} disabled={!input || loading} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        {loading ? "Computing..." : "Generate All Hashes"}
      </Button>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3">
          {ALGOS.map(algo => (
            <div key={algo} className="rounded-2xl border border-border bg-muted/30 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                <span className="text-xs font-bold font-mono text-muted-foreground">{algo}</span>
                <span className="text-[10px] text-muted-foreground">{(hashes[algo]?.length ?? 0) * 4} bits</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <code className="text-xs font-mono flex-1 break-all text-foreground leading-relaxed">{hashes[algo]}</code>
                <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0" onClick={() => copy(algo, hashes[algo])}>
                  {copied === algo ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
