"use client";

import { Badge } from "@/components/ui/badge";
import { type Task, type TaskStatus } from "@/lib/api/tasks.api";
import { cn } from "@/lib/utils";
import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";

const statusStyles: Record<TaskStatus, string> = {
  "To Do": "bg-muted text-muted-foreground",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse-ring",
  "Done": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const borderAccent: Record<TaskStatus, string> = {
  "To Do": "border-l-border",
  "In Progress": "border-l-blue-400 dark:border-l-blue-500",
  "Done": "border-l-green-500 dark:border-l-green-600",
};

const statusDot: Record<TaskStatus, string> = {
  "To Do": "bg-muted-foreground",
  "In Progress": "bg-blue-500",
  "Done": "bg-green-500",
};

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const isDone = task.status === "Done";

  return (
    <div
      className={cn(
        "rounded-xl border border-border border-l-4 bg-card p-4 shadow-sm flex flex-col gap-3",
        "transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md",
        borderAccent[task.status]
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          className={cn(
            "font-headline font-bold text-sm leading-snug line-clamp-2 transition-colors duration-300",
            isDone && "line-through text-muted-foreground"
          )}
        >
          {task.title}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          <EditTaskDialog task={task} />
          <DeleteTaskDialog task={task} />
        </div>
      </div>

      <p className="font-body text-xs text-muted-foreground line-clamp-3">{task.description}</p>

      <div className="flex items-center justify-between gap-2">
        <Badge className={cn("border-0 gap-1.5", statusStyles[task.status])}>
          <span className={cn("size-1.5 rounded-full inline-block", statusDot[task.status])} />
          {task.status}
        </Badge>
        <span className="text-[11px] text-muted-foreground">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}