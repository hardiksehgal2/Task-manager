"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasks, type TaskStatus } from "@/lib/api/tasks.api";
import TaskCard from "./TaskCard";
import CreateTaskDialog from "./CreateTaskDialog";
import { Loader2 } from "lucide-react";

const COLUMNS: TaskStatus[] = ["To Do", "In Progress", "Done"];

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-24 text-destructive text-sm">
        Failed to load tasks. Please try again.
      </div>
    );
  }

  const grouped = COLUMNS.reduce<Record<TaskStatus, typeof tasks>>((acc, col) => {
    acc[col] = tasks?.filter((t) => t.status === col) ?? [];
    return acc;
  }, {} as Record<TaskStatus, typeof tasks>);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold">Tasks</h1>
          <p className="font-body text-sm text-muted-foreground mt-0.5">
            {tasks?.length ?? 0} total task{tasks?.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CreateTaskDialog />
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <div key={col} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h2 className="font-headline text-sm font-bold">{col}</h2>
              <span className="font-body text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                {grouped[col]?.length ?? 0}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {grouped[col]?.length === 0 ? (
                <p className="font-body text-xs text-muted-foreground py-4 text-center border border-dashed border-border rounded-xl">
                  No tasks
                </p>
              ) : (
                grouped[col]?.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
