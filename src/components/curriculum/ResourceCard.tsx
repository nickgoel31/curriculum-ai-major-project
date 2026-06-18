import { Resource } from '@/types/database.types';
import { WeekBadge } from './WeekBadge';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:bg-slate-800/50 transition-colors flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <WeekBadge type={resource.type} />
        {resource.isFree ? (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">FREE</Badge>
        ) : (
          <Badge variant="outline" className="bg-slate-800 text-slate-400 border-slate-700 text-[10px]">PAID</Badge>
        )}
      </div>
      
      <h4 className="font-semibold text-slate-200 text-lg mb-2 line-clamp-2">{resource.title}</h4>
      
      <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-grow">
        {resource.description || 'Learn fundamental concepts through this curated resource.'}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
          <span className="capitalize">{resource.platform}</span>
          {resource.durationMinutes && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {resource.durationMinutes}m
              </span>
            </>
          )}
        </div>
        
        <Button asChild variant="ghost" size="sm" className="h-8 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 -mr-2">
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Open <ExternalLink className="ml-1.5 h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  );
}
