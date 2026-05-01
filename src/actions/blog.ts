"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

// We'll use the root directory as the source of truth for now, 
// matching the existing structure until we decide to migrate to src/blogContent.
const BLOG_CONTENT_DIR = path.join(process.cwd(), "src", "blogContent");
const BLOGS_JSON_PATH = path.join(process.cwd(), "src", "blogContent", "metadata.json");

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
 * Fetch all blog posts metadata from blogs.json
 */
export async function getPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(BLOGS_JSON_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading blogs.json:", error);
    return [];
  }
}

/**
 * Get a single blog post by its slug, including content from the markdown file
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getPosts();
    const metadata = posts.find((p) => p.slug === slug);
    if (!metadata) return null;

    // Try both .md and .mdx
    let content = "";
    const mdPath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);
    const mdxPath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);

    try {
      if (await fs.stat(mdxPath).catch(() => null)) {
        content = await fs.readFile(mdxPath, "utf-8");
      } else if (await fs.stat(mdPath).catch(() => null)) {
        content = await fs.readFile(mdPath, "utf-8");
      }
    } catch (e) {
      console.warn(`Content file not found for slug: ${slug}`);
    }

    return { ...metadata, content };
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Save or update a blog post
 */
export async function savePost(post: BlogPost, content: string) {
  try {
    const posts = await getPosts();
    const index = posts.findIndex((p) => p.slug === post.slug || p.id === post.id);

    if (index !== -1) {
      // Update existing
      posts[index] = { ...posts[index], ...post };
    } else {
      // Create new
      posts.push(post);
    }

    // Save metadata
    await fs.writeFile(BLOGS_JSON_PATH, JSON.stringify(posts, null, 2), "utf-8");

    // Save content as .mdx as requested in the prompt
    const contentPath = path.join(BLOG_CONTENT_DIR, `${post.slug}.mdx`);
    await fs.writeFile(contentPath, content, "utf-8");

    // Clear the old .md if it exists and we're now using .mdx
    const oldMdPath = path.join(BLOG_CONTENT_DIR, `${post.slug}.md`);
    if (contentPath !== oldMdPath) {
      await fs.unlink(oldMdPath).catch(() => {});
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/(admin)/dashboard/insights");

    return { success: true };
  } catch (error) {
    console.error("Error saving post:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Delete a blog post
 */
export async function deletePost(slug: string) {
  try {
    const posts = await getPosts();
    const updatedPosts = posts.filter((p) => p.slug !== slug);

    if (posts.length === updatedPosts.length) {
      return { success: false, error: "Post not found" };
    }

    // Save metadata
    await fs.writeFile(BLOGS_JSON_PATH, JSON.stringify(updatedPosts, null, 2), "utf-8");

    // Delete content file (both .md and .mdx)
    await fs.unlink(path.join(BLOG_CONTENT_DIR, `${slug}.mdx`)).catch(() => {});
    await fs.unlink(path.join(BLOG_CONTENT_DIR, `${slug}.md`)).catch(() => {});

    revalidatePath("/blog");
    revalidatePath("/(admin)/dashboard/insights");

    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Get recent activity (last 5 modifications)
 * For now, this is a placeholder that returns the last 5 posts in the JSON
 */
export async function getRecentActivity() {
  const posts = await getPosts();
  return posts.slice(-5).reverse();
}

/**
 * Get dashboard stats
 */
export async function getDashboardStats() {
  const posts = await getPosts();
  return {
    totalPosts: posts.length,
    aeoScore: 84, // Placeholder
    contentVelocity: 1.2, // Placeholder (posts per week/month)
  };
}

/**
 * Get all images from public/assets/blog
 */
export async function getImages() {
  const assetsDir = path.join(process.cwd(), "public", "assets", "blog");
  try {
    await fs.mkdir(assetsDir, { recursive: true });
    const files = await fs.readdir(assetsDir);
    return files
      .filter(file => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file))
      .map(file => ({
        name: file,
        url: `/assets/blog/${file}`
      }));
  } catch (error) {
    console.error("Error reading images:", error);
    return [];
  }
}

/**
 * Upload Image Action
 */
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    const assetsDir = path.join(process.cwd(), "public", "assets", "blog");
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(assetsDir, file.name);

    await fs.mkdir(assetsDir, { recursive: true });
    await fs.writeFile(filePath, buffer);
    
    revalidatePath("/(admin)/dashboard/media");
    return { success: true, url: `/assets/blog/${file.name}` };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
