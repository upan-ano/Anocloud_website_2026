"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import FluidGreenBackground from "@/components/FluidGreenBackground";
import Image from "next/image";

import blogsData from "../../../../blogConstants/blogs.json";

export default function BlogPage() {
  const trendingArticle = blogsData[0];
  const recentArticles = blogsData.slice(1);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Diagonal Ribbon Background */}
      <section className="relative min-h-[85vh] flex items-center pt-24 overflow-hidden border-b border-black/5 bg-white">
        <FluidGreenBackground />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Visual & Vertical Text */}
            <div className="relative h-full min-h-[400px] flex items-center justify-center lg:justify-end lg:pr-12">
               <div className="relative">
                 {/* The Featured Image on top of the ribbons */}
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0 }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className="relative w-[320px] lg:w-[400px] aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/20 z-10"
                 >
                   {/* Using standard img to prevent unconfigured host error without needing a server restart */}
                   <img 
                      src={trendingArticle.image}
                      alt={trendingArticle.title}
                      className="w-full h-full object-cover"
                   />
                 </motion.div>

                 {/* Vertical 'TRENDING' Text positioned safely on the LEFT side of the image to ensure green contrast */}
                 <div className="absolute top-0 -left-28 h-full hidden lg:flex items-center justify-center z-20 pointer-events-none">
                   <div className="-rotate-90 origin-center whitespace-nowrap">
                     <span 
                        className="text-7xl font-black tracking-widest text-transparent uppercase"
                        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}
                     >
                       Trending
                     </span>
                   </div>
                 </div>
               </div>
            </div>

            {/* Right Column: Article Context (Text) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 lg:pl-10 pb-12 lg:pb-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-outfit font-extrabold text-foreground leading-[1.1] tracking-tight">
                {trendingArticle.title}
              </h1>

              <p className="text-lg text-text-body leading-relaxed max-w-xl font-medium">
                {trendingArticle.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-text-body/80 pt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#B22222]/10 rounded-full border border-[#B22222]/20 flex items-center justify-center font-bold text-[#B22222]">
                    A
                  </div>
                  <span className="text-foreground">{trendingArticle.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#B22222]" />
                  <span>{trendingArticle.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#B22222]" />
                  <span>{trendingArticle.readTime}</span>
                </div>
              </div>

              <div className="pt-3 pb-8">
                <Link 
                  href={`/blog/${trendingArticle.slug}`}
                  className="inline-flex items-center space-x-2 text-[#B22222] font-bold hover:text-[#8B1A1A] transition-all group text-lg"
                >
                  <span className="border-b-2 border-[#B22222] pb-0.5">Read the full article</span>
                  <div className="w-8 h-8 rounded-full border border-[#B22222] flex items-center justify-center group-hover:bg-[#B22222] group-hover:text-white transition-all">
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Recent Articles Grid */}
      <section className="py-24 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-outfit font-bold text-foreground">Latest Publications</h2>
            <Link href="#" className="flex items-center space-x-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-foreground text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-outfit leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-xs font-medium text-text-body/70 pt-2">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B22222]" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B22222]" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <Link href={`/blog/${article.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">Read {article.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
