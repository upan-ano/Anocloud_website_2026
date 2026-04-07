"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatingRobot() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="fixed bottom-6 right-6 z-50 cursor-pointer group"
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 glass bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-primary shadow-[0_0_15px_rgba(16,185,129,0.6),inset_0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.8),inset_0_0_15px_rgba(16,185,129,0.3)] hover:scale-110 transition-all duration-300 group-hover:border-green-400">
        <Image
          src="/assets/hero_img3.png"
          alt="AI Assistant"
          fill
          sizes="(max-width: 768px) 64px, 80px"
          className="object-contain p-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        />
        
        {/* Notification Dot */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
      </div>
    </motion.div>
  );
}
