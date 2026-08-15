import { CalendarDays, Trash2 } from "lucide-react";
import { Task } from "../task-types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onDelete, onToggle }: TaskItemProps) {
  const completed = task.status === "completed";

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border p-4",
        completed && "opacity-60",
      )}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(task.id)}
        aria-label={
          completed
            ? `Mark ${task.title} incomplete`
            : `Mark ${task.title} complete`
        }
        className="mt-1 size-4"
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
            {task.dueDate}
          </div>
        ) : null}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        <Trash2 />
      </Button>
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
