'use client';

import { RoleData } from '@/lib/roles-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, IndianRupee, Clock, Code2, TrendingUp, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';

interface RoleCardProps {
  role: RoleData;
  onPreview: (role: RoleData) => void;
}

export function RoleCard({ role, onPreview }: RoleCardProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 rounded-2xl p-6 flex flex-col h-full group hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)]">
      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
          {role.emoji}
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className={`
            ${role.demand === 'High' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
              role.demand === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
              'bg-slate-800 text-slate-400 border-slate-700'}
          `}>
            {role.demand === 'High' && <TrendingUp className="w-3 h-3 mr-1" />}
            {role.demand} Demand
          </Badge>
          <span className="text-xs text-slate-500 font-medium">{role.jobOpenings} Openings</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">{role.name}</h3>
      
      <div className="space-y-3 mb-6 flex-1">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <IndianRupee className="w-4 h-4 text-slate-500" />
          <span>{role.salaryRange} <span className="text-slate-500 text-xs">/ year avg.</span></span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Clock className="w-4 h-4 text-slate-500" />
          <span>~{role.suggestedWeeks} weeks to job-ready</span>
        </div>
        <div className="flex items-start gap-3 text-sm text-slate-300 pt-1">
          <Code2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
          <div className="flex flex-wrap gap-1.5">
            {role.skills.map((skill, i) => (
              <span key={i} className="bg-slate-950 px-2 py-0.5 rounded text-xs border border-slate-800 text-slate-400">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-auto pt-4 border-t border-slate-800/60">
        <Button 
          onClick={() => onPreview(role)} 
          variant="outline" 
          className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <Eye className="w-4 h-4 mr-2" /> Preview
        </Button>
        <Button asChild className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white">
          <Link href={`/onboarding?role=${encodeURIComponent(role.name)}`}>
            Start <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
