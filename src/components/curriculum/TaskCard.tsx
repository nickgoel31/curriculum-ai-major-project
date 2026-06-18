'use client';

import { Task } from '@/types/database.types';
import { WeekBadge } from './WeekBadge';
import { useCurriculumStore } from '@/store/curriculumStore';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';

export function TaskCard({ task }: { task: Task }) {
  const { curriculumData, completedTaskIds, toggleTaskComplete } = useCurriculumStore();
  const isCompleted = completedTaskIds.has(task.id);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    // Optimistic UI update
    toggleTaskComplete(task.id, checked);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/curriculum/${curriculumData?.id}/complete-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, completed: checked }),
      });

      if (!res.ok) throw new Error('Failed to update task');
    } catch (error) {
      // Revert on error
      toggleTaskComplete(task.id, !checked);
      toast.error('Failed to save progress. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-xl border transition-all",
      isCompleted 
        ? "bg-emerald-500/5 border-emerald-500/20 opacity-80" 
        : "bg-slate-900/50 border-slate-800 hover:bg-slate-800/50"
    )}>
      <div className="pt-1">
        <Checkbox 
          id={`task-${task.id}`}
          checked={isCompleted}
          onCheckedChange={handleToggle}
          disabled={isLoading}
          className={cn(
            "h-5 w-5 rounded border-slate-600",
            isCompleted ? "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" : ""
          )}
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <label 
            htmlFor={`task-${task.id}`}
            className={cn(
              "font-medium leading-none cursor-pointer text-base",
              isCompleted ? "text-slate-400 line-through" : "text-slate-200"
            )}
          >
            {task.title}
          </label>
          <WeekBadge type={task.taskType} className={isCompleted ? "opacity-50 grayscale" : ""} />
        </div>
        <p className={cn(
          "text-sm",
          isCompleted ? "text-slate-500" : "text-slate-400"
        )}>
          {task.description}
        </p>
      </div>
    </div>
  );
}
