'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { useCurriculumStore } from '@/store/curriculumStore';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MarkCompleteButton({ weekId }: { weekId: string }) {
  const { curriculumData, completedTaskIds, completedWeekIds, markWeekComplete, setSelectedWeekId } = useCurriculumStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!curriculumData) return null;

  const week = curriculumData.weeks.find(w => w.id === weekId);
  if (!week) return null;

  // Check if already completed
  if (completedWeekIds.has(weekId)) {
    return (
      <div className="flex items-center justify-center p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
        <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
        <span className="text-emerald-400 font-medium">Week {week.weekNumber} Completed</span>
      </div>
    );
  }

  // Check if all tasks are completed
  const allTasksCompleted = week.tasks.length > 0 && week.tasks.every(t => completedTaskIds.has(t.id));

  if (!allTasksCompleted) {
    return (
      <div className="text-center p-6 border border-slate-800 border-dashed rounded-xl">
        <p className="text-sm text-slate-500">Complete all tasks above to mark this week as finished.</p>
      </div>
    );
  }

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/curriculum/${curriculumData.id}/complete-week`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weekId }),
      });

      if (!res.ok) throw new Error('Failed to complete week');

      // Optimistic update
      markWeekComplete(weekId);
      setIsOpen(false);
      
      // Confetti!
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4f46e5', '#10b981', '#8b5cf6']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4f46e5', '#10b981', '#8b5cf6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      toast.success(`Awesome job! You've completed Week ${week.weekNumber}!`);

      // Auto-advance to next week if available
      const nextWeek = curriculumData.weeks.find(w => w.weekNumber === week.weekNumber + 1);
      if (nextWeek) {
        setTimeout(() => {
          setSelectedWeekId(nextWeek.id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
      }

    } catch (error) {
      toast.error('Failed to mark week as complete');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-12 text-lg rounded-xl shadow-lg shadow-emerald-500/20">
          <CheckCircle className="mr-2 h-5 w-5" /> Mark Week as Complete
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Complete Week {week.weekNumber}?</DialogTitle>
          <DialogDescription className="text-slate-400">
            You've finished all tasks for this week. Are you ready to mark it as complete and move forward in your curriculum?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800">
            Cancel
          </Button>
          <Button onClick={handleComplete} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-500 text-white">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
            Yes, I'm Done!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
