import type { Task, TaskPriority } from "@/features/tasks/task-types";

interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
}

export function createTask({
  title,
  description,
  dueDate,
  priority = "none",
}: CreateTaskInput): Task {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description?.trim() || undefined,
    priority,
    dueDate,
    status: "todo",
    createdAt: now,
    updatedAt: now,
  };
}

export function formatTaskDueDate(dueDate: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dueDate}T00:00:00`));
}
