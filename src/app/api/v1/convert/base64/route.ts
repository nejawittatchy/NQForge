import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const s = new URL(req.url).searchParams;
  const mode = s.get("mode") === "decode" ? "decode" : "encode";
  const input = s.get("input") ?? s.get("text") ?? "";
  const variant = s.get("variant") ?? "standard";

  if (!input) return NextResponse.json({ error: "Missing input parameter" }, { status: 400 });

  try {
    let result: string;
    if (mode === "encode") {
      const bytes = new TextEncoder().encode(input);
      const binString = Array.from(bytes, b => String.fromCodePoint(b)).join("");
      result = btoa(binString);
      if (variant === "url-safe") result = result.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    } else {
      let b64 = input;
      if (variant === "url-safe") {
        b64 = b64.replace(/-/g, "+").replace(/_/g, "/");
        while (b64.length % 4) b64 += "=";
      }
      const binString = atob(b64);
      const bytes = new Uint8Array(binString.length);
      for (let i = 0; i < binString.length; i++) bytes[i] = binString.charCodeAt(i);
      result = new TextDecoder().decode(bytes);
    }
    return NextResponse.json({ result, mode, variant, inputLength: input.length, outputLength: result.length });
  } catch (e) {
    return NextResponse.json({ error: `Failed to ${mode}: ${String(e)}` }, { status: 400 });
  }
}
