"use client";

import { motion } from "framer-motion";
import { Bar, BarChart, Cell, Line, LineChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowRight, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

const trafficData = [
  { date: "Jan", value: 320 },
  { date: "Feb", value: 420 },
  { date: "Mar", value: 520 },
  { date: "Apr", value: 610 },
  { date: "May", value: 720 },
  { date: "Jun", value: 840 },
  { date: "Jul", value: 980 },
  { date: "Aug", value: 1040 },
  { date: "Sep", value: 1120 },
  { date: "Oct", value: 1300 },
  { date: "Nov", value: 1480 },
  { date: "Dec", value: 1620 },
];

const citationFeed = [
  {
    query: "How to optimize cloud AI workflows",
    source: "Google AI Overview",
    status: "Top Source",
  },
  {
    query: "Best practices for enterprise LLM governance",
    source: "Perplexity",
    status: "Top Source",
  },
  {
    query: "Azure security automation for CIS benchmarks",
    source: "Google AI Overview",
    status: "Top Source",
  },
];

const redAlerts = [
  { message: "Pillar Page: 'Cloud Migration' has 3 broken internal links", severity: "High" },
  { message: "Image missing Alt-Text in 'AI Ethics' post", severity: "Medium" },
  { message: "Meta description missing on 'Generative Ops' draft", severity: "Low" },
];

const keywordClusters = [
  { label: "AWS", value: 28, color: "#38bdf8" },
  { label: "LLMs", value: 24, color: "#818cf8" },
  { label: "Cybersecurity", value: 20, color: "#34d399" },
  { label: "Data Mesh", value: 16, color: "#0ea5e9" },
  { label: "CloudOps", value: 12, color: "#22c55e" },
];

const approvals = [
  { title: "AI Ethics in Enterprise", author: "Nina", category: "Security", urgency: "High" },
  { title: "Zero Trust for Hybrid Cloud", author: "Marcus", category: "Infrastructure", urgency: "Medium" },
  { title: "LLM Ops Pipeline", author: "Tara", category: "AI", urgency: "High" },
];

const auditEvents = [
  { text: "Sarah (Editor) updated the Meta-Description for 'Post-Quantum Crypto'", time: "12 mins ago" },
  { text: "Anoop (Architect) flagged a schema drift in 'Data Governance'", time: "28 mins ago" },
  { text: "Maria (SEO) published the 'Azure Security Playbook' brief", time: "1 hr ago" },
];

const gaugeData = [{ name: "AEO", value: 78 }];

const velocityData = [{ name: "Goal", value: 24 }, { name: "Published", value: 18 }];

const cardPulse = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function DashboardHero() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
      <div className="glass rounded-[32px] p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Command Center</p>
            <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Monitor the global thought-leadership engine.</h1>
            <p className="mt-4 max-w-2xl text-text-body">AnoCloud’s insights operations are now consolidated into a single high-density dashboard for AI visibility, SEO health, and publishing momentum.</p>
          </div>
          <div className="rounded-3xl bg-white/85 p-4 text-right ring-1 ring-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-text-body/70">Next milestone</p>
            <p className="mt-2 text-2xl font-semibold text-primary">24 Insights</p>
            <p className="text-sm text-text-body">for the monthly velocity target</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-body/70">Visibility Index</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">72%</p>
            </div>
            <div className="inline-flex rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary">Stable</div>
          </div>
          <div className="mt-6 h-24 rounded-3xl bg-slate-100/90"></div>
        </div>

        <div className="glass rounded-[32px] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-text-body/70">Action Queue</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">4</p>
            </div>
            <div className="inline-flex rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary">Live</div>
          </div>
          <div className="mt-6 space-y-3 text-sm text-text-body">
            <p>AI Citations trending up 17%.</p>
            <p>SEO red alerts reduced 23% since last week.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MetricsSnapshotGrid() {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      <motion.article variants={cardPulse} className="glass rounded-[32px] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-text-body/70">Organic Reach</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">2.1M</p>
          </div>
          <div className="inline-flex rounded-3xl bg-primary/10 px-3 py-2 text-xs text-primary">+18.2%</div>
        </div>
        <div className="mt-6 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Tooltip cursor={false} contentStyle={{ display: "none" }} />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.article>

      <motion.article variants={cardPulse} className="glass rounded-[32px] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.32em] text-text-body/70">AEO Authority</p>
        <div className="mt-6 flex items-center justify-between gap-6">
          <div className="h-40 w-40">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={gaugeData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={20} fill="#10b981" background={{ fill: "#e2e8f0" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-4xl font-semibold text-foreground">78</p>
            <p className="mt-2 text-sm text-text-body">AEO score out of 100</p>
          </div>
        </div>
      </motion.article>

      <motion.article variants={cardPulse} className="glass rounded-[32px] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.32em] text-text-body/70">Lead Conversion</p>
        <p className="mt-3 text-4xl font-semibold text-foreground">12.8%</p>
        <p className="mt-2 text-sm text-text-body">Blog CTA to consultation rate</p>
        <div className="mt-6 h-24 rounded-3xl bg-slate-100/90 p-4 text-sm text-foreground">
          <div className="mb-3 flex items-center justify-between text-text-body">
            <span>Performance</span>
            <span>+3.4%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[64%] rounded-full bg-primary" />
          </div>
        </div>
      </motion.article>

      <motion.article variants={cardPulse} className="glass rounded-[32px] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.32em] text-text-body/70">Content Velocity</p>
        <p className="mt-3 text-4xl font-semibold text-foreground">18 / 24</p>
        <p className="mt-2 text-sm text-text-body">Published vs monthly goal</p>
        <div className="mt-6 h-24 rounded-3xl bg-slate-100/90 p-4 text-sm text-foreground">
          <BarChart width={200} height={85} data={velocityData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Bar dataKey="value" fill="#10b981">
              {velocityData.map((entry) => (
                <Cell key={entry.name} fill={entry.name === "Published" ? "#10b981" : "#cbd5e1"} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </motion.article>
    </div>
  );
}

export function AeoSeoHealthCenter() {
  return (
    <div className="glass rounded-[32px] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-primary/80">AI Visibility & Search Health</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">AEO & SEO Health Center</h2>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2 text-primary">Live AI coverage</span>
          <span className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2 text-primary">SEO Alerts</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr]">
        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white/70 p-5">
          <div className="flex items-center justify-between text-sm text-text-body">
            <span>AI Citations Feed</span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">Top Source</span>
          </div>
          <div className="space-y-4">
            {citationFeed.map((item) => (
              <div key={item.query} className="rounded-3xl border border-slate-200 bg-white/85 p-4">
                <div className="flex items-center justify-between gap-3 text-text-body">
                  <p className="font-semibold text-foreground">{item.query}</p>
                  <span className="text-xs uppercase tracking-[0.24em] text-text-body/70">{item.source}</span>
                </div>
                <p className="mt-2 text-sm text-text-body">Current brand visibility as Top Source in AI answer engines.</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-slate-200 bg-white/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-text-body/70">SEO Red Alerts</p>
                <p className="mt-2 text-sm text-text-body">Actionable issues requiring attention.</p>
              </div>
              <div className="rounded-3xl bg-rose-500/10 px-3 py-2 text-xs text-rose-500">Critical</div>
            </div>
            <div className="mt-4 space-y-3">
              {redAlerts.map((item) => (
                <div key={item.message} className="rounded-3xl bg-white/85 p-4 ring-1 ring-slate-200">
                  <p className="font-medium text-foreground">{item.message}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-text-body/70">Severity: {item.severity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-text-body/70">Keyword Heatmap</p>
                <p className="mt-2 text-sm text-text-body">Trending topics for the brand.</p>
              </div>
              <Sparkles className="text-primary" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {keywordClusters.map((topic) => (
                <div key={topic.label} className="rounded-3xl bg-white/85 p-4 ring-1 ring-slate-200">
                  <p className="text-sm font-semibold text-foreground">{topic.label}</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-full rounded-full" style={{ width: `${topic.value * 2}%`, backgroundColor: topic.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentQueuePanel() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
      <div className="glass rounded-[32px] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-primary/80">Pending Approvals</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">Subject Matter Review Queue</h3>
          </div>
          <div className="rounded-3xl bg-slate-100 px-3 py-2 text-sm text-text-body">3 items</div>
        </div>

        <div className="mt-6 space-y-4">
          {approvals.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white/85 p-4">
              <div className="flex items-center justify-between gap-3 text-text-body">
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-text-body/80">{item.author} · {item.category}</p>
                </div>
                <span className={`rounded-2xl px-3 py-1 text-xs ${item.urgency === "High" ? "bg-rose-500/12 text-rose-600" : item.urgency === "Medium" ? "bg-amber-500/12 text-amber-600" : "bg-slate-200 text-slate-700"}`}>{item.urgency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-[32px] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-primary/80">Recent Activity</p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">Audit Log</h3>
          </div>
          <div className="rounded-3xl bg-slate-100 px-3 py-2 text-sm text-text-body">Live feed</div>
        </div>

        <div className="mt-6 space-y-4">
          {auditEvents.map((event) => (
            <div key={event.text} className="rounded-3xl border border-slate-200 bg-white/85 p-4">
              <p className="text-sm text-foreground">{event.text}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.28em] text-text-body/70">{event.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function QuickActionsPanel() {
  return (
    <div className="glass rounded-[32px] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-primary/80">Command Palette</p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">Quick Actions & Intelligence</h3>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/85 px-4 py-3 text-text-body">
          Ask CMS: <span className="font-semibold text-foreground">Show me all drafts about Azure security</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <button className="rounded-3xl border border-primary/30 bg-primary/10 px-5 py-4 text-left text-foreground transition hover:border-primary/40 hover:bg-primary/15">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">Generate AI Insight Draft</span>
            <ArrowRight size={18} />
          </div>
          <p className="mt-3 text-sm text-text-body">Trigger the GenAI co-pilot for a fresh draft.</p>
        </button>

        <button className="rounded-3xl border border-primary/20 bg-primary/10 px-5 py-4 text-left text-foreground transition hover:border-primary/40 hover:bg-primary/15">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">New Case Study</span>
            <ChevronRight size={18} />
          </div>
          <p className="mt-3 text-sm text-text-body">Launch a template for enterprise storytelling.</p>
        </button>

        <button className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-left text-foreground transition hover:border-rose-500/35 hover:bg-rose-500/15">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">Run Site-Wide Audit</span>
            <ShieldCheck size={18} />
          </div>
          <p className="mt-3 text-sm text-text-body">Execute the latest SEO & AEO health checks.</p>
        </button>
      </div>
    </div>
  );
}
