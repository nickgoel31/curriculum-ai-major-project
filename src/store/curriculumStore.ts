import { create } from 'zustand';
import { Curriculum, Week, Resource, Task } from '@/types/database.types';

export type FullCurriculum = Curriculum & {
  weeks: (Week & {
    resources: Resource[];
    tasks: Task[];
  })[];
};

interface CurriculumState {
  curriculumData: FullCurriculum | null;
  selectedWeekId: string | null;
  completedTaskIds: Set<string>;
  completedWeekIds: Set<string>;
  
  // Actions
  setCurriculumData: (data: FullCurriculum) => void;
  setSelectedWeekId: (id: string) => void;
  toggleTaskComplete: (taskId: string, completed: boolean) => void;
  markWeekComplete: (weekId: string) => void;
}

export const useCurriculumStore = create<CurriculumState>((set) => ({
  curriculumData: null,
  selectedWeekId: null,
  completedTaskIds: new Set(),
  completedWeekIds: new Set(),

  setCurriculumData: (data) => {
    // Initialize completed sets from data
    const completedTasks = new Set<string>();
    const completedWeeks = new Set<string>();
    
    data.weeks.forEach(week => {
      if (week.isCompleted) completedWeeks.add(week.id);
      week.tasks.forEach(task => {
        if (task.isCompleted) completedTasks.add(task.id);
      });
    });

    set({ 
      curriculumData: data, 
      completedTaskIds: completedTasks,
      completedWeekIds: completedWeeks,
      selectedWeekId: data.weeks.find(w => !w.isCompleted)?.id || data.weeks[0]?.id || null
    });
  },

  setSelectedWeekId: (id) => set({ selectedWeekId: id }),

  toggleTaskComplete: (taskId, completed) => set((state) => {
    const newSet = new Set(state.completedTaskIds);
    if (completed) {
      newSet.add(taskId);
    } else {
      newSet.delete(taskId);
    }
    return { completedTaskIds: newSet };
  }),

  markWeekComplete: (weekId) => set((state) => {
    const newSet = new Set(state.completedWeekIds);
    newSet.add(weekId);
    return { completedWeekIds: newSet };
  }),
}));
