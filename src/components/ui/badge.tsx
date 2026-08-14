import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant =
    | "default"
    | "secondary"
    | "destructive"
    | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border border-border bg-transparent text-foreground",
};

export function Badge({
    className,
    variant = "default",
    ...props
}: BadgeProps) {
    return (
        <span 
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                variants[variant],
                className,
            )}
            {...props}
        />
    )
}