import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Task } from "../task-types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatTaskDueDate } from "@/features/tasks/task-utils";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onDelete, onToggle, onEdit }: TaskItemProps) {
  const completed = task.status === "completed";

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border p-4",
        completed && "opacity-60",
      )}
    >
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={
          completed
            ? `Mark ${task.title} incomplete`
            : `Mark ${task.title} complete`
        }
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn("font-medium", completed && "line-through")}>
            {task.title}
          </p>

          {task.priority !== "none" ? (
            <PriorityBadge priority={task.priority} />
          ) : null}
        </div>

        {task.description ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {task.description}
          </p>
        ) : null}

        {task.dueDate ? (
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {formatTaskDueDate(task.dueDate)}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
        >
          <Pencil />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  if (priority === "high") {
    return <Badge variant="destructive">High</Badge>;
  }

  if (priority === "medium") {
    return <Badge variant="secondary">Medium</Badge>;
  }

  return <Badge variant="outline">Low</Badge>;
}
