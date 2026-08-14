import { ReactNode } from "react";
import { Sidebar } from "./sidebar";

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({
    children
}: AppShellProps) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />

             <main className="min-w-0 flex-1">
                {children}
             </main>
        </div>
    )
}