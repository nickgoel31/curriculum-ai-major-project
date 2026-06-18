import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ExploreRoles() {
  const roles = [
    { name: 'Full Stack Developer', emoji: '💻', weeks: 12, color: 'from-blue-500/20 to-indigo-500/5', border: 'border-blue-500/20' },
    { name: 'Data Scientist', emoji: '🔬', weeks: 16, color: 'from-emerald-500/20 to-teal-500/5', border: 'border-emerald-500/20' },
    { name: 'UI/UX Designer', emoji: '✨', weeks: 8, color: 'from-pink-500/20 to-rose-500/5', border: 'border-pink-500/20' },
    { name: 'DevOps Engineer', emoji: '🚀', weeks: 10, color: 'from-orange-500/20 to-amber-500/5', border: 'border-orange-500/20' },
    { name: 'ML Engineer', emoji: '🤖', weeks: 14, color: 'from-purple-500/20 to-violet-500/5', border: 'border-purple-500/20' },
    { name: 'Mobile Developer', emoji: '📱', weeks: 12, color: 'from-cyan-500/20 to-blue-500/5', border: 'border-cyan-500/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
          <Compass className="h-5 w-5 text-indigo-400" /> Explore Learning Paths
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div 
            key={role.name}
            className={`bg-gradient-to-br ${role.color} bg-slate-900/50 border ${role.border} rounded-2xl p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300`}
          >
            <div className="text-4xl mb-4">{role.emoji}</div>
            <h4 className="text-lg font-bold text-white mb-2">{role.name}</h4>
            <p className="text-sm text-slate-400 mb-6 flex-1">
              ~{role.weeks} weeks to job-ready
            </p>
            <Button asChild variant="outline" className="w-full bg-slate-950/50 border-slate-700 hover:bg-slate-800 text-white group">
              <Link href={`/onboarding?role=${encodeURIComponent(role.name)}`}>
                Start This Path <ArrowRight className="ml-2 h-4 w-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
