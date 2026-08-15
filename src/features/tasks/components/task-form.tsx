import { Input } from "@/components/ui/input";
import type { TaskPriority } from "@/features/tasks/task-types";
import { useState } from "react";

interface TaskFormValues {
  title: string;
  priority: TaskPriority;
}

interface TaskFormProps {
    onSubmit: (values: TaskFormValues) => void;
}

export function TaskForm({
    onSubmit
}: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("none")

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            return;
        }

        onSubmit({
            title: trimmedTitle,
            priority,
        });

        setTitle("");
        setPriority("none");
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input 
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What needs to be done?"
                aria-label="Task title"
            />

            <select
                value={priority}
                onChange={(event) => setPriority(event.target.value as TaskPriority)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
                <option value={"none"}>
                    No priority
                </option>
                <option value={"low"}>
                    Low
                </option>
                <option value={"medium"}>
                    Medium
                </option>
                <option value={"high"}>
                    High
                </option>
            </select>
        </form>
    )
}
