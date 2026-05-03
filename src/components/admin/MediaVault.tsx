"use client";

import React, { useState } from "react";
import { 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Search,
  ExternalLink,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFile {
  name: string;
  url: string;
}

export default function MediaVault({ initialImages }: { initialImages: MediaFile[] }) {
  const [images] = useState(initialImages);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">Assets</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Image Library</h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-slate-500 text-xs font-bold uppercase tracking-wider border border-slate-200">
          <Info className="h-3.5 w-3.5" />
          Links only mode
        </div>
      </div>

      {/* Info Card */}
      <div className="rounded-[32px] border border-emerald-100 bg-emerald-50/50 p-8">
        <div className="flex gap-6 items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100">
            <ImageIcon className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Cloud-Native Image Management</h3>
            <p className="mt-2 text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
              AnoCloud Insights now uses external image links to ensure maximum performance and zero local storage overhead. 
              The images displayed below are automatically gathered from your existing blog posts.
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by filename or URL..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-emerald-600/30 transition-all font-medium"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredImages.map((image, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-emerald-300 shadow-sm">
            <div className="aspect-square bg-slate-50 border-b border-slate-100">
              <img 
                src={image.url} 
                alt={image.name} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Overlay Actions */}
            <div className="absolute inset-x-0 bottom-12 top-0 flex items-center justify-center gap-2 bg-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 px-4">
              <button 
                onClick={() => copyToClipboard(image.url)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform active:scale-95 shadow-lg"
                title="Copy URL"
              >
                {copiedUrl === image.url ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
              <a 
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white transition-transform active:scale-95 shadow-lg"
                title="Open Original"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            <div className="p-3">
              <p className="truncate text-[10px] font-black uppercase tracking-wider text-slate-400">{image.name}</p>
              <p className="mt-1 truncate text-[8px] font-bold text-slate-300 font-mono">{image.url}</p>
            </div>
          </div>
        ))}

        {filteredImages.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 grayscale opacity-40">
            <ImageIcon className="h-20 w-20 text-slate-300" />
            <p className="mt-4 font-bold text-slate-400 uppercase tracking-widest text-xs">No matching images found</p>
          </div>
        )}
      </div>
    </div>
  );
}
