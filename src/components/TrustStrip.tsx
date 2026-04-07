import { motion } from "framer-motion";

const partners = [
  "AWS Premier Partner",
  "Google Cloud",
  "Microsoft Azure",
  "Salesforce",
  "SOC2 Type II",
  "ISO 27001",
];

export default function TrustStrip() {
  return (
    <section className="py-12 border-y border-black/5 bg-slate-50/30 relative overflow-hidden backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-center text-text-body/60 mb-8">
          Trusted Expertise Across Global Ecosystems
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
          {partners.map((partner, i) => (
            <div
              key={partner}
              className="text-lg md:text-xl font-outfit font-bold text-foreground whitespace-nowrap"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
