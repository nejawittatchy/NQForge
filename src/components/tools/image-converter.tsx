"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

type TargetFormat = "image/jpeg" | "image/png" | "image/webp";

interface ConvertedFile { name: string; url: string; format: string; sizeBefore: number; sizeAfter: number; }

export function ImageConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>("image/webp");
  const [quality, setQuality] = useState(90);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [converting, setConverting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    setFiles(prev => [...prev, ...dropped]);
  };

  const convert = async () => {
    if (!files.length) return;
    setConverting(true);
    const out: ConvertedFile[] = [];
    for (const file of files) {
      try {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width; canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bitmap, 0, 0);
        const blob = await new Promise<Blob>((res, rej) => canvas.toBlob(b => b ? res(b) : rej(), targetFormat, quality / 100));
        const ext = targetFormat.split("/")[1];
        const url = URL.createObjectURL(blob);
        out.push({ name: file.name.replace(/\.[^.]+$/, `.${ext}`), url, format: ext.toUpperCase(), sizeBefore: file.size, sizeAfter: blob.size });
      } catch { toast.error(`Failed to convert ${file.name}`); }
    }
    setResults(out);
    setConverting(false);
    toast.success(`Converted ${out.length} image${out.length !== 1 ? "s" : ""}`);
  };

  const fmtSize = (b: number) => b > 1024*1024 ? `${(b/1024/1024).toFixed(1)} MB` : `${(b/1024).toFixed(0)} KB`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Target Format</Label>
          <Select value={targetFormat} onValueChange={v => setTargetFormat(v as TargetFormat)}>
            <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="image/webp">WebP (Recommended)</SelectItem>
              <SelectItem value="image/jpeg">JPEG</SelectItem>
              <SelectItem value="image/png">PNG (Lossless)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {targetFormat !== "image/png" && (
          <div className="space-y-2">
            <Label>Quality: {quality}%</Label>
            <input type="range" min={10} max={100} value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full h-11 accent-[oklch(0.6_0.22_264)]" />
          </div>
        )}
      </div>

      <div
        className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-10 text-center cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-colors"
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileRef.current?.click()}
      >
        <ImageIcon className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
        <p className="font-semibold mb-1">Drop images here or click to browse</p>
        <p className="text-sm text-muted-foreground">PNG, JPEG, WebP, GIF — up to 10 files</p>
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files||[])])} />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-3">
                <ImageIcon size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">{f.name}</span>
                <span className="text-xs text-muted-foreground">{fmtSize(f.size)}</span>
              </div>
              <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}>
                <X size={12}/>
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button onClick={convert} disabled={!files.length || converting} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        {converting ? "Converting..." : `Convert ${files.length} Image${files.length !== 1 ? "s" : ""}`}
      </Button>

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Converted Files</h3>
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-green-500/5 border border-green-500/20">
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{fmtSize(r.sizeBefore)} → {fmtSize(r.sizeAfter)} ({((1 - r.sizeAfter/r.sizeBefore)*100).toFixed(0)}% smaller)</p>
              </div>
              <a href={r.url} download={r.name}>
                <Button size="sm" variant="outline" className="rounded-lg h-8 text-xs"><Download className="mr-1 w-3 h-3"/>Download</Button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
