'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ExperienceLevel, PreferredLanguage } from '@prisma/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpdateLearningPrefsProps {
  profile: {
    experienceLevel: ExperienceLevel;
    availableHoursPerWeek: number;
    preferredLanguage: PreferredLanguage;
  };
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: {
    experienceLevel: ExperienceLevel;
    availableHoursPerWeek: number;
    preferredLanguage: PreferredLanguage;
  }) => void;
}

const LEVELS = [
  {
    value: 'BEGINNER',
    label: 'Beginner',
    description: 'Just starting out, little to no experience',
  },
  {
    value: 'INTERMEDIATE',
    label: 'Intermediate',
    description: 'Know the basics, built some projects',
  },
  {
    value: 'ADVANCED',
    label: 'Advanced',
    description: 'Working professional, want to upskill',
  },
];

const LANGUAGES = [
  { value: 'ENGLISH', label: 'English' },
  { value: 'HINGLISH', label: 'Hindi + English (Hinglish)' },
  { value: 'HINDI', label: 'Mostly Hindi' },
];

export function UpdateLearningPrefs({
  profile,
  isOpen,
  onClose,
  onUpdate,
}: UpdateLearningPrefsProps) {
  const [level, setLevel] = useState<ExperienceLevel>(profile.experienceLevel);
  const [hours, setHours] = useState<number>(profile.availableHoursPerWeek);
  const [lang, setLang] = useState<PreferredLanguage>(profile.preferredLanguage);
  const [saving, setSaving] = useState(false);

  const getIntensityLabel = (h: number) => {
    if (h <= 5) return 'Casual';
    if (h <= 10) return 'Part-time learner';
    if (h <= 20) return 'Serious learner';
    return 'Full focus mode';
  };

  const getIntensityColor = (h: number) => {
    if (h <= 5) return 'text-emerald-400';
    if (h <= 10) return 'text-blue-400';
    if (h <= 20) return 'text-violet-400';
    return 'text-indigo-400';
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experienceLevel: level,
          availableHoursPerWeek: hours,
          preferredLanguage: lang,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      const data = await response.json();
      toast.success('Learning profile updated successfully!');
      onUpdate({
        experienceLevel: level,
        availableHoursPerWeek: hours,
        preferredLanguage: lang,
      });
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-white">Update Learning Profile</DialogTitle>
          <DialogDescription className="text-slate-400">
            Adjust your experience level, weekly hour commitment, and preferred learning language.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-6 mt-4">
          {/* Experience Level */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-200">Experience Level</Label>
            <RadioGroup
              value={level}
              onValueChange={(val) => setLevel(val as ExperienceLevel)}
              className="grid gap-3 sm:grid-cols-3"
            >
              {LEVELS.map((l) => (
                <div key={l.value} className="relative">
                  <RadioGroupItem value={l.value} id={`pref-${l.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`pref-${l.value}`}
                    className={cn(
                      'flex flex-col items-start p-3 h-full rounded-xl border cursor-pointer transition-all',
                      level === l.value
                        ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                        : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-300'
                    )}
                  >
                    <span className="font-bold text-sm">{l.label}</span>
                    <span className="text-xs text-slate-400 mt-1 font-normal leading-tight">
                      {l.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Weekly Hours */}
          <div className="space-y-4 bg-slate-800/20 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-end">
              <Label className="text-sm font-semibold text-slate-200">Weekly Commitment</Label>
              <span className="text-xl font-bold text-white">
                {hours} <span className="text-slate-400 text-xs font-normal">hours/week</span>
              </span>
            </div>

            <Slider
              value={[hours]}
              onValueChange={(val) => setHours(val[0])}
              max={30}
              min={2}
              step={1}
              className="py-2"
            />

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">2h</span>
              <span className={cn('font-medium', getIntensityColor(hours))}>
                {getIntensityLabel(hours)}
              </span>
              <span className="text-slate-500">30h</span>
            </div>
          </div>

          {/* Preferred Language */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-200">Preferred Language</Label>
            <RadioGroup
              value={lang}
              onValueChange={(val) => setLang(val as PreferredLanguage)}
              className="grid gap-3 sm:grid-cols-3"
            >
              {LANGUAGES.map((l) => (
                <div key={l.value} className="relative">
                  <RadioGroupItem value={l.value} id={`pref-${l.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`pref-${l.value}`}
                    className={cn(
                      'flex items-center justify-center p-3 h-full rounded-xl border cursor-pointer transition-all text-center',
                      lang === l.value
                        ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                        : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-300'
                    )}
                  >
                    <span className="font-medium text-xs">{l.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter className="pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={saving}
              className="border-slate-800 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Preferences
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
