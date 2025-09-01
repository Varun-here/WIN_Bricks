import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section 
      id={id}
      className={cn(
        "relative z-10 min-h-screen flex items-center justify-center px-6 py-20",
        className
      )}
    >
      <div className="max-w-6xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
};