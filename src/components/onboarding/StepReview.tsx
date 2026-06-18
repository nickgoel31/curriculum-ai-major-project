'use client';

import { useOnboardingStore } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Pencil, Sparkles } from 'lucide-react';
import { useGenerateCurriculum } from '@/hooks/useGenerateCurriculum';
import { GeneratingLoader } from '@/components/curriculum/GeneratingLoader';

export function StepReview() {
  const { 
    targetRole, 
    experienceLevel, 
    currentSkills, 
    availableHoursPerWeek, 
    targetTimeline, 
    preferredLanguage,
    setStep,
    prevStep 
  } = useOnboardingStore();

  const { generate, isLoading } = useGenerateCurriculum();

  const handleGenerate = async () => {
    // 1. Save profile to DB
    const profileRes = await fetch('/api/auth/save-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetRole,
        experienceLevel,
        currentSkills,
        availableHoursPerWeek,
        preferredLanguage,
        targetTimeline,
      }),
    });

    if (!profileRes.ok) {
      console.error('Failed to save profile');
      // Still proceed with generation even if profile save fails? Better to proceed.
    }

    // 2. Trigger curriculum generation via hook
    await generate({
      targetRole,
      experienceLevel,
      currentSkills,
      availableHoursPerWeek,
      totalWeeks: targetTimeline,
      preferredLanguage
    });
  };

  if (isLoading) {
    return <GeneratingLoader targetRole={targetRole} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Review Your Path</h2>
        <p className="text-slate-400 mt-2">Make sure everything looks good before we generate your curriculum.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-6">
          {/* Role Summary */}
          <div className="flex justify-between items-start pb-6 border-b border-slate-800">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Target Role</p>
              <p className="text-xl font-bold text-white">{targetRole}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="text-slate-400 hover:text-white">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          {/* Skills Summary */}
          <div className="flex justify-between items-start pb-6 border-b border-slate-800">
            <div className="w-full pr-4">
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Skills & Experience</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md">
                  {experienceLevel}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentSkills.map(skill => (
                  <span key={skill} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setStep(2)} className="text-slate-400 hover:text-white">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          {/* Time Summary */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Commitment & Preferences</p>
              <div className="space-y-1">
                <p className="text-slate-200"><span className="text-slate-400 mr-2">Hours:</span> {availableHoursPerWeek} hrs/week</p>
                <p className="text-slate-200"><span className="text-slate-400 mr-2">Timeline:</span> {targetTimeline} weeks</p>
                <p className="text-slate-200"><span className="text-slate-400 mr-2">Language:</span> {preferredLanguage}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setStep(3)} className="text-slate-400 hover:text-white">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-4">
          <Button 
            onClick={handleGenerate} 
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-12 h-14 text-lg font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="mr-2 h-5 w-5" /> Generate My Learning Path
          </Button>
          <p className="text-sm text-slate-500 font-medium">
            Takes about 15 seconds • Powered by Claude AI
          </p>
        </div>

        <div className="flex justify-start pt-6 border-t border-slate-800">
          <Button 
            onClick={prevStep} 
            variant="outline"
            className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 px-6 h-12 text-lg rounded-xl"
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> Back
          </Button>
        </div>
      </div>
    </div>
  );
}
