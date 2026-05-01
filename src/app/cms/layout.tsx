import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/components/cms/Sidebar";

export const metadata: Metadata = {
  title: "AnoCloud CMS | Command Center",
  description: "Enterprise command center for AnoCloud Insights Engine.",
};

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-foreground">
      <Sidebar />
      <div className="flex-1">
        <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary ring-1 ring-primary/20">
                CC
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-text-body/70">Command Center</p>
                <p className="text-sm font-semibold text-foreground">AnoCloud Insights Engine</p>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3 text-sm text-text-body sm:gap-4">
              <div className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-foreground shadow-sm">
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">⌘</span>
                <span>Command + K</span>
              </div>
              <Link
                href="/"
                className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary transition hover:border-primary/40 hover:bg-primary/15"
              >
                Live Site
              </Link>
              <div className="rounded-3xl border border-slate-200 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                Admin / Architect
              </div>
            </div>
          </div>
        </div>
        <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
