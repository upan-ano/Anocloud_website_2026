import React from "react";
import { getImages } from "@/actions/blog";
import MediaVault from "@/components/admin/MediaVault";

export default async function MediaPage() {
  const images = await getImages();

  return (
    <div className="space-y-8">
      <MediaVault initialImages={images} />
    </div>
  );
}
