"use client";

import { cn } from "@/lib/utils";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const ToastProvider = ToastPrimitive.Provider;

interface ToastProps extends ComponentPropsWithoutRef<
  typeof ToastPrimitive.Root
> {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function Toast({
  title,
  description,
  action,
  className,
  ...props
}: ToastProps) {
  return (
    <ToastPrimitive.Root
      className={cn(
        "relative flex w-full items-start gap-4 rounded-lg border border-border bg-surface p-4 shadow-lg",
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <ToastPrimitive.Title className="text-sm font-medium">
          {title}
        </ToastPrimitive.Title>

        {description ? (
          <ToastPrimitive.Description className="mt-1 text-sm text-muted-foreground">
            {description}
          </ToastPrimitive.Description>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}

      <ToastPrimitive.Close
        className={cn(
          "shrink-0 rounded-md p-1 text-muted-foreground",
          "hover:bg-surface-hover hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <X className="size-4" />
        <span className="sr-only">Close notification</span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

export function ToastViewport() {
  return (
    <ToastPrimitive.Viewport
      className={cn(
        "fixed bottom-0 right-0 z-100 flex w-full max-w-sm flex-col gap-2 p-4",
      )}
    />
  );
}
