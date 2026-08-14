import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive";

type ButtonSize =
    | "sm"
    | "md"
    | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-surface-hover",
    ghost: "bg-transparent text-foreground hover:bg-surface-hover",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
};

const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
};

export function Button({
    className,
    variant = "primary",
    size = "md",
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button 
            type={type}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-md font-medium",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50",
                "[&_svg]:size-4 [&_svg]:shrink-0",
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        />
    )
}