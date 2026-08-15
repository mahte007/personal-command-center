export type TaskStatus = "todo" | "completed";

export type TaskPriority = "none" | "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
