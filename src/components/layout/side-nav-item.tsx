import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarNavItemProps {
    href: string;
    label: string;
    icon: LucideIcon;
    active?: boolean;
}

export function SidebarNavItem({
    href,
    label,
    icon: Icon,
    active = false,
}: SidebarNavItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
            )}    
        >
            <Icon className="size-4 shrink-0" />

            <span>{label}</span>
        </Link>
    )
}