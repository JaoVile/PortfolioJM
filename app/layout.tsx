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
  title: "João Vilela | Desenvolvedor Full Stack",
  description: "Portfólio de João Vilela. Especialista em React, Next.js e Python.",
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
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeScript />
        <div className="noise-overlay" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}