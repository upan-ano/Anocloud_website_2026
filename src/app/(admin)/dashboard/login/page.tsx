"use client";

import React, { useState, useTransition } from "react";
import { loginAction } from "@/actions/auth";
import { Shield, Lock, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await loginAction(pin);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl shadow-emerald-950/5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900">Secure Access</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">Enter your administration PIN to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Admin PIN"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-center text-xl font-black tracking-[0.5em] text-slate-900 outline-none focus:border-emerald-600/30 focus:ring-1 focus:ring-emerald-600/30 transition-all shadow-inner"
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-xs font-bold text-rose-500 border border-rose-100">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending || pin.length < 4}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black text-white transition-all hover:bg-slate-800 disabled:opacity-50 active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span>Unlock Portfolio CMS</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="pt-6 text-center text-[10px] font-bold uppercase tracking-widest text-slate-300">
          AnoCloud Security Gateway v2026
        </div>
      </div>
    </div>
  );
}
