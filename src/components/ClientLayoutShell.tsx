"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingRobot from "@/components/FloatingRobot";

export default function ClientLayoutShell() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <FloatingRobot />
    </>
  );
}
