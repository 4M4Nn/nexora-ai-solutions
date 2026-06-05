import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Nexora AI Solutions — AI Employees for Modern Businesses | Kochi, Kerala",
    template: "%s | Nexora AI Solutions",
  },
  description:
    "Nexora AI Solutions builds AI-powered automation systems, custom AI agents, AI websites, lead nurturing, SEO automation, and enterprise AI solutions for businesses in Kerala and India.",
  keywords: [
    "AI Agency Kerala",
    "AI Development Company Kerala",
    "AI Agents for Business",
    "AI Automation Services",
    "Custom AI Agents",
    "Website Development Kerala",
    "Lead Nurturing Automation",
    "WhatsApp AI Agent",
    "AI Solutions Company India",
    "AI Agency Kochi",
    "Business Automation Kerala",
    "AI Customer Support",
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
      "Build, deploy, and scale AI-powered business automation with Nexora AI. Custom AI agents, websites, and intelligent systems for businesses across Kerala and India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora AI Solutions — AI Employees for Modern Businesses",
    description:
      "AI automation, custom AI agents, and intelligent websites for businesses in Kerala and India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark`}
    >
      <body className="bg-[#050816] text-white font-body min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
