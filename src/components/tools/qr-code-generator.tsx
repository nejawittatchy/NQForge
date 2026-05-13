"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export function QrCodeGenerator() {
  const [text, setText] = useState("https://nqforge.com");
  const [size, setSize] = useState(300);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>("M");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = async () => {
    if (!canvasRef.current || !text.trim()) return;
    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        errorCorrectionLevel: errorLevel,
        color: { dark: fgColor, light: bgColor },
        margin: 2,
      });
    } catch {
      toast.error("Failed to generate QR code. Check your input.");
    }
  };

  useEffect(() => { generate(); }, [text, size, errorLevel, fgColor, bgColor]);

  const download = (format: "png" | "svg") => {
    if (format === "png" && canvasRef.current) {
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
      toast.success("QR code downloaded as PNG");
    } else if (format === "svg") {
      QRCode.toString(text, { type: "svg", errorCorrectionLevel: errorLevel }, (err, svg) => {
        if (err) return;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.download = `qrcode-${Date.now()}.svg`;
        link.href = URL.createObjectURL(blob);
        link.click();
        toast.success("QR code downloaded as SVG");
      });
    }
  };

  const copyDataUrl = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        toast.success("QR code copied to clipboard");
      } catch {
        toast.error("Copy failed — use download instead");
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Content to encode</Label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL, text, email, phone..."
          className="rounded-xl h-11"
        />
        <p className="text-[10px] text-muted-foreground px-1">Supports URLs, plain text, WiFi credentials, vCard, and more.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Size (px)</Label>
          <Select value={String(size)} onValueChange={(v) => setSize(Number(v))}>
            <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="200">200px</SelectItem>
              <SelectItem value="300">300px</SelectItem>
              <SelectItem value="400">400px</SelectItem>
              <SelectItem value="512">512px</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Error Correction</Label>
          <Select value={errorLevel} onValueChange={(v) => setErrorLevel(v as ErrorCorrectionLevel)}>
            <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="L">L – Low (7%)</SelectItem>
              <SelectItem value="M">M – Medium (15%)</SelectItem>
              <SelectItem value="Q">Q – Quartile (25%)</SelectItem>
              <SelectItem value="H">H – High (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Foreground</Label>
          <div className="flex items-center gap-2 h-10 px-3 border border-input rounded-xl bg-background">
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0" />
            <span className="text-sm font-mono text-muted-foreground">{fgColor}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Background</Label>
          <div className="flex items-center gap-2 h-10 px-3 border border-input rounded-xl bg-background">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0" />
            <span className="text-sm font-mono text-muted-foreground">{bgColor}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-8 flex-col sm:flex-row">
        <div className="flex-shrink-0 p-4 rounded-2xl border border-border bg-white shadow-sm mx-auto sm:mx-0">
          <canvas ref={canvasRef} className="block" />
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="font-semibold text-sm">Actions</h3>
          <Button className="w-full brand-gradient text-white border-0 h-11 rounded-xl font-semibold shadow-lg shadow-brand/20" onClick={generate}>
            <RefreshCw className="mr-2 w-4 h-4" /> Regenerate
          </Button>
          <Button variant="outline" className="w-full h-11 rounded-xl" onClick={() => download("png")}>
            <Download className="mr-2 w-4 h-4" /> Download PNG
          </Button>
          <Button variant="outline" className="w-full h-11 rounded-xl" onClick={() => download("svg")}>
            <Download className="mr-2 w-4 h-4" /> Download SVG
          </Button>
          <Button variant="ghost" className="w-full h-11 rounded-xl" onClick={copyDataUrl}>
            <Copy className="mr-2 w-4 h-4" /> Copy Image
          </Button>

          <div className="mt-4 p-4 rounded-xl bg-muted/50 space-y-1 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">Characters:</span> {text.length}</p>
            <p><span className="font-semibold text-foreground">Error Correction:</span> {errorLevel} level ({errorLevel === "L" ? "7%" : errorLevel === "M" ? "15%" : errorLevel === "Q" ? "25%" : "30%"} recovery)</p>
            <p><span className="font-semibold text-foreground">Output Size:</span> {size}×{size}px</p>
          </div>
        </div>
      </div>
    </div>
  );
}
