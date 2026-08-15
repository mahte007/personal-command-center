"use client";

import { useEffect, useState } from "react";

import { TaskForm } from "@/features/tasks/components/task-form";
import { TaskList } from "@/features/tasks/components/task-list";
import { getTasks, saveTasks } from "@/features/tasks/task-storage";
import type { Task } from "@/features/tasks/task-types";
import { createTask } from "@/features/tasks/task-utils";
import { Button } from "@/components/ui/button";

type TaskFilter = "all" | "active" | "completed";

export function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>("all");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTasks(getTasks());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    saveTasks(tasks);
  }, [tasks, loaded]);

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") {
      return task.status === "todo";
    }

    if (filter === "completed") {
      return task.status === "completed";
    }

    return true;
  });

  function handleCreateTask({
    title,
    priority,
  }: {
    title: string;
    priority: Task["priority"];
  }) {
    const task = createTask({
      title,
      priority,
    });

    setTasks((current) => [task, ...current]);
  }

  function handleToggleTask(taskId: string) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const completed = task.status !== "completed";

        return {
          ...task,
          status: completed ? "completed" : "todo",
          completedAt: completed ? new Date().toISOString() : undefined,
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  }

  function handleDeleteTask(taskId: string) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading tasks...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <TaskForm onSubmit={handleCreateTask} />

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={filter === "all" ? "primary" : "ghost"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>

        <Button
          size="sm"
          variant={filter === "active" ? "primary" : "ghost"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>

        <Button
          size="sm"
          variant={filter === "completed" ? "primary" : "ghost"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>

      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
