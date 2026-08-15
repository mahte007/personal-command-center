import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { MobileHeader } from "./mobile-header";
import { TaskProvider } from "@/features/tasks/task-provider";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <TaskProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="min-w-0 flex-1">
            <MobileHeader />

            <main>{children}</main>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}
