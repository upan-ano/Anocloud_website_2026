"use client";

import Link from "next/link";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { BookOpen, Home, ImageIcon, Search, Settings, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/cms", icon: Home },
  { label: "Insights Library", href: "/cms/library", icon: BookOpen },
  { label: "Media Vault", href: "/cms/media", icon: ImageIcon },
  { label: "SEO Strategist", href: "/cms/seo", icon: Search },
  { label: "Nexus Settings", href: "/cms/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Tooltip.Provider delayDuration={150}>
      <aside className="flex h-screen flex-col justify-between border-r border-slate-200/80 bg-white/90 px-3 py-4 text-foreground shadow-[6px_0_20px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300">
        <div className="flex flex-col gap-4">
          <div className="glass flex items-center justify-between gap-2 rounded-3xl p-3">
            <div className="flex items-center gap-2">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">A</div>
              {!collapsed && (
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-body/70">CMS</p>
                  <p className="text-sm font-semibold text-foreground">AnoCloud</p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-text-body transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Tooltip.Root key={href} delayDuration={150}>
                <Tooltip.Trigger asChild>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-3xl px-3 py-3 text-sm text-text-body transition hover:bg-primary/10 hover:text-primary"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-primary transition group-hover:bg-primary/12">
                      <Icon size={18} />
                    </span>
                    {!collapsed && <span className="font-medium">{label}</span>}
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Content side="right" align="center" className="rounded-xl bg-foreground px-3 py-2 text-xs text-white shadow-xl">
                  {label}
                </Tooltip.Content>
              </Tooltip.Root>
            ))}
          </nav>
        </div>

        <div className="glass rounded-3xl p-4 text-sm text-text-body">
          <p className="text-xs uppercase tracking-[0.3em] text-text-body/70">System Pulse</p>
          <p className="mt-3 text-sm text-foreground">Deploy stable · 99.97% uptime · 6 alerts</p>
        </div>
      </aside>
    </Tooltip.Provider>
  );
}
