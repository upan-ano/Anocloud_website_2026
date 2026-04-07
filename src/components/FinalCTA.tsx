"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Free Architecture Assessment",
  "Dedicated Engineering Lead",
  "SOC2-Aligned Security Focus",
  "High-Velocity Delivery Model",
];

export default function FinalCTA() {
  return (
    <Section id="contact" className="relative overflow-hidden pt-0">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-primary/10 blur-[150px] -z-10 rounded-full translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass rounded-[3rem] border-black/5 p-12 md:p-24 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border-primary/20 overflow-hidden">
               <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                  Ready to Start?
               </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-outfit font-extrabold text-foreground leading-tight">
               Build the Future of <br /><span className="text-gradient">Intelligent Enterprise.</span>
            </h2>
            
            <p className="text-xl text-text-body font-medium leading-relaxed">
               Schedule a 30-minute architecture workshop with our engineering leads to explore how we can accelerate your modernization journey.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm font-bold text-text-body">
                     <CheckCircle2 className="w-5 h-5 text-primary" />
                     <span>{benefit}</span>
                  </li>
               ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="mailto:contact@anocloud.in"
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-bold rounded-2xl flex items-center justify-center space-x-3 hover:bg-primary/90 transition-all hover:scale-105 shadow-2xl shadow-primary/20"
              >
                <span>Book Your Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-full sm:w-auto px-10 py-5 glass text-foreground font-bold rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/40 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat with Scale-Up Lead</span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
             <div className="aspect-square glass rounded-3xl p-12 border-black/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                   <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-primary" />
                   </div>
                   
                   <div className="space-y-4">
                      <p className="text-2xl font-bold font-outfit text-foreground">
                         &quot;AnoCloud’s blueprint for AI-driven transformation is a masterclass in modern engineering.&quot;
                      </p>
                      <div className="flex items-center space-x-4">
                         <div className="w-12 h-12 bg-primary/10 rounded-full border border-primary/20" />
                         <div>
                            <p className="text-sm font-bold text-foreground">CTO, Healthcare Scaleup</p>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-text-body/60">Enterprise Client</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
