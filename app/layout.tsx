import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import client from "@/tina/__generated__/client";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { siteUrl } from "@/lib/site";

const heading = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading-face",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "National Black United Front – Kansas City",
    template: "%s · NBUF-KC",
  },
  description:
    "The National Black United Front – Kansas City organizes for self-determination, liberation, and power for African people in Kansas City and across the diaspora.",
  openGraph: {
    type: "website",
    siteName: "National Black United Front – Kansas City",
    title: "National Black United Front – Kansas City",
    description:
      "Self-determination, liberation, and power for African people in Kansas City and across the diaspora.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data } = await client.queries.siteSettings({
    relativePath: "index.json",
  });
  const settings = data.siteSettings;

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader settings={settings} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
