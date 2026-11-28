import type { Metadata } from "next";
import { headers } from "next/headers";
import { IconSprite } from "@/components/icon-sprite";
import { JsonLd } from "@/components/json-ld";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary", title: SITE_TITLE, description: SITE_DESCRIPTION },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/assets/favicon/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/assets/favicon/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Reading headers opts the page into per-request rendering, which is what lets
  // Next.js attach the CSP nonce from proxy.ts to its scripts.
  await headers();
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <IconSprite />
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
