import { EmptyState } from "@/components/ui/empty-state-";
import { Task } from "../task-types";
import { TaskItem } from "./task-item";
import { CheckSquare } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState 
        icon={CheckSquare}
        title="No tasks"
        description="Add a task to get started"
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
