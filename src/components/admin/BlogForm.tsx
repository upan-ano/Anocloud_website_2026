"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { savePost, BlogPost } from "@/actions/blog";
import { cn } from "@/lib/utils";
import Toast from "@/components/ui/Toast";
import { 
  Save, 
  Eye, 
  Edit3, 
  Globe, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Loader2,
  ChevronRight,
  Info
} from "lucide-react";
import Link from "next/link";
import { marked } from "marked";

interface BlogFormProps {
  initialData?: BlogPost;
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [formData, setFormData] = useState<BlogPost>(
    initialData || {
      id: Date.now(),
      slug: "",
      title: "",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "5 min",
      category: "ai",
      author: "AnoCloud Team",
      views: "0",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=800&fit=crop&q=90",
      tags: [],
      content: ""
    }
  );

  const [view, setView] = useState<"edit" | "preview">("edit");
  const [seoScore, setSeoScore] = useState(0);
  const [seoIssues, setSeoIssues] = useState<{ label: string; passed: boolean }[]>([]);

  // Effect to generate slug from title
  useEffect(() => {
    if (!initialData && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, initialData]);

  // SEO Audit Logic
  useEffect(() => {
    const issues = [
      { label: "Title length (< 60 chars)", passed: formData.title.length > 0 && formData.title.length < 60 },
      { label: "Slug defined", passed: formData.slug.length > 3 },
      { label: "Category selected", passed: !!formData.category },
      { label: "Excerpt length (120-160 chars)", passed: formData.excerpt.length >= 120 && formData.excerpt.length <= 160 },
      { label: "Has main content", passed: (formData.content?.length || 0) > 200 },
      { label: "Keyword in first paragraph", passed: checkKeywordInFirstPara(formData.content || "", formData.title) }
    ];
    
    setSeoIssues(issues);
    const passedCount = issues.filter(i => i.passed).length;
    setSeoScore(Math.round((passedCount / issues.length) * 100));
  }, [formData]);

  function checkKeywordInFirstPara(content: string, title: string) {
    if (!content || !title) return false;
    const firstPara = content.split('\n\n')[0] || '';
    const keywords = title.toLowerCase().split(' ').filter(w => w.length > 3);
    return keywords.some(k => firstPara.toLowerCase().includes(k));
  }

  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: "success" | "error" }>({
    isVisible: false,
    message: "",
    type: "success"
  });

