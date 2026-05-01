import fs from 'fs';
import path from 'path';

export type Blog = {
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
};

export const getBlogsDataFile = () => {
  return path.join(process.cwd(), 'blogConstants/blogs.json');
}

export const getBlogs = (): Blog[] => {
  try {
    const filePath = getBlogsDataFile();
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading blogs.json:', err);
    return [];
  }
};

export const getBlogById = (id: number): Blog | undefined => {
  const blogs = getBlogs();
  return blogs.find((b) => b.id === id);
};

export const getBlogBySlug = (slug: string): Blog | undefined => {
  const blogs = getBlogs();
  return blogs.find((b) => b.slug === slug);
};
