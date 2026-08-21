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

export const metadata: Metadata = {
  title: "João Marcos Vilela | Technical Operations Analyst",
  description:
    "I keep production systems running and automate the work that used to be manual. Docker Swarm, Postgres, Next.js — and the monitoring I built myself.",
  alternates: { languages: { en: "/", "pt-BR": "/" } },
  icons: {
    icon: "/favicon.ico",
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