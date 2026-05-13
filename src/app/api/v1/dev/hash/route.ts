import { NextRequest, NextResponse } from "next/server";

function formatHash(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function GET(req: NextRequest) {
  const s = new URL(req.url).searchParams;
  const input = s.get("input") ?? s.get("text") ?? "";
  const algo = (s.get("algo") ?? "sha256").toLowerCase();

  if (!input) return NextResponse.json({ error: "Missing input parameter" }, { status: 400 });

  const algoMap: Record<string, string> = { sha1: "SHA-1", sha256: "SHA-256", sha384: "SHA-384", sha512: "SHA-512" };
  const webCryptoAlgo = algoMap[algo];
  if (!webCryptoAlgo) return NextResponse.json({ error: `Unsupported algorithm. Use: ${Object.keys(algoMap).join(", ")}` }, { status: 400 });

  try {
    const encoded = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest(webCryptoAlgo, encoded);
    const hash = formatHash(hashBuffer);
    return NextResponse.json({ hash, algorithm: webCryptoAlgo, inputLength: input.length, bits: hashBuffer.byteLength * 8 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
