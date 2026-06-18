'use client';

import { useOnboardingStore, PreferredLanguage } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { value: 'ENGLISH', label: 'English' },
  { value: 'HINGLISH', label: 'Hindi + English (Hinglish)' },
  { value: 'HINDI', label: 'Mostly Hindi' },
];

const TIMELINES = [
  { value: 4, label: '4 weeks' },
  { value: 8, label: '8 weeks' },
  { value: 12, label: '12 weeks' },
  { value: 16, label: '16 weeks' },
];

export function StepTimeCommitment() {
  const { 
    availableHoursPerWeek, 
    setAvailableHours,
    targetTimeline,
    setTargetTimeline,
    preferredLanguage,
    setPreferredLanguage,
    nextStep, 
    prevStep 
  } = useOnboardingStore();

  const getIntensityLabel = (hours: number) => {
    if (hours <= 5) return 'Casual';
    if (hours <= 10) return 'Part-time learner';
    if (hours <= 20) return 'Serious learner';
    return 'Full focus mode';
  };

  const getIntensityColor = (hours: number) => {
    if (hours <= 5) return 'text-emerald-400';
    if (hours <= 10) return 'text-blue-400';
    if (hours <= 20) return 'text-violet-400';
    return 'text-indigo-400';
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Time & Preferences</h2>
        <p className="text-slate-400 mt-2">Let's build a schedule that works for you.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Weekly Hours */}
        <div className="space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-end">
            <Label className="text-lg font-semibold text-slate-200">Weekly Commitment</Label>
            <span className="text-2xl font-bold text-white">{availableHoursPerWeek} <span className="text-slate-400 text-lg font-normal">hours</span></span>
          </div>
          
          <Slider 
            value={[availableHoursPerWeek]} 
            onValueChange={(val) => setAvailableHours(val[0])} 
            max={30} 
            min={2} 
            step={1}
            className="py-4"
          />
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">2h (Min)</span>
            <span className={cn("font-medium", getIntensityColor(availableHoursPerWeek))}>
              {getIntensityLabel(availableHoursPerWeek)}
            </span>
            <span className="text-slate-500">30h (Max)</span>
          </div>
        </div>

        {/* Target Timeline */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-slate-200">Target Timeline</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIMELINES.map((tl) => (
              <button
                key={tl.value}
                onClick={() => setTargetTimeline(tl.value)}
                className={cn(
                  "py-3 px-4 rounded-xl border font-medium transition-all text-center",
                  targetTimeline === tl.value
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500"
                    : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"
                )}
              >
                {tl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Language */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <Label className="text-lg font-semibold text-slate-200">Preferred Language for Resources</Label>
          <RadioGroup 
            value={preferredLanguage} 
            onValueChange={(val) => setPreferredLanguage(val as PreferredLanguage)}
            className="grid gap-3 sm:grid-cols-3"
          >
            {LANGUAGES.map((lang) => (
              <div key={lang.value} className="relative">
                <RadioGroupItem
                  value={lang.value}
                  id={lang.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={lang.value}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all text-center",
                    preferredLanguage === lang.value
                      ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500"
                      : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"
                  )}
                >
                  <span className="font-medium">{lang.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
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
            onClick={nextStep} 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 h-12 text-lg rounded-xl"
          >
            Next <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
