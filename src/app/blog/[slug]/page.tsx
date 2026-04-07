import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import blogsData from '../../../../blogConstants/blogs.json';

const getBlogs = () => blogsData;
const getBlogBySlug = (slug: string) => blogsData.find((blog) => blog.slug === slug);

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `https://upasana-s-expedition.vercel.app/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

export default async function BlogPage({ params }: Params) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f6f5f1] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article not found</h1>
          <Link href="/blog" className="text-[#005241] font-semibold hover:underline">← Back to all articles</Link>
        </div>
      </div>
    );
  }

  const filePath = path.join(process.cwd(), 'blogContent', `${resolvedParams.slug}.md`);
  const fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const content = marked.parse(fileContent) as string;

  return (
    <div className="min-h-screen bg-[#f6f5f1]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Instrument+Sans:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body    { font-family: 'Instrument Sans', system-ui, sans-serif; }
        .prose-article { line-height: 1.85; font-family: 'Instrument Sans', system-ui, sans-serif; }
        .prose-article h1 { font-family: 'Fraunces', Georgia, serif; font-size: 2rem; font-weight: 900; color: #111; margin-top: 2.5rem; margin-bottom: 1rem; }
        .prose-article h2 { font-family: 'Fraunces', Georgia, serif; font-size: 1.5rem; font-weight: 900; color: #111; margin-top: 2.5rem; margin-bottom: 0.9rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e5e7eb; }
        .prose-article h3 { font-family: 'Fraunces', Georgia, serif; font-size: 1.2rem; font-weight: 700; color: #222; margin-top: 2rem; margin-bottom: 0.75rem; }
        .prose-article p { color: #374151; margin-bottom: 1.35rem; font-size: 1.0625rem; }
        .prose-article ul, .prose-article ol { color: #374151; margin-bottom: 1.25rem; padding-left: 1.75rem; }
        .prose-article li { margin-bottom: 0.45rem; font-size: 1.0625rem; }
        .prose-article strong { color: #111827; font-weight: 700; }
        .prose-article em { color: #4b5563; }
        .prose-article code { background: #f0fdf4; color: #166534; padding: 2px 7px; border-radius: 5px; font-size: 0.875em; font-family: 'Fira Code', 'Courier New', monospace; border: 1px solid #bbf7d0; }
        .prose-article pre { background: #0f172a; color: #e2e8f0; padding: 1.5rem; border-radius: 12px; overflow-x: auto; margin-bottom: 1.75rem; border: 1px solid #1e293b; }
        .prose-article pre code { background: none; color: inherit; padding: 0; border: none; font-size: 0.875rem; }
        .prose-article blockquote { border-left: 4px solid #005241; padding: 0.75rem 1.25rem; color: #4b5563; font-style: italic; margin: 1.75rem 0; background: #f0fdf4; border-radius: 0 8px 8px 0; }
        .prose-article a { color: #005241; text-decoration: underline; text-underline-offset: 3px; }
        .prose-article a:hover { color: #003b2d; }
        .prose-article img { border-radius: 10px; margin: 1.5rem auto; max-width: 100%; display: block; box-shadow: 0 4px 24px rgba(0,0,0,0.10); }
        .prose-article hr { border: none; border-top: 2px solid #e5e7eb; margin: 2.5rem 0; }
        .prose-article table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.9375rem; }
        .prose-article th { background: #f3f4f6; font-weight: 700; padding: 0.6rem 0.9rem; text-align: left; border: 1px solid #e5e7eb; }
        .prose-article td { padding: 0.6rem 0.9rem; border: 1px solid #e5e7eb; color: #374151; }
        .prose-article tr:nth-child(even) td { background: #f9fafb; }
      `}</style>

      {/* Sticky top nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 font-body">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[#005241] font-semibold text-sm hover:text-[#003b2d] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            All Articles
          </Link>
          <div className="flex items-center gap-2">
            
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12 font-body">

        {/* Category & tags */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {blog.category && (
            <span className="bg-[#005241] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              {blog.category}
            </span>
          )}
          {blog.tags?.map((tag, i) => (
            <span key={i} className="text-[10px] text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-4xl md:text-[2.85rem] text-gray-900 leading-[1.1] tracking-tight mb-6">
          {blog.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-gray-500 leading-relaxed mb-8 border-l-4 border-[#56c48f] pl-5 italic">
          {blog.excerpt}
        </p>

        {/* Author + meta row */}
        <div className="flex items-center gap-4 py-4 border-y border-gray-200 mb-10">
          <div className="w-10 h-10 rounded-full bg-[#005241] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {blog.author.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm">{blog.author}</div>
            <div className="text-xs text-gray-400">{blog.date}</div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 flex-shrink-0">
            <span className="flex items-center gap-1.5 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-2.5 py-1 rounded-full font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
              {blog.readTime} read
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              {blog.views}
            </span>
          </div>
        </div>

        {/* Cover image */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-12 shadow-xl" style={{ aspectRatio: '16/9' }}>
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Article content */}
        <div className="prose-article" dangerouslySetInnerHTML={{ __html: content }} />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[#005241] font-semibold text-sm hover:text-[#003b2d] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
