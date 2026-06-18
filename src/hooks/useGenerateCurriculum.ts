'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toastSuccess, toastError } from '@/lib/toast';
import { useOnboardingStore } from '@/store/onboardingStore';

export function useGenerateCurriculum() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [curriculumId, setCurriculumId] = useState<string | null>(null);
  const {
    targetRole,
    experienceLevel,
    currentSkills,
    availableHoursPerWeek,
    totalWeeks,
    preferredLanguage,
    reset,
  } = useOnboardingStore();

  const generate = async (params?: {
    targetRole?: string;
    experienceLevel?: string | null;
    currentSkills?: string[];
    availableHoursPerWeek?: number;
    totalWeeks?: number;
    preferredLanguage?: string;
  }) => {
    const activeRole = params?.targetRole || targetRole;
    const activeExp = params?.experienceLevel || experienceLevel;
    const activeSkills = params?.currentSkills || currentSkills;
    const activeHours = params?.availableHoursPerWeek || availableHoursPerWeek;
    const activeWeeks = params?.totalWeeks || totalWeeks;
    const activeLang = params?.preferredLanguage || preferredLanguage;

    if (!activeRole || !activeExp) {
      toastError('Missing information', 'Please complete all onboarding steps first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: activeRole,
          experienceLevel: activeExp,
          currentSkills: activeSkills,
          availableHoursPerWeek: activeHours,
          totalWeeks: activeWeeks,
          preferredLanguage: activeLang,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 429) {
          throw new Error(data.error || 'Generation limit reached. Try again tomorrow.');
        }
        throw new Error(data.error || 'Failed to generate curriculum.');
      }

      const data = await response.json();
      setCurriculumId(data.curriculumId);
      toastSuccess('Curriculum generated!', 'Your personalized learning path is ready.');
      reset(); // Clear onboarding store
      router.push(`/curriculum/${data.curriculumId}`);
      return data.curriculumId;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setError(message);
      toastError('Generation failed', message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading, error, curriculumId };
}
