"use client";

import React, { useState, useTransition } from "react";
import { uploadImage } from "@/actions/blog";
import { 
  CloudUpload, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Trash2, 
  Search,
  Plus,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFile {
  name: string;
  url: string;
}

export default function MediaVault({ initialImages }: { initialImages: MediaFile[] }) {
  const [images, setImages] = useState(initialImages);
  const [isUploading, startTransition] = useTransition();
  const [dragActive, setDragActive] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (result.success && result.url) {
        setImages(prev => [{ name: file.name, url: result.url! }, ...prev]);
      } else {
        alert("Upload failed: " + result.error);
      }
    });
  };

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
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Media Vault</h1>
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500">
          <Plus className="h-4 w-4" />
          <span>Upload Image</span>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
        </label>
      </div>

      {/* Upload Zone */}
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed p-12 transition-all",
          dragActive 
            ? "border-emerald-600 bg-emerald-50 shadow-[0_0_40px_rgba(16,185,129,0.1)]" 
            : "border-slate-200 bg-white hover:border-emerald-200 shadow-sm"
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50 ring-1 ring-slate-100">
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          ) : (
            <CloudUpload className="h-8 w-8 text-slate-400" />
          )}
        </div>
        <h3 className="mt-6 text-lg font-bold text-slate-900">Drop your media here</h3>
        <p className="mt-2 text-sm text-slate-500 font-medium">Support for PNG, JPG, WEBP and SVGs up to 10MB</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-emerald-300 shadow-sm">
            <div className="aspect-square bg-slate-50">
              <img 
                src={image.url} 
                alt={image.name} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 px-4">
              <button 
                onClick={() => copyToClipboard(image.url)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform active:scale-95 shadow-lg"
                title="Copy URL"
              >
                {copiedUrl === image.url ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
              <button 
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white transition-transform active:scale-95 shadow-lg"
                title="Delete"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3">
              <p className="truncate text-[10px] font-black uppercase tracking-wider text-slate-400">{image.name}</p>
            </div>
          </div>
        ))}

        {images.length === 0 && !isUploading && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 grayscale opacity-40">
            <ImageIcon className="h-20 w-20 text-slate-300" />
            <p className="mt-4 font-bold text-slate-400 uppercase tracking-widest text-xs">No media found in the vault</p>
          </div>
        )}
      </div>
    </div>
  );
}
