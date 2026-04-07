import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export default function Section({ children, className, id, containerClassName }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-24 px-6 md:py-32", className)}
    >
      <div className={cn("max-w-7xl mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
