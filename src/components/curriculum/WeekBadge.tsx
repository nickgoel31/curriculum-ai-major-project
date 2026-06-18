import { Badge } from '@/components/ui/badge';
import { ResourceType, TaskType } from '@/types/database.types';
import { cn } from '@/lib/utils';
import { Video, FileText, BookOpen, Code, Wrench, PenTool, Brain, BookMarked } from 'lucide-react';

interface WeekBadgeProps {
  type: ResourceType | TaskType;
  className?: string;
}

export function WeekBadge({ type, className }: WeekBadgeProps) {
  let colorClass = '';
  let Icon = BookOpen;
  let label = type as string;

  switch (type) {
    // Resource Types
    case 'VIDEO':
      colorClass = 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20';
      Icon = Video;
      label = 'Video';
      break;
    case 'ARTICLE':
      colorClass = 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20';
      Icon = FileText;
      label = 'Article';
      break;
    case 'COURSE':
      colorClass = 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/20';
      Icon = BookOpen;
      label = 'Course';
      break;
    case 'PROJECT':
      colorClass = 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20';
      Icon = Code;
      label = 'Project';
      break;
    case 'TOOL':
      colorClass = 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border-orange-500/20';
      Icon = Wrench;
      label = 'Tool';
      break;
      
    // Task Types
    case 'PRACTICE':
      colorClass = 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border-indigo-500/20';
      Icon = PenTool;
      label = 'Practice';
      break;
    case 'QUIZ':
      colorClass = 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/20';
      Icon = Brain;
      label = 'Quiz';
      break;
    case 'READING':
      colorClass = 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20';
      Icon = BookMarked;
      label = 'Reading';
      break;
  }

  return (
    <Badge variant="outline" className={cn("px-2 py-0.5 rounded-md text-xs font-medium uppercase tracking-wider flex items-center gap-1 border", colorClass, className)}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}
