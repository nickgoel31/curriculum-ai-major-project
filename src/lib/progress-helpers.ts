import { Curriculum, Week, Task, Resource } from '@/types/database.types';

export type FullCurriculum = Curriculum & {
  weeks: (Week & {
    tasks: Task[];
    resources: Resource[];
  })[];
};

export interface BadgeStatus {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

// Calculate streak based on task completion dates
export function calculateStreak(curricula: FullCurriculum[]) {
  // Extract all task completion dates
  const completionDates = curricula.flatMap(c => 
    c.weeks.flatMap(w => 
      w.tasks.filter(t => t.isCompleted && t.completedAt).map(t => new Date(t.completedAt as Date).toISOString().split('T')[0])
    )
  );

  // Add week completion dates as well
  const weekDates = curricula.flatMap(c => 
    c.weeks.filter(w => w.isCompleted && w.completedAt).map(w => new Date(w.completedAt as Date).toISOString().split('T')[0])
  );

  const allDates = [...new Set([...completionDates, ...weekDates])].sort((a, b) => b.localeCompare(a)); // Descending unique dates

  if (allDates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // If no activity today or yesterday, streak is broken
  if (!allDates.includes(today) && !allDates.includes(yesterday)) {
    currentStreak = 0;
  } else {
    // Calculate current continuous streak starting from the most recent day backwards
    let checkDate = new Date(allDates.includes(today) ? today : yesterday);
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (allDates.includes(dateStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate longest streak (naive approach for a sorted list)
  let prevDate: Date | null = null;
  tempStreak = 0;
  
  // Sort ascending for longest streak calculation
  const ascDates = [...allDates].sort();
  for (const dateStr of ascDates) {
    const d = new Date(dateStr);
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diffDays = Math.floor((d.getTime() - prevDate.getTime()) / 86400000);
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    prevDate = d;
  }
  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { currentStreak, longestStreak, activityDates: allDates };
}

// Check Badge Eligibility
export function calculateBadges(curricula: FullCurriculum[], currentStreak: number): BadgeStatus[] {
  const allWeeks = curricula.flatMap(c => c.weeks);
  const allTasks = allWeeks.flatMap(w => w.tasks);
  
  const completedWeeksCount = allWeeks.filter(w => w.isCompleted).length;
  const isFirstStepEarned = completedWeeksCount >= 1;
  const isHalfwayThereEarned = curricula.some(c => (c.weeks.filter(w => w.isCompleted).length / Math.max(1, c.totalWeeks)) >= 0.5);
  const isChampionEarned = curricula.some(c => c.status === 'COMPLETED');
  const isOnFireEarned = currentStreak >= 7;
  
  // Mock resource opened logic (we don't track opened resources right now, so we proxy it via task completion)
  const isResourceHunterEarned = allTasks.filter(t => t.isCompleted).length >= 10; 
  
  // Speed Learner - hard to calculate without granular timestamps, mocking it as earned if they completed week 1 very fast or just randomly for demo
  const isSpeedLearnerEarned = completedWeeksCount >= 2;

  return [
    { id: 'first_step', name: 'First Step', description: 'Completed Week 1', icon: '🚀', earned: isFirstStepEarned },
    { id: 'on_fire', name: 'On Fire', description: '7-day learning streak', icon: '🔥', earned: isOnFireEarned },
    { id: 'resource_hunter', name: 'Resource Hunter', description: 'Explored numerous resources', icon: '📚', earned: isResourceHunterEarned },
    { id: 'speed_learner', name: 'Speed Learner', description: 'Completed a week ahead of schedule', icon: '⚡', earned: isSpeedLearnerEarned },
    { id: 'halfway_there', name: 'Halfway There', description: 'Reached 50% curriculum completion', icon: '🎯', earned: isHalfwayThereEarned },
    { id: 'champion', name: 'Curriculum Champion', description: 'Completed a full learning path', icon: '🏆', earned: isChampionEarned },
  ];
}

export function getSkillsProgress(curriculum: FullCurriculum) {
  // Extract pseudo-skills based on week themes.
  const skills = curriculum.weeks.slice(0, 6).map(w => {
    // Attempt to extract a keyword
    const keyword = w.theme.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    const completed = w.isCompleted;
    const progress = completed ? 100 : (w.tasks.filter(t => t.isCompleted).length / Math.max(1, w.tasks.length)) * 100;
    
    return {
      name: keyword.length > 2 ? keyword : w.theme,
      progress: Math.round(progress)
    };
  });
  
  return skills.filter(s => s.name && s.name.length > 2);
}
