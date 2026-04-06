"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTask, type Task, type TaskStatus, type UpdateTaskPayload } from "@/lib/api/tasks.api";

const STATUS_OPTIONS: TaskStatus[] = ["To Do", "In Progress", "Done"];

interface Props {
  task: Task;
}

export default function EditTaskDialog({ task }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<UpdateTaskPayload>({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: UpdateTaskPayload) => updateTask(task._id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated successfully");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <>
      <Button variant="ghost" size="icon-sm" onClick={() => setOpen(true)} aria-label="Edit task">
        <Pencil className="size-3.5" />
      </Button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (next) setForm({ title: task.title, description: task.description, status: task.status });
          setOpen(next);
        }}
      >
        <DialogContent className="sm:max-w-md font-body antialiased">
          <DialogHeader>
            <DialogTitle className="font-headline">Edit Task</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor={`title-${task._id}`}>Title</Label>
              <Input
                id={`title-${task._id}`}
                placeholder="Task title"
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`desc-${task._id}`}>Description</Label>
              <Textarea
                id={`desc-${task._id}`}
                placeholder="Describe the task (min 6 characters)"
                rows={3}
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`status-${task._id}`}>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as TaskStatus }))}
              >
                <SelectTrigger id={`status-${task._id}`} className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
