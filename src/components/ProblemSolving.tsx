"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { ArrowRight, BarChart3, Lock, Zap } from "lucide-react";

const metrics = [
  { label: "Infra Cost Reduction", value: "40%", icon: BarChart3 },
  { label: "Deployment Velocity", value: "10x", icon: Zap },
  { label: "Security Resilience", value: "99.9%", icon: Lock },
];

export default function ProblemSolving() {
  return (
    <Section id="about" className="bg-white relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square glass rounded-[2.5rem] p-12 flex flex-col justify-between overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="space-y-6 relative z-10">
              <h3 className="text-3xl font-outfit font-bold text-foreground leading-tight">
                Legacy Tech is a Tax <br />on Innovation
              </h3>
              <p className="text-text-body text-lg leading-relaxed">
                Most enterprises are slowed down by technical debt, fragmented data, and security vulnerabilities. AnoCloud provides the strategic engineering required to transform these bottlenecks into competitive advantages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {metrics.map((metric, i) => (
                <div key={i} className="p-4 glass rounded-2xl border-black/5 space-y-2 group-hover:border-primary/50 transition-all">
                  <metric.icon className="w-5 h-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-text-body/60 leading-none">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border-primary/20 overflow-hidden">
             <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                The AnoCloud Advantage
             </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-foreground leading-tight">
            Bridging the Gap from <br /> <span className="text-gradient">Legacy to Intelligent</span>
          </h2>
          
          <div className="space-y-6">
            <AdvantageItem 
              title="High-Velocity Engineering"
              description="We deploy faster through modular architecture and AI-assisted workflows, ensuring your product reaches the market before the competition."
            />
            <AdvantageItem 
              title="Outcome-Obsessed Partnerships"
              description="We don't just ship code; we own the business result. Our success is measured by your ROI and operational efficiency."
            />
            <AdvantageItem 
              title="Security-First Culture"
              description="Security isn't a bolt-on; it's the foundation of everything we build. Proactive, SOC2-aligned resilience is built-in."
            />
          </div>

          <button className="flex items-center space-x-2 text-primary font-bold group">
             <span>Learn more about our methodology</span>
             <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </Section>
  );
}

function AdvantageItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex space-x-4">
      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 ring-4 ring-primary/20" />
      <div>
        <h4 className="text-lg font-bold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-text-body leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
