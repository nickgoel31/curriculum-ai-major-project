import { create } from 'zustand';

export type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type PreferredLanguage = 'ENGLISH' | 'HINDI' | 'HINGLISH';
export type CurriculumLength = 4 | 8 | 12 | 16;

export interface OnboardingState {
  // Step 1
  targetRole: string;
  // Step 2
  experienceLevel: ExperienceLevel | null;
  currentSkills: string[];
  // Step 3
  availableHoursPerWeek: number;
  totalWeeks: CurriculumLength;
  targetTimeline: number; // For backward compatibility
  preferredLanguage: PreferredLanguage;
  // Meta
  currentStep: 1 | 2 | 3 | 4;
  isSubmitting: boolean;
  // Actions
  setTargetRole: (role: string) => void;
  setExperienceLevel: (level: ExperienceLevel) => void;
  toggleSkill: (skill: string) => void;
  setAvailableHours: (hours: number) => void;
  setTotalWeeks: (weeks: CurriculumLength) => void;
  setTargetTimeline: (weeks: number) => void; // For backward compatibility
  setPreferredLanguage: (lang: PreferredLanguage) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  setIsSubmitting: (val: boolean) => void;
  reset: () => void;
}

const initialState = {
  targetRole: '',
  experienceLevel: null as ExperienceLevel | null,
  currentSkills: [] as string[],
  availableHoursPerWeek: 10,
  totalWeeks: 8 as CurriculumLength,
  targetTimeline: 8,
  preferredLanguage: 'ENGLISH' as PreferredLanguage,
  currentStep: 1 as 1 | 2 | 3 | 4,
  isSubmitting: false,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setTargetRole: (role) => set({ targetRole: role }),
  setExperienceLevel: (level) => set({ experienceLevel: level }),
  toggleSkill: (skill) =>
    set((state) => ({
      currentSkills: state.currentSkills.includes(skill)
        ? state.currentSkills.filter((s) => s !== skill)
        : [...state.currentSkills, skill],
    })),
  setAvailableHours: (hours) => set({ availableHoursPerWeek: hours }),
  setTotalWeeks: (weeks) => set({ totalWeeks: weeks, targetTimeline: weeks }),
  setTargetTimeline: (weeks) => set({ targetTimeline: weeks, totalWeeks: weeks as CurriculumLength }),
  setPreferredLanguage: (lang) => set({ preferredLanguage: lang }),
  nextStep: () => set((state) => ({ currentStep: Math.min(4, state.currentStep + 1) as 1|2|3|4 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) as 1|2|3|4 })),
  setStep: (step) => set({ currentStep: step }),
  setIsSubmitting: (val) => set({ isSubmitting: val }),
  reset: () => set(initialState),
}));
