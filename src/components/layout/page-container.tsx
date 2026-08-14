import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function PageContainer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 py-8", className)}
      {...props}
    />
  );
}
