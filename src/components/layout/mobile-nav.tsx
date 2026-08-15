"use client";

import { Menu, Settings } from "lucide-react";

import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { primaryNavigation, isRouteActive } from "@/config/navigation";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-md",
            "text-muted-foreground",
            "hover:bg-surface-hover hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <Menu className="size-5" />
          <span className="sr-only">Open navigation</span>
        </button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "left-0 top-0 h-dvh w-72 max-w-[85vw]",
          "translate-x-0 translate-y-0",
          "rounded-none border-y-0 border-l-0 p-0",
        )}
      >
        <DialogTitle className="sr-only">Navigation</DialogTitle>

        <DialogDescription className="sr-only">
          Navigate between sections of Orbit.
        </DialogDescription>

        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-border px-5">
            <span className="text-lg font-semibold">Orbit</span>
          </div>

          <nav className="flex flex-1 flex-col gap-1 p-3">
            {primaryNavigation.map((item) => {
              const Icon = item.icon;
              const active = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium",
                    "transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
                  )}
                >
                  <Icon className="size-4 shrin-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border p-3">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isRouteActive(pathname, "/settings")
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
              )}
            >
              <Settings className="size-4 shrink-0" />
              Settings
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
