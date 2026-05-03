"use server";

import { revalidatePath, revalidateTag } from "next/cache";

const BLOG_API_URL = process.env.BLOG_CONTENT_APP_SCRIPT_URL;

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  views: string;
  image: string;
  tags?: string[];
  content?: string;
}

/**
 * Fetch all blog posts metadata from Google Drive via Apps Script
 */
export async function getPosts(): Promise<BlogPost[]> {
  if (!BLOG_API_URL) {
    console.error("BLOG_CONTENT_APP_SCRIPT_URL is not defined");
    return [];
  }

  try {
    const response = await fetch(`${BLOG_API_URL}?action=getMetadata`, {
      next: { revalidate: 3600, tags: ["blogs"] } // Cache for 1 hour
    });
    
    if (!response.ok) throw new Error("Failed to fetch metadata");
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching blogs from Google Drive:", error);
    return [];
  }
}

/**
 * Get a single blog post by its slug, including content from Google Drive
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!BLOG_API_URL) return null;

  try {
    // 1. Get Metadata (cached)
    const posts = await getPosts();
    const metadata = posts.find((p) => p.slug === slug);
    if (!metadata) return null;

    // 2. Get Content (cached)
    const contentResponse = await fetch(`${BLOG_API_URL}?action=getContent&slug=${slug}`, {
      next: { revalidate: 3600, tags: [`blog-${slug}`] }
    });

    if (!contentResponse.ok) {
      console.warn(`Content not found for slug: ${slug}`);
      return { ...metadata, content: "" };
    }

    const content = await contentResponse.text();
    
    // Check if GAS returned an error JSON instead of MDX content
    if (content.trim().startsWith('{"error":')) {
       console.error("GAS returned content error:", content);
       return { ...metadata, content: "" };
    }

    return { ...metadata, content };
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Save or update a blog post in Google Drive
 */
export async function savePost(post: BlogPost, content: string) {
  if (!BLOG_API_URL) return { success: false, error: "API URL missing" };

  try {
    const response = await fetch(BLOG_API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "savePost",
        post,
        content
      }),
    });

    if (!response.ok) throw new Error("Failed to connect to Google Drive API");

    const result = await response.json();
    if (result.success) {
      // Purge cache
      revalidateTag("blogs", "max");
      revalidateTag(`blog-${post.slug}`, "max");
      
      // Revalidate paths
      revalidatePath("/blog", "page");
      revalidatePath(`/blog/${post.slug}`, "page");
      revalidatePath("/dashboard", "page");
      revalidatePath("/dashboard/insights", "page");
      revalidatePath(`/dashboard/insights/${post.slug}`, "page");
      revalidatePath("/", "layout");
      
      return { success: true };
    }
    return { success: false, error: result.error || "Failed to save" };
  } catch (error) {
    console.error("Error saving post to Google Drive:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Delete a blog post from Google Drive
 */
export async function deletePost(slug: string) {
  if (!BLOG_API_URL) return { success: false, error: "API URL missing" };

  try {
    const response = await fetch(BLOG_API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "deletePost",
        slug
      }),
    });

    if (!response.ok) throw new Error("Failed to connect to Google Drive API");

    const result = await response.json();
    if (result.success) {
      // Purge cache
      revalidateTag("blogs", "max");
      
      // Revalidate paths
      revalidatePath("/blog", "page");
      revalidatePath("/dashboard", "page");
      revalidatePath("/dashboard/insights", "page");
      revalidatePath("/", "layout");
      
      return { success: true };
    }
    return { success: false, error: result.error || "Failed to delete" };
  } catch (error) {
    console.error("Error deleting post from Google Drive:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Dashboard Stats and Activity
 */
export async function getRecentActivity() {
  const posts = await getPosts();
  return posts.slice(-5).reverse();
}

export async function getDashboardStats() {
  const posts = await getPosts();
  return {
    totalPosts: posts.length,
    aeoScore: 84, // Placeholder
    contentVelocity: (posts.length / 4).toFixed(1), // Rough estimate
  };
}

/**
 * Image Management
 * Extracts unique image URLs from processed blog posts.
 */
export async function getImages() {
  const posts = await getPosts();
  const uniqueUrls = Array.from(new Set(posts.map(p => p.image).filter(Boolean)));
  
  return uniqueUrls.map(url => ({
    name: url.split('/').pop() || "Insight Image",
    url: url
  }));
}

export async function uploadImage(formData: FormData) {
  return { success: false, error: "External image links only. Please provide the URL in the Insight editor." };
}
