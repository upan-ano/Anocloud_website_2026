import React from "react";
import { BarChart3, TrendingUp, Search, Zap, Globe, Target } from "lucide-react";
import { MetricCard } from "@/components/admin/DashboardCards";

export default function SEOInsightsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">Analysis</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">SEO Command Center</h1>
        <p className="mt-2 text-slate-500">Real-time visibility metrics and AI Answer Engine optimization tracking.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <MetricCard title="AEO Score" value="84%" change="+4%" trend="up" icon={Zap} />
        <MetricCard title="Keyword Gap" value="12" change="-2" trend="up" icon={Search} />
        <MetricCard title="Auth. Score" value="68" change="+1" trend="up" icon={Globe} />
        <MetricCard title="Click Share" value="4.2%" change="+0.5%" trend="up" icon={Target} />
      </div>

      {/* Main Analysis Sections */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-slate-900">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Visibility Trend
          </h3>
          <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 grayscale opacity-40">
            <BarChart3 className="h-12 w-12 text-slate-300" />
            <span className="ml-4 font-black uppercase tracking-widest text-slate-400 text-xs">Analytics Engine Offline</span>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
           <h3 className="mb-6 font-black text-slate-900 uppercase tracking-widest text-xs">Top SEO Opportunities</h3>
           <div className="space-y-4">
             {[
               "Optimize 'Cloud Modernization' density in Layer 2 Insights",
               "Fix missing alt tags in Media Vault (4 assets)",
               "Update meta-description for legacy 2024 posts",
               "Enable semantic linking between AI and Data categories"
             ].map((task, i) => (
               <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-50 bg-slate-50/30 px-4 py-3 text-sm font-medium transition-all hover:border-emerald-200 hover:bg-emerald-50/30">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                 {task}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
