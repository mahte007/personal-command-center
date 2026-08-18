import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({
    title,
    description,
    icon: Icon,
    action,
    className,
}: EmptyStateProps) {
    return(
        <div
            className={cn(
                "flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center",
                className
            )}
        >
            {Icon ? (
                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="size-5" />
                </div>
            ) : null}

            <h3 className="font-medium">
                {title}
            </h3>

            {description ? (
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    {description}
                </p>
            ) : null}

            {action ? (
                <div className="mt-4">
                    {action}
                </div>
            ) : null}
        </div>
    )
}