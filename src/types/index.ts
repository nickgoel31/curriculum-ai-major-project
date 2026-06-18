export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface StudentProfile {
  user_id: string;
  current_skills: string[];
  target_role: string;
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  available_hours_per_week: number;
  preferred_language: 'english' | 'hindi' | 'hinglish';
  created_at: string;
}

export interface Curriculum {
  id: string;
  user_id: string;
  title: string;
  target_role: string;
  total_weeks: number;
  status: 'active' | 'completed' | 'paused';
  created_at: string;
  updated_at: string;
}

export interface Week {
  id: string;
  curriculum_id: string;
  week_number: number;
  theme: string;
  objectives: string[];
  resources: Resource[];
  tasks: Task[];
  is_completed: boolean;
}

export interface Resource {
  id: string;
  week_id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'project' | 'tool';
  url: string;
  platform: string;
  duration_minutes: number;
  is_free: boolean;
}

export interface Task {
  id: string;
  week_id: string;
  title: string;
  description: string;
  type: 'practice' | 'project' | 'quiz' | 'reading';
  is_completed: boolean;
}

export interface ProgressEntry {
  id: string;
  user_id: string;
  curriculum_id: string;
  week_id: string;
  completed_at: string;
  notes: string | null;
}

// Re-export DB types for convenience
export type { ExperienceLevel, PreferredLanguage, CurriculumStatus, ResourceType, TaskType } from '@prisma/client';
