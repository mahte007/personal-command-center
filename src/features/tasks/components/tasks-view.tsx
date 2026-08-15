"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { TaskEditDialog } from "@/features/tasks/components/task-edit-dialog";
import { TaskForm } from "@/features/tasks/components/task-form";
import { TaskList } from "@/features/tasks/components/task-list";
import { useTasks } from "@/features/tasks/task-provider";
import type { Task, TaskPriority } from "@/features/tasks/task-types";

type TaskFilter = "all" | "active" | "completed";

type TaskSort = "created" | "due-date" | "priority";

const priorityWeight: Record<TaskPriority, number> = {
  none: 0,
  low: 1,
  medium: 2,
  high: 3,
};

export function TasksView() {
  const { tasks, loaded, addTask, toggleTask, updateTask, deleteTask } =
    useTasks();

  const [filter, setFilter] = useState<TaskFilter>("all");

  const [sort, setSort] = useState<TaskSort>("created");

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      if (filter === "active") {
        return task.status === "todo";
      }

      if (filter === "completed") {
        return task.status === "completed";
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "due-date") {
        if (!a.dueDate && !b.dueDate) {
          return 0;
        }

        if (!a.dueDate) {
          return 1;
        }

        if (!b.dueDate) {
          return -1;
        }

        return a.dueDate.localeCompare(b.dueDate);
      }

      if (sort === "priority") {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }

      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [tasks, filter, sort]);

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading tasks…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <TaskForm onSubmit={addTask} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1">
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

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as TaskSort)}
          aria-label="Sort tasks"
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="created">Newest</option>

          <option value="due-date">Due date</option>

          <option value="priority">Priority</option>
        </select>
      </div>

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={setEditingTask}
      />

      <TaskEditDialog
        task={editingTask}
        open={editingTask !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingTask(null);
          }
        }}
        onSave={updateTask}
      />
    </div>
  );
}
