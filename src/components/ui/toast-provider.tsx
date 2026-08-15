"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastProvider as RadixToastProvider,
  ToastViewport,
} from "@/components/ui/toast";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastInput {
  title: string;
  description?: string;
  action?: ToastAction;
}

interface ToastItem extends ToastInput {
  id: string;
}

interface ToastContextValue {
  showToast: (toast: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface AppToastProviderProps {
  children: ReactNode;
}

export function AppToastProvider({ children }: AppToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((toast: ToastInput) => {
    const item: ToastItem = {
      ...toast,
      id: crypto.randomUUID(),
    };

    setToasts((current) => [...current, item]);
  }, []);

  function removeToast(id: string) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext value={{ showToast }}>
      <RadixToastProvider swipeDirection="right" duration={5000}>
        {children}

        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            open
            onOpenChange={(open) => {
              if (!open) {
                removeToast(toast.id);
              }
            }}
            title={toast.title}
            description={toast.description}
            action={
              toast.action ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toast.action?.onClick();
                    removeToast(toast.id);
                  }}
                >
                  {toast.action.label}
                </Button>
              ) : null
            }
          />
        ))}

        <ToastViewport />
      </RadixToastProvider>
    </ToastContext>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within AppToastProvider");
  }

  return context;
}
