"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type = "success", 
  isVisible, 
  onClose, 
  duration = 5000 
}: ToastProps) {
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2"
        >
          <div className={cn(
            "flex items-center gap-3 rounded-2xl px-6 py-4 shadow-2xl backdrop-blur-xl border font-bold min-w-[300px]",
            type === "success" ? "bg-emerald-600/90 text-white border-emerald-400/30" : 
            type === "error" ? "bg-rose-600/90 text-white border-rose-400/30" : 
            "bg-slate-900/90 text-white border-slate-700/30"
          )}>
            {type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-200" />}
            {type === "error" && <AlertCircle className="h-5 w-5 text-rose-200" />}
            
            <span className="text-sm tracking-tight">{message}</span>
            
            <button 
              onClick={onClose}
              className="ml-auto rounded-full p-1 hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
