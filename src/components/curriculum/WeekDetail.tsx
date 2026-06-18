'use client';

import { useCurriculumStore } from '@/store/curriculumStore';
import { ResourceCard } from './ResourceCard';
import { TaskCard } from './TaskCard';
import { MarkCompleteButton } from './MarkCompleteButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Library, CheckSquare } from 'lucide-react';
import { ResourceType } from '@/types/database.types';

export function WeekDetail() {
  const { curriculumData, selectedWeekId } = useCurriculumStore();

  if (!curriculumData || !selectedWeekId) return null;

  const week = curriculumData.weeks.find(w => w.id === selectedWeekId);
  if (!week) return null;

  const filterResources = (type?: ResourceType) => {
    if (!type) return week.resources;
    return week.resources.filter(r => r.type === type);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      {/* Week Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-indigo-500">Week {week.weekNumber}:</span>
            {week.theme}
          </h2>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5">
          <h3 className="text-indigo-400 font-semibold mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" /> Weekly Objectives
          </h3>
          <ul className="space-y-2">
            {week.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-indigo-500 font-bold mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Resources Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
          <Library className="h-5 w-5 text-violet-400" /> Learning Resources
        </h3>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-slate-900/50 border border-slate-800 flex flex-wrap h-auto p-1 mb-4">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-800 text-xs sm:text-sm">All</TabsTrigger>
            <TabsTrigger value="VIDEO" className="data-[state=active]:bg-slate-800 text-xs sm:text-sm">Videos</TabsTrigger>
            <TabsTrigger value="ARTICLE" className="data-[state=active]:bg-slate-800 text-xs sm:text-sm">Articles</TabsTrigger>
            <TabsTrigger value="COURSE" className="data-[state=active]:bg-slate-800 text-xs sm:text-sm">Courses</TabsTrigger>
            <TabsTrigger value="PROJECT" className="data-[state=active]:bg-slate-800 text-xs sm:text-sm">Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
            {filterResources().map(r => <ResourceCard key={r.id} resource={r} />)}
          </TabsContent>
          <TabsContent value="VIDEO" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
            {filterResources('VIDEO').map(r => <ResourceCard key={r.id} resource={r} />)}
            {filterResources('VIDEO').length === 0 && <p className="text-slate-500 p-4">No video resources for this week.</p>}
          </TabsContent>
          <TabsContent value="ARTICLE" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
            {filterResources('ARTICLE').map(r => <ResourceCard key={r.id} resource={r} />)}
            {filterResources('ARTICLE').length === 0 && <p className="text-slate-500 p-4">No article resources for this week.</p>}
          </TabsContent>
          <TabsContent value="COURSE" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
            {filterResources('COURSE').map(r => <ResourceCard key={r.id} resource={r} />)}
            {filterResources('COURSE').length === 0 && <p className="text-slate-500 p-4">No course resources for this week.</p>}
          </TabsContent>
          <TabsContent value="PROJECT" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
            {filterResources('PROJECT').map(r => <ResourceCard key={r.id} resource={r} />)}
            {filterResources('PROJECT').length === 0 && <p className="text-slate-500 p-4">No project resources for this week.</p>}
          </TabsContent>
        </Tabs>
      </div>

      {/* Tasks Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
          <CheckSquare className="h-5 w-5 text-emerald-400" /> Action Items & Tasks
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {week.tasks.map(t => (
            <TaskCard key={t.id} task={t} />
          ))}
          {week.tasks.length === 0 && (
            <p className="text-slate-500 italic p-4 text-center border border-slate-800 border-dashed rounded-xl">
              No tasks assigned for this week.
            </p>
          )}
        </div>
      </div>

      {/* Week Footer */}
      <div className="pt-8 pb-12">
        <MarkCompleteButton weekId={week.id} />
      </div>
    </div>
  );
}
