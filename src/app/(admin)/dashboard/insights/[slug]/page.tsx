import React from "react";
import { getPostBySlug } from "@/actions/blog";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditInsightPage({ params }: Params) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <BlogForm initialData={post} />
    </div>
  );
}
