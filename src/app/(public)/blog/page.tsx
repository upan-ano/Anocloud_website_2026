import { getPosts } from "@/actions/blog";
import BlogClientPage from "./BlogClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Intelligence | AnoCloud Blog",
  description: "Explore the latest trends in AI-native cloud security, data gravity, and cyber-minimalism.",
};

export default async function BlogPage() {
  const blogs = await getPosts();

  return <BlogClientPage blogs={blogs} />;
}
