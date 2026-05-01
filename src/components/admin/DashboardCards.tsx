import React from "react";
import { TrendingUp, FileText, Zap, BarChart3, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
}

export function MetricCard({ title, value, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</h3>
          {change && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={cn(
                "text-xs font-bold",
                trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-slate-400"
              )}>
                {change}
              </span>
              <span className="text-[10px] text-slate-400">vs last month</span>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-100 transition-colors group-hover:bg-emerald-50 group-hover:ring-emerald-100">
          <Icon className="h-6 w-6 text-slate-400 transition-colors group-hover:text-emerald-600" />
        </div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-emerald-500/5 blur-3xl transition-opacity group-hover:opacity-100" />
    </div>
  );
}

export function RecentActivity({ activities }: { activities: any[] }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-900">Recent Activity</h3>
        <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-slate-100 hover:bg-slate-50/50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-100">
              <FileText className="h-4 w-4 text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{activity.title}</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                <span className="text-emerald-600">{activity.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{activity.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-600 uppercase px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">Modified</span>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuickActions() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-black text-slate-900">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        <button className="flex items-center justify-between rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98]">
          <div className="flex items-center gap-3">
            <Zap className="h-4 w-4 fill-white" />
            <span>Create New Insight</span>
          </div>
          <ChevronRight className="h-4 w-4 outline-none" />
        </button>
        <button className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <span>Optimization Report</span>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </button>
      </div>
    </div>
  );
}
