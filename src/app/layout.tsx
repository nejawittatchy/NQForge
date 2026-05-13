import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nqforge.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NQ Forge – Smart Utilities & Developer APIs",
    template: "%s | NQ Forge",
  },
  description:
    "NQ Forge by NOYEQ — a modern utility ecosystem and API platform for developers, creators, and businesses. Generate, convert, and build faster.",
  keywords: [
    "developer tools",
    "api platform",
    "utilities",
    "uuid generator",
    "json formatter",
    "base64 encoder",
    "qr code generator",
    "password generator",
    "nqforge",
    "noyeq",
  ],
  authors: [{ name: "NOYEQ", url: siteUrl }],
  creator: "NOYEQ",
  publisher: "NOYEQ",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NQ Forge",
    title: "NQ Forge – Smart Utilities & Developer APIs",
    description:
      "Modern utilities and scalable APIs for developers, creators, and businesses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NQ Forge – Smart Utilities & Developer APIs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NQ Forge – Smart Utilities & Developer APIs",
    description:
      "Modern utilities and scalable APIs for developers, creators, and businesses.",
    images: ["/og-image.png"],
    creator: "@noyeq",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#161618" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <TooltipProvider delayDuration={200}>
            {children}
            <Toaster richColors position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
