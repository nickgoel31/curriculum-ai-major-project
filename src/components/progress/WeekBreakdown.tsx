import { FullCurriculum } from '@/lib/progress-helpers';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface WeekBreakdownProps {
  curriculum: FullCurriculum | null;
}

export function WeekBreakdown({ curriculum }: WeekBreakdownProps) {
  if (!curriculum) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
        <p className="text-slate-400">No active curriculum found.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-6">Week-by-Week Breakdown</h3>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {curriculum.weeks.map((week) => {
          const completedTasks = week.tasks.filter(t => t.isCompleted).length;
          const totalTasks = week.tasks.length;
          const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : (week.isCompleted ? 100 : 0);
          
          return (
            <AccordionItem key={week.id} value={week.id} className="border border-slate-800 rounded-xl bg-slate-950/50 px-4 data-[state=open]:bg-slate-900/80 transition-colors">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full pr-4 gap-4">
                  <div className="flex items-center gap-3 text-left">
                    {week.isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-600 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-300">Week {week.weekNumber}: {week.theme}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        {week.completedAt ? (
                          <span className="flex items-center gap-1 text-emerald-500/80">
                            <Calendar className="h-3 w-3" />
                            Completed {format(new Date(week.completedAt), 'MMM d, yyyy')}
                          </span>
                        ) : week.weekNumber === curriculum.currentWeek ? (
                          <span className="text-indigo-400">In Progress</span>
                        ) : (
                          <span>Not Started</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 sm:w-1/3">
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Tasks</span>
                        <span>{completedTasks}/{totalTasks}</span>
                      </div>
                      <Progress value={taskProgress} className="h-1.5 bg-slate-800 [&>div]:bg-indigo-500" />
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 text-slate-300">
                <div className="space-y-4 pl-8 border-t border-slate-800 pt-4 mt-2">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tasks</h4>
                    <ul className="space-y-2">
                      {week.tasks.map(task => (
                        <li key={task.id} className="flex items-start gap-2 text-sm">
                          {task.isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                          )}
                          <span className={cn(task.isCompleted ? "text-slate-400 line-through" : "text-slate-300")}>
                            {task.title}
                          </span>
                        </li>
                      ))}
                      {week.tasks.length === 0 && <li className="text-sm text-slate-500 italic">No tasks assigned.</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Resources Available</h4>
                    <ul className="space-y-2 text-sm list-disc pl-5 text-slate-400">
                      {week.resources.map(res => (
                        <li key={res.id}>{res.title} <span className="text-slate-600 text-xs">({res.type})</span></li>
                      ))}
                      {week.resources.length === 0 && <li className="text-slate-500 italic list-none -ml-5">No resources available.</li>}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
