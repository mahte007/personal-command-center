"use client";

import { useEffect, useState } from "react";

import { getTasks, saveTasks } from "@/features/tasks/task-storage";
import type { Task } from "@/features/tasks/task-types";
import { createTask } from "@/features/tasks/task-utils";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

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

  function addTask(input: Parameters<typeof createTask>[0]) {
    setTasks((current) => [createTask(input), ...current]);
  }

  function toggleTask(taskId: string) {
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

  function updateTask(updatedTask: Task) {
    setTasks((current) =>
      current.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  function deleteTask(taskId: string) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  return {
    tasks,
    loaded,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
  };
}
