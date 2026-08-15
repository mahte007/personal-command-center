import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function PageContainer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-6",
        "sm:px-6 sm:py-8",
        className,
      )}
      {...props}
    />
  );
}
