import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OMNI | Intelligent Safety & Wellbeing Ecosystem",
  description:
    "OMNI is an AI-powered safety ecosystem that proactively monitors wellbeing, interprets distress, and coordinates emergency response — even when you cannot ask for help.",
  keywords: ["safety", "emergency response", "wellbeing", "wearable", "AI monitoring"],
  authors: [{ name: "OMNI Safety Systems" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
