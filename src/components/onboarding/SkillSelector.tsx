'use client';

import { useState } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillSelectorProps {
  suggestedSkills: string[];
}

export function SkillSelector({ suggestedSkills }: SkillSelectorProps) {
  const { currentSkills, toggleSkill } = useOnboardingStore();
  const [customSkill, setCustomSkill] = useState('');

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkill.trim()) return;
    if (currentSkills.length >= 12) return;
    if (!currentSkills.includes(customSkill.trim())) {
      toggleSkill(customSkill.trim());
    }
    setCustomSkill('');
  };

  const allVisibleSkills = Array.from(new Set([...suggestedSkills, ...currentSkills]));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {allVisibleSkills.map(skill => {
          const isSelected = currentSkills.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                isSelected 
                  ? "bg-indigo-600 border-indigo-500 text-white" 
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-slate-100"
              )}
            >
              {skill}
              {isSelected && <X className="h-3 w-3 opacity-70" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">Selected: {currentSkills.length}/12 max</p>
      </div>

      <form onSubmit={handleAddCustom} className="flex gap-2">
        <Input 
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          placeholder="Add custom skill..."
          className="bg-slate-900/50 border-slate-700 text-white"
          disabled={currentSkills.length >= 12}
        />
        <Button 
          type="submit" 
          variant="outline" 
          className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
          disabled={!customSkill.trim() || currentSkills.length >= 12}
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </form>
    </div>
  );
}
