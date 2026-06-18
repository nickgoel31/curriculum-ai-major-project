'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { toast } from 'sonner';
import { BookOpen, Calendar, Trash2, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CurriculumItem {
  id: string;
  title: string;
  targetRole: string;
  totalWeeks: number;
  currentWeek: number;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  generatedAt: string | Date;
  updatedAt: string | Date;
  weeks?: { isCompleted: boolean }[];
}

interface CurriculaListProps {
  initialCurricula: CurriculumItem[];
}

export function CurriculaList({ initialCurricula }: CurriculaListProps) {
  const [curricula, setCurricula] = useState<CurriculumItem[]>(initialCurricula);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const getStatusBadge = (status: CurriculumItem['status']) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge>;
      case 'COMPLETED':
        return <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Completed</Badge>;
      case 'PAUSED':
        return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Paused</Badge>;
      default:
        return null;
    }
  };

  const getProgress = (item: CurriculumItem) => {
    if (item.status === 'COMPLETED') return 100;
    if (!item.weeks || item.weeks.length === 0) return 0;
    const completed = item.weeks.filter((w) => w.isCompleted).length;
    return Math.round((completed / item.totalWeeks) * 100);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/curriculum/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete curriculum');
      }

      setCurricula((prev) => prev.filter((c) => c.id !== deleteId));
      toast.success('Curriculum deleted successfully');
      setDeleteId(null);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Error deleting curriculum');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {curricula.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur text-center p-8">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">No curricula generated yet</CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                Generate your first personalized AI learning path to get started.
              </CardDescription>
            </div>
            <Link href="/onboarding" passHref>
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white mt-2">
                Generate My First Path
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {curricula.map((item) => {
            const progress = getProgress(item);
            return (
              <Card
                key={item.id}
                className="bg-slate-900/40 border-slate-800/80 backdrop-blur hover:border-slate-800 transition-all duration-300"
              >
                <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-white text-base font-semibold md:text-lg">
                        {item.title}
                      </CardTitle>
                      {getStatusBadge(item.status)}
                    </div>
                    <CardDescription className="text-slate-400 text-sm">
                      Target Role: {item.targetRole}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(item.id)}
                    className="text-slate-500 hover:text-red-400 hover:bg-slate-800/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pb-4 space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-400">
                      <span>Course Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-slate-800 [&>div]:bg-indigo-600" />
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t border-slate-800/50 flex flex-wrap justify-between items-center gap-4 py-3">
                  <div className="flex items-center text-xs text-slate-500 gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      Generated {formatDistanceToNow(new Date(item.generatedAt), { addSuffix: true })}
                    </span>
                  </div>
                  <Link href={`/curriculum/${item.id}`} passHref>
                    <Button
                      size="sm"
                      className="bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700"
                    >
                      {item.status === 'COMPLETED' ? (
                        <>
                          <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-indigo-400" /> View Curriculum
                        </>
                      ) : (
                        <>
                          <Play className="mr-1.5 h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" /> Resume
                        </>
                      )}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}

          <div className="pt-4 flex justify-center">
            <Link href="/onboarding" className="w-full">
              <Button
                variant="outline"
                className="w-full border-dashed border-slate-800 hover:border-slate-700 bg-slate-900/20 hover:bg-slate-900/40 text-slate-300 py-6 text-sm"
              >
                <BookOpen className="mr-2 h-4 w-4 text-indigo-400" />
                Generate New Curriculum
                <ArrowRight className="ml-1.5 h-4 w-4 text-slate-500" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Curriculum?"
        description="Are you sure you want to delete this curriculum? This action will hide the learning path from your dashboard and cannot be undone."
        confirmText="Yes, delete it"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isDeleting}
      />
    </div>
  );
}
