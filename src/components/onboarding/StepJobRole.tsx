'use client';

import { useState } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROLES = [
  { name: 'Full Stack Developer', icon: '💻' },
  { name: 'Frontend Developer', icon: '🎨' },
  { name: 'Backend Developer', icon: '⚙️' },
  { name: 'Data Scientist', icon: '🔬' },
  { name: 'Data Analyst', icon: '📊' },
  { name: 'Machine Learning Engineer', icon: '🤖' },
  { name: 'DevOps Engineer', icon: '🚀' },
  { name: 'UI/UX Designer', icon: '✨' },
  { name: 'Product Manager', icon: '📋' },
  { name: 'Cybersecurity Analyst', icon: '🛡️' },
  { name: 'Mobile Developer', icon: '📱' },
  { name: 'Cloud Engineer', icon: '☁️' },
  { name: 'Business Analyst', icon: '📈' },
  { name: 'Digital Marketer', icon: '📱' },
];

export function StepJobRole() {
  const { targetRole, setTargetRole, nextStep } = useOnboardingStore();
  const [search, setSearch] = useState('');
  const [customRole, setCustomRole] = useState('');

  const filteredRoles = ROLES.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (role: string) => {
    setTargetRole(role);
  };

  const handleNext = () => {
    if (!targetRole) return;
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">What's your target job role?</h2>
        <p className="text-slate-400 mt-2">We'll tailor your curriculum to match the industry requirements for this role.</p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles..."
            className="pl-10 h-12 bg-slate-900/50 border-slate-700 text-white text-lg focus-visible:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {filteredRoles.map((role) => (
            <button
              key={role.name}
              onClick={() => handleSelect(role.name)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                targetRole === role.name 
                  ? "bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500" 
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
              )}
            >
              <span className="text-2xl">{role.icon}</span>
              <span className="font-medium text-slate-200">{role.name}</span>
            </button>
          ))}
          {filteredRoles.length === 0 && search.length > 0 && (
            <div className="col-span-full">
              <button
                onClick={() => handleSelect(search)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border w-full text-left transition-all",
                  targetRole === search
                    ? "bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500" 
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                )}
              >
                <span className="text-2xl">🎯</span>
                <span className="font-medium text-slate-200">Custom Role: "{search}"</span>
              </button>
            </div>
          )}
        </div>

        {targetRole && (
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-medium">
              Selected: {targetRole}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-6 border-t border-slate-800">
          <Button 
            onClick={handleNext} 
            disabled={!targetRole}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 h-12 text-lg rounded-xl"
          >
            Next <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
