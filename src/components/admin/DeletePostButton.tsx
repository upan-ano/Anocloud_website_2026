"use client";

import { deletePost } from "@/actions/blog";
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/components/ui/Toast";

interface DeletePostButtonProps {
  slug: string;
}

export default function DeletePostButton({ slug }: DeletePostButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slugInput, setSlugInput] = useState("");
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: "success" | "error" }>({
    isVisible: false,
    message: "",
    type: "success"
  });

  const handleDelete = () => {
    if (slugInput.trim().toLowerCase() !== slug.trim().toLowerCase()) return;

    startTransition(async () => {
      const result = await deletePost(slug);
      if (result.success) {
        setToast({ isVisible: true, message: "Insight deleted successfully", type: "success" });
        setIsModalOpen(false);
        setTimeout(() => {
           router.refresh();
        }, 1000);
      } else {
        setToast({ isVisible: true, message: "Error: " + result.error, type: "error" });
      }
    });
  };

  return (
    <>
      <button 
        onClick={() => {
          setSlugInput("");
          setIsModalOpen(true);
        }}
        disabled={isPending}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:border-rose-300 hover:text-rose-500"
        title="Delete Insight"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isPending && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md overflow-hidden rounded-[24px] bg-white p-8 shadow-2xl ring-1 ring-slate-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                
                <h3 className="mb-2 text-xl font-black text-slate-900">Are you absolutely sure?</h3>
                <p className="mb-8 text-sm font-medium text-slate-500 leading-relaxed">
                  This action cannot be undone. This will permanently delete the insight and remove it from our cloud repository.
                </p>

                <div className="mb-8 w-full space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                    To confirm, type <span className="text-slate-900 select-all font-bold">"{slug}"</span> below
                  </p>
                  <input 
                    type="text"
                    value={slugInput}
                    onChange={(e) => setSlugInput(e.target.value)}
                    placeholder="Enter slug to confirm"
                    autoFocus
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-300 transition-all placeholder:font-medium placeholder:text-slate-300"
                  />
                </div>

                <div className="flex w-full gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    disabled={isPending}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete}
                    disabled={isPending || slugInput.trim().toLowerCase() !== slug.trim().toLowerCase()}
                    className="flex-1 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white shadow-xl shadow-rose-600/20 transition-all hover:bg-rose-500 disabled:opacity-30 disabled:shadow-none"
                  >
                    {isPending ? (
                      <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                    ) : (
                      "Delete Forever"
                    )}
                  </button>
                </div>
              </div>

              <button 
                onClick={() => !isPending && setIsModalOpen(false)}
                className="absolute top-4 right-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Toast 
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </>
  );
}
