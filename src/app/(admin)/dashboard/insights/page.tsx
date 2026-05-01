import React from "react";
import Link from "next/link";
import { getPosts } from "@/actions/blog";
import { Plus, Search, Filter, Edit3, Trash2, Eye, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function InsightsLibraryPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">Content</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Insight Library</h1>
        </div>
        <Link 
          href="/dashboard/create"
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500"
        >
          <Plus className="h-4 w-4" />
          <span>New Insight</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search insights..." 
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-emerald-600/30 focus:ring-1 focus:ring-emerald-600/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Filter className="h-4 w-4" />
            <span>Category</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Insight Title</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Slug</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Published</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.slug} className="group transition-colors hover:bg-slate-50/30">
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors uppercase">{post.title}</span>
                    <span className="mt-1 flex items-center gap-2 text-[10px] font-bold text-slate-400">
                      <Eye className="h-3 w-3" />
                      {post.views} views
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <code className="rounded border border-slate-100 bg-slate-50 px-1.5 py-0.5 text-xs text-slate-500 font-mono">/{post.slug}</code>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 ring-1 ring-inset ring-emerald-600/10">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-5 text-xs text-slate-400 font-bold uppercase">
                  {post.date}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-900"
                      title="View Live"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link 
                      href={`/dashboard/insights/${post.slug}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-colors hover:border-emerald-600/50 hover:text-emerald-600"
                      title="Edit Post"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Link>
                    <button 
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-colors hover:border-rose-300 hover:text-rose-500"
                      title="Delete Post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
