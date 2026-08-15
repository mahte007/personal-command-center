"use client";

import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import {
  getTasksDueOn,
  getTodayDateString,
} from "@/features/tasks/task-selectors";
import { useTasks } from "@/features/tasks/task-provider";

export function TodayTasks() {
  const { tasks, loaded, toggleTask } = useTasks();

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  const todayTasks = getTasksDueOn(tasks, getTodayDateString());

  if (todayTasks.length === 0) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">Nothing due today.</p>

        <Link
          href="/tasks"
          className="mt-3 inline-block text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          View tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {todayTasks.slice(0, 5).map((task) => (
        <div key={task.id} className="flex items-center gap-3">
          <Checkbox
            checked={false}
            onCheckedChange={() => toggleTask(task.id)}
            aria-label={`Complete ${task.title}`}
          />

          <span className="min-w-0 flex-1 truncate text-sm">{task.title}</span>
        </div>
      ))}

      <Link
        href="/tasks"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        View all tasks
      </Link>
    </div>
  );
}
