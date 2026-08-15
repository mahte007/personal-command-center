"use client";

import { useState } from "react";

import { TaskEditDialog } from "@/features/tasks/components/task-edit-dialog";
import { TaskForm } from "@/features/tasks/components/task-form";
import { TaskList } from "@/features/tasks/components/task-list";
import { useTasks } from "@/features/tasks/hooks/use-tasks";
import type { Task } from "@/features/tasks/task-types";
import { Button } from "@/components/ui/button";

type TaskFilter = "all" | "active" | "completed";

type TaskSort = "created" | "due-date" | "priority";

export function TasksView() {
  const { tasks, loaded, addTask, toggleTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sort, setSort] = useState<TaskSort>("created");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const visibleTasks = tasks
    .filter((task) => {
      if (filter === "active") {
        return task.status === "todo";
      }

      if (filter === "completed") {
        return task.status === "completed";
      }

      return true;
    })
    .toSorted((a, b) => {
      if (sort === "due-date") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return a.dueDate.localeCompare(b.dueDate);
      }

      if (sort === "priority") {
        const weight = {
          high: 3,
          medium: 2,
          low: 1,
          none: 0,
        };

        return weight[b.priority] - weight[a.priority];
      }

      return b.createdAt.localeCompare(a.createdAt);
    });

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading tasks...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <TaskForm onSubmit={addTask} />

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

      <select
        value={sort}
        onChange={(event) => setSort(event.target.value as TaskSort)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="created">Newest</option>
        <option value="due-date">Due date</option>
        <option value="priority">Priority</option>
      </select>

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
