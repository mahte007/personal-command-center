"use client";

import { Button } from "@/components/ui/button";
import { useTasks } from "../hooks/use-tasks";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

function getLocalDateString() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function TodayTasks() {
  const { tasks, loaded, toggleTask } = useTasks();

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const today = getLocalDateString();

  const todayTasks = tasks.filter(
    (task) => task.status === "todo" && task.dueDate === today,
  );

  if (todayTasks.length === 0) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">Nothing due today.</p>

        <Button variant="ghost" size="sm" className="mt-3">
          <Link
            href="/tasks"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View Tasks
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {todayTasks.slice(0, 5).map((task) => (
        <label key={task.id} className="flex items-center gap-3 text-sm">
          <Checkbox
            checked={false}
            onCheckedChange={() => toggleTask(task.id)}
          />

          <span className="truncate">{task.title}</span>
        </label>
      ))}

      <Button variant="ghost" size="sm">
        <Link
          href="/tasks"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          View all tasks
        </Link>
      </Button>
    </div>
  );
}
