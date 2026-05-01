import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AnoCloud | Modernize for Agility. Scale with Intelligence.",
  description: "AnoCloud is an engineering-first consultancy bridging the gap between legacy infrastructure and AI-driven growth. We build, secure, and scale the future of enterprise technology.",
  keywords: ["Cloud Modernization", "AI Integration", "Cyber Security", "Data Engineering", "Enterprise Software"],
  openGraph: {
    title: "AnoCloud | Enterprise Cloud & AI Transformation",
    description: "Bridging the gap between legacy infrastructure and AI-driven growth.",
    type: "website",
    url: "https://www.anocloud.in/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body 
        className="antialiased font-inter bg-slate-50 text-foreground transition-colors duration-500 selection:bg-primary selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
