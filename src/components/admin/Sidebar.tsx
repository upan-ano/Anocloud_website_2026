"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Search, 
  Settings, 
  ChevronRight,
  ExternalLink,
  Shield,
  Zap,
  BarChart3,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { logoutAction } from "@/actions/auth";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Library", href: "/dashboard/insights", icon: FileText },
  { name: "Media Vault", href: "/dashboard/media", icon: ImageIcon },
  { name: "SEO Insights", href: "/dashboard/seo", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white text-slate-600">
      <div className="flex h-full flex-col px-4 py-6">
        {/* Logo Section */}
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)]">
            AC
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-900">AnoCloud</h2>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-600">Insights Engine</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-emerald-50 text-emerald-600 font-bold" 
                    : "hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600")} />
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 h-6 w-1 rounded-r-full bg-emerald-600"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-emerald-600" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto space-y-4 border-t border-slate-100 pt-6">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View Public Site</span>
            </div>
          </Link>

          <div className="flex items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3 min-w-0">
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200 shrink-0">
                 <Shield className="h-4 w-4 text-slate-500" />
               </div>
               <div className="min-w-0">
                 <p className="truncate text-xs font-semibold text-slate-900">Admin Architect</p>
                 <p className="text-[10px] text-slate-400">System Administrator</p>
               </div>
            </div>
            <button 
              onClick={() => logoutAction()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
