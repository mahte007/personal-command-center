import {
  CalendarDays,
  CheckSquare,
  Home,
  NotebookText,
} from "lucide-react";

export const primaryNavigation = [
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
    label: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: NotebookText,
  },
];

export function isRouteActive(
    pathname: string,
    href: string,
) {
    if (href === "/") {
        return pathname === "/";
    }

    return pathname.startsWith(href);
}