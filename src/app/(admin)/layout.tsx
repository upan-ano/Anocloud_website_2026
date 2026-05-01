import type { Metadata } from "next";
import Sidebar from "@/components/admin/Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AnoCloud Insights Engine | Private Admin",
  description: "Administrative command center for AnoCloud blog content.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-slate-50 text-slate-950 ${inter.variable} font-sans`}>
      <Sidebar />
      <main className="pl-64">
        <div className="mx-auto min-h-screen max-w-[1600px] px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
