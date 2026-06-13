import type { Metadata } from "next";
import { Syne, Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/effects/LenisProvider";
import SiteShell from "@/components/effects/SiteShell";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Nexora AI Solutions — AI Employees for Modern Businesses | Kochi, Kerala",
    template: "%s | Nexora AI Solutions",
  },
  description:
    "Kerala's leading AI automation company. We build AI agents for websites, lead nurturing, SEO, sales, recruitment and customer support. Get your AI employee in 24 hours.",
  keywords: [
    "AI Agency Kerala",
    "AI Automation Kochi",
    "Custom AI Agents India",
    "AI Solutions Kerala",
    "AI Development Company Kerala",
    "WhatsApp AI Agent",
    "Lead Nurturing AI",
    "AI Sales Agent Kerala",
    "AI Customer Support",
    "Business Automation Kerala",
  ],
  authors: [{ name: "Nexora AI Solutions" }],
  creator: "Nexora AI Solutions",
  publisher: "Nexora AI Solutions",
  metadataBase: new URL("https://nexora-ai-solutions.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nexora-ai-solutions.vercel.app",
    siteName: "Nexora AI Solutions",
    title: "Nexora AI Solutions — AI Employees for Modern Businesses",
    description:
      "Kerala's leading AI automation company. Custom AI agents for websites, lead nurturing, SEO, sales, recruitment and customer support.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora AI Solutions — AI Employees for Modern Businesses",
    description:
      "Kerala's leading AI automation company. Build, deploy, and scale AI agents for your business.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased" style={{ background: "#0A0F1E" }}>
        <LenisProvider>
          <SiteShell>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SiteShell>
        </LenisProvider>
      </body>
    </html>
  );
}
