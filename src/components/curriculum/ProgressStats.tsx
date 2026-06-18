'use client';

import { useState, useEffect } from 'react';
import { useCurriculumStore } from '@/store/curriculumStore';
import { Target, CheckCircle2, BookOpen, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function ProgressStats() {
  const { curriculumData, completedTaskIds, completedWeekIds } = useCurriculumStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!curriculumData) return null;

  // Calculate stats
  const totalWeeks = curriculumData.totalWeeks;
  const weeksCompleted = completedWeekIds.size;
  
  const totalTasks = curriculumData.weeks.reduce((acc, week) => acc + week.tasks.length, 0);
  const tasksDone = completedTaskIds.size;

  const totalResources = curriculumData.weeks.reduce((acc, week) => acc + week.resources.length, 0);
  // Approximation of resources explored (assuming they explore resources if they complete tasks)
  const resourcesExplored = Math.floor((tasksDone / Math.max(1, totalTasks)) * totalResources);

  const stats = [
    { label: 'Weeks Completed', value: `${weeksCompleted}/${totalWeeks}`, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Tasks Done', value: `${tasksDone}/${totalTasks}`, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Resources Explored', value: resourcesExplored.toString(), icon: BookOpen, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { label: 'Current Streak', value: '3 Days', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' }, // Hardcoded streak for now
  ];

  // Mock data for the activity chart based on completion
  const chartData = curriculumData.weeks.map(w => ({
    name: `W${w.weekNumber}`,
    tasks: completedWeekIds.has(w.id) ? w.tasks.length : Math.min(w.tasks.length, Math.floor(Math.random() * w.tasks.length)),
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-200">Your Progress</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Task Completion Activity</h4>
        <div className="h-48 w-full flex items-center justify-center">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }} 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="tasks" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-slate-500 animate-pulse">Loading chart...</div>
          )}
        </div>
      </div>
    </div>
  );
}
