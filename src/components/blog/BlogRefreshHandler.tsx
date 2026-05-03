"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * A small utility component that listens for window focus 
 * and triggers a router refresh to sync data across tabs.
 */
export default function BlogRefreshHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleFocus = () => {
      router.refresh();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [router]);

  return null;
}
