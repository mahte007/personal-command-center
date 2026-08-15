"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type {
  Task,
  TaskPriority,
} from "@/features/tasks/task-types";

interface TaskEditDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Task) => void;
}

export function TaskEditDialog({
  task,
  open,
  onOpenChange,
  onSave,
}: TaskEditDialogProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] =
    useState<TaskPriority>("none");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!task) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(task.title);
    setPriority(task.priority);
    setDueDate(task.dueDate ?? "");
  }, [task]);

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!task || !title.trim()) {
      return;
    }

    onSave({
      ...task,
      title: title.trim(),
      priority,
      dueDate: dueDate || undefined,
      updatedAt: new Date().toISOString(),
    });

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          Edit task
        </DialogTitle>

        <DialogDescription className="mt-1 text-sm text-muted-foreground">
          Update the task details.
        </DialogDescription>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >
          <Input
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Task title"
          />

          <select
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target.value as TaskPriority,
              )
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="none">No priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <Input
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}