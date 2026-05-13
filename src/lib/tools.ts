export type ToolCategory =
  | "generators"
  | "converters"
  | "developer"
  | "calculators"
  | "encoders"
  | "ai";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  icon: string;
  tags: string[];
  trending?: boolean;
  isNew?: boolean;
  apiSupported: boolean;
  apiEndpoint?: string;
}

export const TOOLS: Tool[] = [
  /* ── Generators ─────────────────────────────────────── */
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate cryptographically secure UUIDs (v1, v4, v7) instantly.",
    longDescription:
      "Generate universally unique identifiers (UUIDs) in multiple versions. Perfect for database keys, session IDs, and distributed system identifiers. Supports bulk generation with one click.",
    category: "generators",
    icon: "Fingerprint",
    tags: ["uuid", "guid", "unique-id", "random"],
    trending: true,
    apiSupported: true,
    apiEndpoint: "/api/v1/generate/uuid",
  },
  {
    id: "password-generator",
    slug: "password-generator",
    name: "Password Generator",
    description: "Create strong, secure passwords with full customization.",
    longDescription:
      "Generate cryptographically secure passwords with configurable length, character sets, symbols, and numbers. Includes strength meter and entropy calculation.",
    category: "generators",
    icon: "Lock",
    tags: ["password", "security", "random", "strong"],
    trending: true,
    apiSupported: true,
    apiEndpoint: "/api/v1/generate/password",
  },
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, contact info, and more.",
    longDescription:
      "Create beautiful, high-resolution QR codes for any text, URL, WiFi credentials, or vCard. Download as PNG or SVG with custom colors and error correction levels.",
    category: "generators",
    icon: "QrCode",
    tags: ["qr", "qr-code", "barcode", "scan"],
    trending: true,
    apiSupported: true,
    apiEndpoint: "/api/v1/generate/qrcode",
  },
  {
    id: "lorem-ipsum-generator",
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text in paragraphs, sentences, or words.",
    longDescription:
      "Generate classic Lorem Ipsum or randomized placeholder text in configurable amounts. Perfect for design mockups, prototypes, and testing layouts.",
    category: "generators",
    icon: "AlignLeft",
    tags: ["lorem", "ipsum", "placeholder", "text", "dummy"],
    apiSupported: true,
    apiEndpoint: "/api/v1/generate/lorem",
  },
  {
    id: "fake-user-generator",
    slug: "fake-user-generator",
    name: "Fake User Generator",
    description: "Generate realistic fake user profiles for testing and prototyping.",
    longDescription:
      "Generate realistic fake user profiles with names, emails, addresses, avatars, and more. Export as JSON, CSV, or SQL. Perfect for seeding databases and testing.",
    category: "generators",
    icon: "Users",
    tags: ["fake", "mock", "user", "profile", "test-data"],
    isNew: true,
    apiSupported: true,
    apiEndpoint: "/api/v1/generate/user",
  },

  /* ── Converters ─────────────────────────────────────── */
  {
    id: "json-xml-converter",
    slug: "json-xml-converter",
    name: "JSON ↔ XML Converter",
    description: "Seamlessly convert between JSON and XML formats with formatting.",
    longDescription:
      "Bidirectional conversion between JSON and XML with pretty-printing, validation, and minification. Handles nested structures, arrays, and attributes correctly.",
    category: "converters",
    icon: "ArrowLeftRight",
    tags: ["json", "xml", "convert", "transform"],
    trending: true,
    apiSupported: true,
    apiEndpoint: "/api/v1/convert/json-xml",
  },
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 strings and files instantly.",
    longDescription:
      "Encode text or binary data to Base64 and decode Base64 back to readable text or files. Supports URL-safe Base64, file encoding, and chunked output.",
    category: "converters",
    icon: "Binary",
    tags: ["base64", "encode", "decode", "binary"],
    apiSupported: true,
    apiEndpoint: "/api/v1/convert/base64",
  },
  {
    id: "markdown-html-converter",
    slug: "markdown-html-converter",
    name: "Markdown ↔ HTML Converter",
    description: "Convert Markdown to HTML and back with live preview.",
    longDescription:
      "Bidirectional Markdown and HTML conversion with syntax highlighting, GFM support, and live preview. Export clean, semantic HTML or compact Markdown.",
    category: "converters",
    icon: "FileCode",
    tags: ["markdown", "html", "convert", "preview"],
    apiSupported: true,
    apiEndpoint: "/api/v1/convert/markdown",
  },
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and vice versa.",
    longDescription:
      "Convert Unix timestamps (seconds, milliseconds, nanoseconds) to human-readable dates in any timezone. Supports ISO 8601, RFC 2822, and custom formats.",
    category: "converters",
    icon: "Clock",
    tags: ["timestamp", "unix", "date", "time", "epoch"],
    apiSupported: true,
    apiEndpoint: "/api/v1/convert/timestamp",
  },
  {
    id: "image-converter",
    slug: "image-converter",
    name: "Image Converter",
    description: "Convert images between PNG, JPEG, WebP, and more formats.",
    longDescription:
      "Convert images between formats with quality and size controls. Supports PNG, JPEG, WebP, AVIF, and GIF. Bulk conversion with ZIP download.",
    category: "converters",
    icon: "ImageIcon",
    tags: ["image", "png", "jpg", "webp", "convert"],
    isNew: true,
    apiSupported: false,
  },

  /* ── Developer Tools ─────────────────────────────────── */
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON with syntax highlighting.",
    longDescription:
      "Format and validate JSON with configurable indentation, syntax highlighting, error detection, and path navigation. Minify or beautify with one click.",
    category: "developer",
    icon: "Braces",
    tags: ["json", "format", "validate", "minify", "beautify"],
    trending: true,
    apiSupported: true,
    apiEndpoint: "/api/v1/dev/json-format",
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JWT tokens — header, payload, and signature.",
    longDescription:
      "Decode JSON Web Tokens to inspect header, payload, and verify claims. Shows expiry, issuer, and all JWT claims in a clean, readable format.",
    category: "developer",
    icon: "Key",
    tags: ["jwt", "token", "decode", "auth", "bearer"],
    apiSupported: true,
    apiEndpoint: "/api/v1/dev/jwt-decode",
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes for any text.",
    longDescription:
      "Generate cryptographic hashes using MD5, SHA-1, SHA-256, SHA-384, SHA-512, and bcrypt. Compare hashes and verify data integrity instantly.",
    category: "developer",
    icon: "Hash",
    tags: ["hash", "md5", "sha256", "sha512", "checksum"],
    apiSupported: true,
    apiEndpoint: "/api/v1/dev/hash",
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with live match highlighting.",
    longDescription:
      "Test regular expressions with real-time match highlighting, group capture display, and flag support (g, i, m, s, u). Includes a regex cheat sheet.",
    category: "developer",
    icon: "Search",
    tags: ["regex", "regexp", "pattern", "match", "test"],
    apiSupported: false,
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description: "Encode and decode URLs and query strings instantly.",
    longDescription:
      "Percent-encode and decode URLs, query strings, and URI components. Handles full URLs, query parameters, and special characters correctly.",
    category: "developer",
    icon: "Link",
    tags: ["url", "encode", "decode", "query", "percent"],
    apiSupported: true,
    apiEndpoint: "/api/v1/dev/url-encode",
  },
];

export const CATEGORIES: Record<ToolCategory, { label: string; description: string; icon: string }> = {
  generators: {
    label: "Generators",
    description: "Create UUIDs, passwords, QR codes, and more",
    icon: "Sparkles",
  },
  converters: {
    label: "Converters",
    description: "Transform data between formats seamlessly",
    icon: "ArrowLeftRight",
  },
  developer: {
    label: "Developer Tools",
    description: "Format, validate, and debug code",
    icon: "Code",
  },
  calculators: {
    label: "Calculators",
    description: "Math, finance, and measurement calculators",
    icon: "Calculator",
  },
  encoders: {
    label: "Encoders",
    description: "Encode, decode, and transform data",
    icon: "Binary",
  },
  ai: {
    label: "AI Utilities",
    description: "AI-powered text and content tools",
    icon: "Bot",
  },
};

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getTrendingTools(): Tool[] {
  return TOOLS.filter((t) => t.trending);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.includes(q))
  );
}

export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return TOOLS.filter(
    (t) => t.id !== tool.id && (t.category === tool.category || t.tags.some((tag) => tool.tags.includes(tag)))
  ).slice(0, limit);
}
