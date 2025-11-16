import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} · Haute gastronomie africaine à Abidjan`,
  description: siteConfig.description,
  metadataBase: new URL("https://maisonlagune.local"),
  openGraph: {
    title: `${siteConfig.name} · Haute gastronomie africaine à Abidjan`,
    description: siteConfig.description,
    locale: "fr_FR",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-[#050505] text-zinc-50`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
