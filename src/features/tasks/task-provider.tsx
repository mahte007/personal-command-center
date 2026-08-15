"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getTasks, saveTasks } from "@/features/tasks/storage/task-storage";
import type { Task } from "@/features/tasks/task-types";
import { createTask } from "@/features/tasks/task-utils";

interface TaskContextValue {
  tasks: Task[];
  loaded: boolean;
  addTask: (input: Parameters<typeof createTask>[0]) => void;
  toggleTask: (taskId: string) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
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
      current.map((task) =>
        task.id === updatedTask.id
          ? {
              ...updatedTask,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }

  function deleteTask(taskId: string) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  const value = useMemo(
    () => ({
      tasks,
      loaded,
      addTask,
      toggleTask,
      updateTask,
      deleteTask,
    }),
    [tasks, loaded],
  );

  return <TaskContext value={value}>{children}</TaskContext>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
}

export function getOverdueTasks(tasks: Task[], today: string) {
  return tasks.filter(
    (task) =>
      task.status === "todo" &&
      task.dueDate !== undefined &&
      task.dueDate < today,
  );
}
