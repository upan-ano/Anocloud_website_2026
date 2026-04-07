"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Shield } from "lucide-react";
import RobotCircleGate from "./RobotCircleGate";

export default function LandingHero() {

  return (
    <section className="relative min-h-[80vh] flex items-center pt-15 pb-20 overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border-primary/20 mb-8 overflow-hidden">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                Next-Gen Enterprise Consulting
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-outfit font-extrabold leading-[1.1] mb-8 tracking-tight text-foreground">
              Modernize for <span className="text-primary italic">Agility</span>. <br />
              Scale with <span className="text-gradient">Intelligence</span>.
            </h1>

            <p className="text-xl text-text-body font-medium leading-relaxed max-w-xl mb-10">
              AnoCloud is an engineering-first consultancy bridging the gap between legacy infrastructure and AI-driven growth. We build, secure, and scale the future of enterprise tech.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/25"
              >
                <span>Request Strategic Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="w-full sm:w-auto px-8 py-4 glass text-foreground font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-white/40 transition-all"
              >
                <span>Explore AI Blueprint</span>
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-black/5 pt-10">
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-outfit text-foreground">40%</span>
                <span className="text-xs text-text-body mt-1 uppercase tracking-wider font-bold">Cost Savings</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-outfit text-foreground">99%</span>
                <span className="text-xs text-text-body mt-1 uppercase tracking-wider font-bold">Resilience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-outfit text-foreground">10x</span>
                <span className="text-xs text-text-body mt-1 uppercase tracking-wider font-bold">Acceleration</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative mt-20 lg:mt-0"
          >
            <div className="relative aspect-square rounded-[3rem] p-4 overflow-visible">
              {/* The Gate & Robot Component */}
              <RobotCircleGate />

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 right-0 lg:-right-10 glass p-4 rounded-2xl border-black/5 shadow-2xl backdrop-blur-xl z-20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Security</p>
                    <p className="text-sm font-bold text-foreground">SOC2 Resilience</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-12 left-0 lg:-left-10 glass p-4 rounded-2xl border-black/5 shadow-2xl backdrop-blur-xl z-20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Automation</p>
                    <p className="text-sm font-bold text-foreground">Cloud-Native</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
