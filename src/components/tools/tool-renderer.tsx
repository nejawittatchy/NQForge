"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-24">
    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
  </div>
);

const UuidGenerator = dynamic(() => import("./uuid-generator").then(m => ({ default: m.UuidGenerator })), { loading: LoadingFallback });
const PasswordGenerator = dynamic(() => import("./password-generator").then(m => ({ default: m.PasswordGenerator })), { loading: LoadingFallback });
const QrCodeGenerator = dynamic(() => import("./qr-code-generator").then(m => ({ default: m.QrCodeGenerator })), { loading: LoadingFallback });
const LoremIpsumGenerator = dynamic(() => import("./lorem-ipsum-generator").then(m => ({ default: m.LoremIpsumGenerator })), { loading: LoadingFallback });
const FakeUserGenerator = dynamic(() => import("./fake-user-generator").then(m => ({ default: m.FakeUserGenerator })), { loading: LoadingFallback });
const JsonXmlConverter = dynamic(() => import("./json-xml-converter").then(m => ({ default: m.JsonXmlConverter })), { loading: LoadingFallback });
const Base64Encoder = dynamic(() => import("./base64-encoder").then(m => ({ default: m.Base64Encoder })), { loading: LoadingFallback });
const MarkdownHtmlConverter = dynamic(() => import("./markdown-html-converter").then(m => ({ default: m.MarkdownHtmlConverter })), { loading: LoadingFallback });
const TimestampConverter = dynamic(() => import("./timestamp-converter").then(m => ({ default: m.TimestampConverter })), { loading: LoadingFallback });
const ImageConverter = dynamic(() => import("./image-converter").then(m => ({ default: m.ImageConverter })), { loading: LoadingFallback });
const JsonFormatter = dynamic(() => import("./json-formatter").then(m => ({ default: m.JsonFormatter })), { loading: LoadingFallback });
const JwtDecoder = dynamic(() => import("./jwt-decoder").then(m => ({ default: m.JwtDecoder })), { loading: LoadingFallback });
const HashGenerator = dynamic(() => import("./hash-generator").then(m => ({ default: m.HashGenerator })), { loading: LoadingFallback });
const RegexTester = dynamic(() => import("./regex-tester").then(m => ({ default: m.RegexTester })), { loading: LoadingFallback });
const UrlEncoder = dynamic(() => import("./url-encoder").then(m => ({ default: m.UrlEncoder })), { loading: LoadingFallback });

const TOOL_MAP: Record<string, React.ComponentType> = {
  "uuid-generator": UuidGenerator,
  "password-generator": PasswordGenerator,
  "qr-code-generator": QrCodeGenerator,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "fake-user-generator": FakeUserGenerator,
  "json-xml-converter": JsonXmlConverter,
  "base64-encoder": Base64Encoder,
  "markdown-html-converter": MarkdownHtmlConverter,
  "timestamp-converter": TimestampConverter,
  "image-converter": ImageConverter,
  "json-formatter": JsonFormatter,
  "jwt-decoder": JwtDecoder,
  "hash-generator": HashGenerator,
  "regex-tester": RegexTester,
  "url-encoder": UrlEncoder,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = TOOL_MAP[slug];
  if (!Component) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p className="text-lg font-medium">Tool UI coming soon</p>
        <p className="text-sm mt-2">This tool is currently in development.</p>
      </div>
    );
  }
  return <Component />;
}
