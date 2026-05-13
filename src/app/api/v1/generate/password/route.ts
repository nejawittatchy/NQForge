import { NextRequest, NextResponse } from "next/server";

const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function generatePassword(length: number, opts: { upper: boolean; lower: boolean; digits: boolean; symbols: boolean }): string {
  let charset = "";
  if (opts.upper) charset += CHARS.upper;
  if (opts.lower) charset += CHARS.lower;
  if (opts.digits) charset += CHARS.digits;
  if (opts.symbols) charset += CHARS.symbols;
  if (!charset) charset = CHARS.lower + CHARS.digits;

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, n => charset[n % charset.length]).join("");
}

function entropy(length: number, charsetSize: number) {
  return +(length * Math.log2(charsetSize)).toFixed(1);
}

function strength(e: number) {
  if (e < 40) return "weak";
  if (e < 60) return "fair";
  if (e < 80) return "strong";
  return "very_strong";
}

export async function GET(req: NextRequest) {
  const s = new URL(req.url).searchParams;
  const length = Math.min(128, Math.max(4, parseInt(s.get("length") ?? "16") || 16));
  const count = Math.min(50, Math.max(1, parseInt(s.get("count") ?? "1") || 1));
  const upper = s.get("upper") !== "false";
  const lower = s.get("lower") !== "false";
  const digits = s.get("digits") !== "false";
  const symbols = s.get("symbols") === "true";

  const passwords = Array.from({ length: count }, () => generatePassword(length, { upper, lower, digits, symbols }));
  const charsetSize = (upper ? 26 : 0) + (lower ? 26 : 0) + (digits ? 10 : 0) + (symbols ? 28 : 0) || 36;
  const e = entropy(length, charsetSize);

  return NextResponse.json({ passwords, entropy: e, strength: strength(e), count });
}
