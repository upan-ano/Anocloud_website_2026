"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { Cpu, Cloud, Shield, Database, Layout, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "AI & Intelligent Automation",
    description: "From LLM integration to autonomous agents, we build AI that solves real business problems, not just hype.",
    icon: Cpu,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Cloud Modernization",
    description: "High-performance, secure migrations that turn your cloud into an engine for growth and agility.",
    icon: Cloud,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Cyber Security & Risk",
    description: "Proactive, SOC2-aligned security from the ground up. Protect your data, customers, and reputation.",
    icon: Shield,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Data & Digital Engineering",
    description: "Custom-built software and data pipelines designed for scale, speed, and absolute precision.",
    icon: Database,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Prototype & MVP Dev",
    description: "Validate ideas and launch faster with our high-velocity product engineering framework.",
    icon: Rocket,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "UI/UX Design Systems",
    description: "Premium, scalable design systems that provide a seamless and high-converting user experience.",
    icon: Layout,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

export default function ServicesGrid() {
  return (
    <Section id="services" className="bg-slate-50/50">
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border-primary/20 overflow-hidden">
           <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
              Our Core Capabilities
           </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-foreground leading-tight">
          Engineering the <span className="text-gradient">Intelligent Era</span>
        </h2>
        <p className="text-lg text-text-body">
          We don't just provide services; we provide the technical foundation for your next decade of growth.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative glass p-8 rounded-[2rem] border-black/5 hover:border-primary/40 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className={`w-14 h-14 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <service.icon className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">{service.title}</h3>
            <p className="text-text-body text-sm leading-relaxed mb-8">
              {service.description}
            </p>

            <Link href="#contact" className="flex items-center space-x-2 text-sm font-bold text-text-body/60 group-hover:text-primary transition-colors">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
