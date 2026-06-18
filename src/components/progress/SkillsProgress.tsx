import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";

interface SkillsProgressProps {
  skills: { name: string; progress: number }[];
}

export function SkillsProgress({ skills }: SkillsProgressProps) {
  if (skills.length === 0) return null;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
        <Brain className="h-5 w-5 text-indigo-400" /> Skills Being Built
      </h3>
      
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-slate-300">{skill.name}</span>
              <span className="text-xs text-slate-500">{skill.progress}% complete</span>
            </div>
            <Progress value={skill.progress} className="h-2 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-indigo-600 [&>div]:to-violet-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