  const handleSave = async () => {
    startTransition(async () => {
      const result = await savePost(formData, formData.content || "");
      if (result.success) {
        setToast({ 
          isVisible: true, 
          message: initialData ? "Insight updated successfully!" : "Insight published successfully!", 
          type: "success" 
        });
        
        // Wait a bit for the user to see the success message before redirecting
        setTimeout(() => {
          router.push("/dashboard/insights");
          router.refresh();
        }, 1500);
      } else {
        setToast({ 
          isVisible: true, 
          message: "Failed to save: " + result.error, 
          type: "error" 
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-1 space-y-6">
        {/* Workspace Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/insights"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {initialData ? "Edit Insight" : "New Insight"}
              </h2>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Workspace v2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1 ring-1 ring-slate-200">
            <button 
              onClick={() => setView("edit")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-black transition-all uppercase tracking-widest",
                view === "edit" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit
            </button>
            <button 
              onClick={() => setView("preview")}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-black transition-all uppercase tracking-widest",
                view === "preview" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
          </div>
        </div>

        {view === "edit" ? (
          <div className="space-y-6 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Insight Title</label>
                <input 
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="The Future of Cloud Ingress..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600/30 focus:ring-1 focus:ring-emerald-600/30 transition-all font-bold"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slug URL</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-slate-400 text-xs font-bold">/blog/</span>
                  <input 
                    value={formData.slug}
                    onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="flex-1 bg-transparent px-1 text-sm text-slate-900 outline-none font-bold"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600/30 font-bold"
                >
                  <option value="ai">AI & Machine Learning</option>
                  <option value="cloud">Cloud Infrastructure</option>
                  <option value="security">Cybersecurity</option>
                  <option value="data">Data Engineering</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cover Image URL</label>
                <input 
                  value={formData.image}
                  onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-emerald-600/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Meta Description / Excerpt</label>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  formData.excerpt.length >= 120 && formData.excerpt.length <= 160 ? "text-emerald-500" : "text-slate-300"
                )}>
                  {formData.excerpt.length}/160
                </span>
              </div>
              <textarea 
                value={formData.excerpt}
                onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                placeholder="A high-level summary for SEO cards..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-600/30 font-medium leading-relaxed"
              />
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content (Markdown)</label>
              <textarea 
                value={formData.content}
                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={20}
                placeholder="Start writing your architectural insight..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-6 font-mono text-sm text-slate-700 outline-none focus:border-emerald-600/30 leading-relaxed shadow-inner"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-[24px] border border-slate-200 bg-white p-10 shadow-sm">
            <article className="prose prose-slate max-w-none">
              <div className="mb-10 text-center border-b border-slate-100 pb-10">
                 <span className="bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black text-emerald-600 border border-emerald-100 uppercase tracking-widest">
                   {formData.category}
                 </span>
                 <h1 className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">{formData.title}</h1>
                 <p className="mt-6 text-lg text-slate-500 font-medium italic border-l-4 border-emerald-500/30 pl-6 text-left">{formData.excerpt}</p>
                 <img src={formData.image} alt="" className="mt-10 rounded-3xl w-full aspect-video object-cover shadow-xl" />
              </div>
              <div 
                className="prose-admin-light"
                dangerouslySetInnerHTML={{ __html: marked.parse(formData.content || "") }} 
              />
              <style jsx global>{`
                .prose-admin-light h1, .prose-admin-light h2, .prose-admin-light h3 { color: #0f172a; margin-top: 2.5rem; font-weight: 800; font-family: var(--font-outfit), sans-serif; }
                .prose-admin-light p { color: #475569; line-height: 1.85; margin-bottom: 1.5rem; font-size: 1.05rem; }
                .prose-admin-light blockquote { border-left: 4px solid #10b981; padding: 1.5rem; font-style: italic; color: #334155; background: #f0fdf4; border-radius: 0 1rem 1rem 0; }
                .prose-admin-light code { background: #f8fafc; color: #059669; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; }
                .prose-admin-light ul { list-style-type: disc; padding-left: 1.5rem; color: #475569; }
                .prose-admin-light strong { color: #0f172a; font-weight: 700; }
              `}</style>
            </article>
          </div>
        )}
      </div>

      {/* SEO Auditor / Sidebar Controls */}
      <div className="w-full space-y-6 lg:w-80">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-widest">
              <Globe className="h-4 w-4 text-emerald-500" />
              SEO Auditor
            </h3>
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-black tracking-tighter ring-2 ring-offset-2 ring-offset-white shadow-sm",
              seoScore > 80 ? "bg-emerald-100 text-emerald-600 ring-emerald-500/50" : 
              seoScore > 50 ? "bg-amber-100 text-amber-600 ring-amber-500/50" : 
              "bg-rose-100 text-rose-600 ring-rose-500/50"
            )}>
              {seoScore}%
            </div>
          </div>
          
          <div className="space-y-4">
            {seoIssues.map((issue, i) => (
              <div key={i} className="flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 font-medium">{issue.label}</span>
                {issue.passed ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-300" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AEO Visibility</span>
              <span className="text-[10px] font-black text-emerald-600 uppercase">Optimal</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-full w-[84%] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            disabled={isPending}
            onClick={handleSave}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {initialData ? "Apply Changes" : "Publish Insight"}
          </button>
          
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 shadow-sm">
            <Info className="h-4 w-4" />
            Save Draft
          </button>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Publication Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Date</p>
              <p className="text-xs font-bold text-slate-600">{formData.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Author</p>
              <p className="text-xs font-bold text-slate-600">{formData.author}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Est. Read Time</p>
              <div className="flex items-center gap-2">
                <input 
                  value={formData.readTime}
                  onChange={e => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                  className="bg-transparent text-xs font-bold text-slate-600 outline-none w-20 border-b border-transparent focus:border-emerald-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Toast 
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}
