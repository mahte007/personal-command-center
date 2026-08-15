import { Task } from "./task-types";

export function getActiveTasks(tasks: Task[]) {
  return tasks.filter((task) => task.status === "todo");
}

export function getCompletedTasks(tasks: Task[]) {
  return tasks.filter((task) => task.status === "completed");
}

export function getTasksDueOn(tasks: Task[], date: string) {
  return tasks.filter(
    (task) => task.status === "todo" && task.dueDate === date,
  );
}

export function getTodayDateString() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
