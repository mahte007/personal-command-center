import type { Task } from "@/features/tasks/task-types";

const STORAGE_KEY = "orbit.tasks";

export function getTasks(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Task[];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
