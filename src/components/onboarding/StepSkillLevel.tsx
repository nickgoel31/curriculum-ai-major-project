'use client';

import { useOnboardingStore, ExperienceLevel } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { SkillSelector } from './SkillSelector';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const LEVELS = [
  {
    value: 'BEGINNER',
    label: 'Beginner',
    description: 'Just starting out, little to no experience'
  },
  {
    value: 'INTERMEDIATE',
    label: 'Intermediate',
    description: 'Know the basics, built some projects'
  },
  {
    value: 'ADVANCED',
    label: 'Advanced',
    description: 'Working professional, want to upskill'
  }
];

export function StepSkillLevel() {
  const { 
    targetRole, 
    experienceLevel, 
    setExperienceLevel, 
    currentSkills,
    nextStep, 
    prevStep 
  } = useOnboardingStore();

  const handleNext = () => {
    if (!experienceLevel) return;
    nextStep();
  };

  // Generate dynamic suggested skills based on role
  const getSuggestedSkills = () => {
    const role = targetRole.toLowerCase();
    if (role.includes('data') || role.includes('machine learning')) {
      return ['Python', 'SQL', 'R', 'Excel', 'Pandas', 'NumPy', 'Machine Learning basics', 'Tableau', 'PowerBI'];
    }
    if (role.includes('front') || role.includes('ui') || role.includes('designer')) {
      return ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Figma', 'Tailwind', 'Next.js', 'Vue'];
    }
    if (role.includes('back') || role.includes('devops') || role.includes('cloud')) {
      return ['Node.js', 'Python', 'Java', 'Go', 'Docker', 'AWS', 'SQL', 'Linux', 'Git'];
    }
    // Default fallback
    return ['JavaScript', 'Python', 'HTML/CSS', 'SQL', 'Git', 'React', 'Node.js', 'Excel'];
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Assess your current skills</h2>
        <p className="text-slate-400 mt-2">This helps us calibrate the difficulty of your learning path.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-slate-200">Experience Level</Label>
          <RadioGroup 
            value={experienceLevel} 
            onValueChange={(val) => setExperienceLevel(val as ExperienceLevel)}
            className="grid gap-4 sm:grid-cols-3"
          >
            {LEVELS.map((level) => (
              <div key={level.value} className="relative">
                <RadioGroupItem
                  value={level.value}
                  id={level.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={level.value}
                  className={cn(
                    "flex flex-col items-start p-4 rounded-xl border-2 cursor-pointer transition-all",
                    experienceLevel === level.value
                      ? "bg-indigo-600/10 border-indigo-500"
                      : "bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700"
                  )}
                >
                  <span className={cn(
                    "font-bold text-lg",
                    experienceLevel === level.value ? "text-indigo-400" : "text-slate-200"
                  )}>
                    {level.label}
                  </span>
                  <span className="text-sm text-slate-400 mt-1 font-normal leading-snug">
                    {level.description}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-end">
            <Label className="text-lg font-semibold text-slate-200">Current Skills</Label>
          </div>
          <p className="text-sm text-slate-400 mb-2">Select the tools and technologies you already know.</p>
          
          <SkillSelector suggestedSkills={getSuggestedSkills()} />
        </div>

        <div className="flex justify-between pt-6 border-t border-slate-800">
          <Button 
            onClick={prevStep} 
            variant="outline"
            className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 px-6 h-12 text-lg rounded-xl"
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!experienceLevel || currentSkills.length === 0}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 h-12 text-lg rounded-xl"
          >
            Next <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
