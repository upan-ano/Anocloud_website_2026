"use client";

import { motion } from "framer-motion";

export default function FluidGreenBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full z-0 pointer-events-none">
      
      {/* Container for angled folding ribbons, skewed precisely like the reference image */}
      <div 
         className="absolute -top-[10%] -left-[30%] lg:-left-[10%] w-[100%] lg:w-[70%] h-[120%] flex z-0" 
         style={{ transform: "skewX(-35deg)" }}
      >
        <div className="w-[150%] h-full bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#022c22] shadow-[20px_0_50px_rgba(255,255,255,0.2)] absolute left-[-50%]" />
        
        <motion.div 
           animate={{ x: ["0%", "30%", "-5%", "0%"], skewX: ["0deg", "-3deg", "1deg", "0deg"] }}
           transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
           className="w-[120%] h-full bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#059669] shadow-[30px_0_60px_rgba(200,200,200,0.4)] absolute left-[-30%]" 
        />
        
        <motion.div 
           animate={{ x: ["0%", "-20%", "25%", "0%"], skewX: ["0deg", "4deg", "-2deg", "0deg"] }}
           transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
           className="w-[120%] h-full bg-gradient-to-r from-transparent via-[#065f46] to-[#10b981] shadow-[40px_0_70px_rgba(255,255,255,0.4)] absolute left-[-15%]" 
        />
        
        <motion.div 
           animate={{ x: ["0%", "28%", "-15%", "0%"], skewX: ["0deg", "-2deg", "3deg", "0deg"] }}
           transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
           className="w-[120%] h-full bg-gradient-to-r from-[#047857] via-[#059669] to-[#34d399] shadow-[50px_0_80px_rgba(230,230,230,0.5)] absolute left-[0%]" 
        />
        
        {/* Bright, highly structured accent slice mimicking light catching the edge of a violent fold */}
        <motion.div 
           animate={{ x: ["0%", "-25%", "15%", "0%"], skewX: ["0deg", "3deg", "-1deg", "0deg"] }}
           transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
           className="w-[120%] h-full bg-gradient-to-r from-transparent via-[#10b981] to-[#6ee7b7] shadow-[20px_0_50px_rgba(255,255,255,0.6)] mix-blend-overlay absolute left-[15%]" 
        />
      </div>

    </div>
  );
}
