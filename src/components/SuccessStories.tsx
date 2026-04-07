"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { ArrowUpRight, TrendingUp, Cpu, Smartphone } from "lucide-react";
import Image from "next/image";

const cases = [
  {
    title: "AI-Powered Quality Control for Global Manufacturing Lead",
    outcome: "99% Defect Detection Accuracy",
    impact: "Reduced scrap by 15%",
    icon: Cpu,
    color: "bg-blue-500",
  },
  {
    title: "Cloud Migration & Security Hardening for Fintech Scaleup",
    outcome: "40% Infrastructure Cost Reduction",
    impact: "Zero downtime during transition",
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    title: "High-Performance Logistics Hub for Retail Giant",
    outcome: "10x Deployment Velocity",
    impact: "Unified inventory management",
    icon: Smartphone,
    color: "bg-purple-500",
  },
];

export default function SuccessStories() {
  return (
    <Section id="insights" className="bg-white/50 backdrop-blur-xl border-y border-black/5">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl space-y-4">
           <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border-primary/20 overflow-hidden">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                 Intelligence in Action
              </span>
           </div>
           <h2 className="text-4xl md:text-5xl font-outfit font-bold text-foreground leading-tight">
              Evidence of Impact. <br /> <span className="text-gradient">Engineered for Success.</span>
           </h2>
        </div>
        <button className="flex items-center space-x-2 px-8 py-4 glass text-foreground font-bold rounded-xl hover:bg-white/40 transition-all">
           <span>View All Case Studies</span>
           <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {cases.map((story, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative glass rounded-[2.5rem] border-black/5 overflow-hidden flex flex-col p-8 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 p-8">
               <story.icon className={`w-8 h-8 text-foreground opacity-10 group-hover:scale-125 transition-transform group-hover:text-primary group-hover:opacity-100`} />
            </div>

            <div className="mt-8 space-y-6">
               <h3 className="text-2xl font-bold font-outfit text-foreground leading-snug">
                  {story.title}
               </h3>
               
               <div className="p-6 glass rounded-2xl border-black/5 space-y-2 bg-white/40">
                  <p className="text-3xl font-extrabold text-primary font-outfit tracking-tight">
                     {story.outcome}
                  </p>
                  <p className="text-xs uppercase font-bold tracking-widest text-text-body/60 leading-none">
                     Key Metric Achieved
                  </p>
               </div>

               <p className="text-sm font-medium text-text-body italic">
                  &quot;{story.impact}&quot;
               </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
