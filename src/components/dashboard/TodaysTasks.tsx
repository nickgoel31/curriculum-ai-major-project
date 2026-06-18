'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { WeekBadge } from '../curriculum/WeekBadge';

interface TodaysTasksProps {
  curriculumId: string;
  tasks: any[];
}

export function TodaysTasks({ curriculumId, tasks }: TodaysTasksProps) {
  const [localTasks, setLocalTasks] = useState(tasks.slice(0, 3));

  const handleToggle = async (taskId: string, checked: boolean) => {
    // Optimistic update
    setLocalTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: checked } : t));

    try {
      const res = await fetch(`/api/curriculum/${curriculumId}/complete-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, completed: checked }),
      });

      if (!res.ok) throw new Error('Failed to update task');
    } catch (error) {
      // Revert on error
      setLocalTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !checked } : t));
      toast.error('Failed to save progress. Please try again.');
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
        <p className="text-slate-400">No tasks remaining for this week. Great job!</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-emerald-400" /> This Week's Action Items
        </h3>
        <Link 
          href={`/curriculum/${curriculumId}`}
          className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {localTasks.map((task) => (
          <div key={task.id} className={cn(
            "flex items-start gap-4 p-4 rounded-xl border transition-all",
            task.isCompleted 
              ? "bg-emerald-500/5 border-emerald-500/20 opacity-80" 
              : "bg-slate-950/50 border-slate-800 hover:bg-slate-800/80"
          )}>
            <div className="pt-1">
              <Checkbox 
                id={`dash-task-${task.id}`}
                checked={task.isCompleted}
                onCheckedChange={(c) => handleToggle(task.id, c as boolean)}
                className={cn(
                  "h-5 w-5 rounded border-slate-600",
                  task.isCompleted ? "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" : ""
                )}
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start gap-2">
                <label 
                  htmlFor={`dash-task-${task.id}`}
                  className={cn(
                    "font-medium leading-tight cursor-pointer",
                    task.isCompleted ? "text-slate-400 line-through" : "text-slate-200"
                  )}
                >
                  {task.title}
                </label>
                <WeekBadge type={task.taskType} className={cn("shrink-0", task.isCompleted ? "opacity-50 grayscale" : "")} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
