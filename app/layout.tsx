import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "../src/components/SmoothScroll";
import { ThemeScript } from "../src/components/ThemeScript";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

/**
 * Em inglês porque o site abre em inglês — o seletor PT é client-side e a
 * metadata é servida antes dele existir, então ela segue o idioma padrão.
 */
export const metadata: Metadata = {
  title: "João Vilela | Full-Stack Developer & AI-Augmented Engineer",
  description:
    "I build and operate the integrations that connect business systems to WhatsApp, and the multi-agent AI that answers through them. TypeScript, Python, Postgres, Docker.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "João Vilela | Full-Stack Developer & AI-Augmented Engineer",
    description:
      "Integrations that connect business systems to WhatsApp, and the multi-agent AI that answers through them.",
    type: "profile",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeScript />
        <div className="noise-overlay" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}