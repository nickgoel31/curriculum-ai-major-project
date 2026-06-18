'use client';

import { useOnboardingStore } from '@/store/onboardingStore';
import { StepJobRole } from './StepJobRole';
import { StepSkillLevel } from './StepSkillLevel';
import { StepTimeCommitment } from './StepTimeCommitment';
import { StepReview } from './StepReview';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OnboardingShell() {
  const { currentStep } = useOnboardingStore();

  const steps = [
    { num: 1, label: 'Role' },
    { num: 2, label: 'Skills' },
    { num: 3, label: 'Time' },
    { num: 4, label: 'Review' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Progress Indicator */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-slate-800 rounded-full"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-indigo-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const isActive = currentStep === step.num;
              const isCompleted = currentStep > step.num;
              
              return (
                <div key={step.num} className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ring-4 ring-slate-950 z-10",
                      isActive ? "bg-indigo-600 text-white" : 
                      isCompleted ? "bg-indigo-500 text-white" : 
                      "bg-slate-800 text-slate-400"
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : step.num}
                  </div>
                  <span className={cn(
                    "mt-3 text-xs sm:text-sm font-medium transition-colors duration-300 absolute -bottom-8",
                    isActive ? "text-indigo-400" : 
                    isCompleted ? "text-slate-300" : 
                    "text-slate-500"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="relative max-w-4xl mx-auto">
        {currentStep === 1 && <StepJobRole />}
        {currentStep === 2 && <StepSkillLevel />}
        {currentStep === 3 && <StepTimeCommitment />}
        {currentStep === 4 && <StepReview />}
      </div>
    </div>
  );
}
