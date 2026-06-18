import { RoleData } from '@/lib/roles-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, CheckCircle2, ArrowRight } from 'lucide-react';

interface CurriculumPreviewModalProps {
  role: RoleData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CurriculumPreviewModal({ role, isOpen, onClose }: CurriculumPreviewModalProps) {
  if (!role) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-slate-200 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{role.emoji}</span>
            <div>
              <DialogTitle className="text-2xl text-white">Sample Curriculum: {role.name}</DialogTitle>
              <p className="text-slate-400 text-sm mt-1">First 3 weeks of the suggested {role.suggestedWeeks}-week path</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {role.sampleCurriculum.map((week) => (
            <div key={week.week} className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3 border-b border-slate-800 pb-3">
                <span className="bg-indigo-500/10 text-indigo-400 font-bold px-2.5 py-1 rounded-md text-sm border border-indigo-500/20">
                  Week {week.week}
                </span>
                <h4 className="text-lg font-bold text-white">{week.theme}</h4>
              </div>
              
              <div className="space-y-2 pl-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Target className="h-3.5 w-3.5" /> Learning Objectives
                </p>
                <ul className="space-y-2">
                  {week.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500/70 shrink-0 mt-0.5" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-800/50 text-xs text-slate-500 italic text-center">
                + Curated resources and interactive tasks will be generated here.
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-800">
          <p className="text-sm text-slate-400">
            Want to see the remaining {role.suggestedWeeks - 3} weeks?
          </p>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white w-full sm:w-auto">
            <Link href={`/onboarding?role=${encodeURIComponent(role.name)}`}>
              Generate Full Path <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
