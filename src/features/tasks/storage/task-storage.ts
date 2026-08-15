import type { Task } from "@/features/tasks/task-types";

const STORAGE_KEY = "orbit.tasks";

function isTaskArray(value: unknown): value is Task[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((task) => {
    if (typeof task !== "object" || task === null) {
      return false;
    }

    const candidate = task as Partial<Task>;

    return (
      typeof candidate.id === "string" &&
      typeof candidate.title === "string" &&
      (candidate.status === "todo" || candidate.status === "completed") &&
      (candidate.priority === "none" ||
        candidate.priority === "low" ||
        candidate.priority === "medium" ||
        candidate.priority === "high")
    );
  });
}

export function getTasks(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(stored);

    return isTaskArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
