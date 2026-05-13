import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4, v1 as uuidv1, v7 as uuidv7 } from "uuid";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const version = searchParams.get("version") ?? "v4";
  const count = Math.min(100, Math.max(1, parseInt(searchParams.get("count") ?? "1") || 1));

  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    if (version === "v1") uuids.push(uuidv1());
    else if (version === "v7") uuids.push(uuidv7());
    else uuids.push(uuidv4());
  }

  return NextResponse.json({
    uuids,
    version,
    count,
    generatedAt: new Date().toISOString(),
  });
}
