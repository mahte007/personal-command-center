"use client";

import {
  CalendarDays,
  CheckSquare,
  Home,
  NotebookText,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "./side-nav-item";

const primaryNavigation = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Calender",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: NotebookText,
  },
];

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="flex h-16 items-center px-5">
        <span className="text-lg font-semibold">Orbit</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {primaryNavigation.map((item) => (
          <SidebarNavItem
            key={item.href}
            {...item}
            active={isRouteActive(pathname, item.href)}
          />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <SidebarNavItem
          href="/settings"
          label="Settings"
          icon={Settings}
          active={isRouteActive(pathname, "/settings")}
        />
      </div>
    </aside>
  );
}
