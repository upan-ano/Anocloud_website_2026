import React from "react";
import { getDashboardStats, getRecentActivity } from "@/actions/blog";
import { MetricCard, RecentActivity, QuickActions } from "@/components/admin/DashboardCards";
import { Send, FileText, Zap, BarChart3, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const recentPosts = await getRecentActivity();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">Overview</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">KPI Command Center</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400">
            <span className="text-xs font-bold">QA</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Environment</p>
            <p className="text-xs font-bold text-emerald-600">Production Node</p>
          </div>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard 
          title="Total Insights" 
          value={stats.totalPosts} 
          change="+12%" 
          trend="up"
          icon={FileText}
        />
        <MetricCard 
          title="AEO Visibility" 
          value={`${stats.aeoScore}%`} 
          change="+4.2%" 
          trend="up"
          icon={Zap}
        />
        <MetricCard 
          title="Content Velocity" 
          value={`${stats.contentVelocity}/wk`} 
          change="-0.1%" 
          trend="neutral"
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity activities={recentPosts} />
        </div>
        <div className="space-y-8">
          <QuickActions />
          
          {/* System Health / Secondary Stats */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
             <h3 className="mb-6 text-lg font-black text-slate-900">System Status</h3>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-500">Indexability</span>
                 <span className="text-xs font-black text-emerald-600">OPTIMAL</span>
               </div>
               <div className="h-2 w-full rounded-full bg-slate-100">
                 <div className="h-full w-[94%] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-500">Latency (Edge)</span>
                 <span className="text-xs font-black text-slate-900">34ms</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
