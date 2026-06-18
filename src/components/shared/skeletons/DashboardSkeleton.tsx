import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* 1. Header Greeting Skeleton */}
      <div className="space-y-3">
        <div className="h-9 w-64 bg-slate-800 rounded-xl"></div>
        <div className="h-5 w-96 bg-slate-800/60 rounded-lg"></div>
      </div>

      {/* 2. Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-slate-900/40 border-slate-800">
            <CardHeader className="pb-3 flex flex-row items-center gap-3 space-y-0">
              <div className="h-5 w-5 rounded bg-slate-800"></div>
              <div className="h-3 w-20 bg-slate-800 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-7 w-28 bg-slate-850 rounded-lg"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Main Body Split Grid Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <Card className="bg-slate-900/40 border-slate-800">
            <CardHeader className="space-y-2">
              <div className="h-5 w-48 bg-slate-800 rounded"></div>
              <div className="h-3 w-80 bg-slate-800/60 rounded"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-16 w-full bg-slate-850 rounded-xl"></div>
              <div className="h-1.5 w-full bg-slate-800 rounded"></div>
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-slate-850 rounded"></div>
                <div className="h-8 w-24 bg-slate-800 rounded-lg"></div>
              </div>
            </CardContent>
          </Card>

          <div className="h-32 bg-slate-900/30 border border-slate-800 rounded-3xl"></div>
        </div>

        <div className="space-y-8">
          <Card className="bg-slate-900/40 border-slate-800">
            <CardHeader className="space-y-2">
              <div className="h-5 w-32 bg-slate-800 rounded"></div>
              <div className="h-3 w-48 bg-slate-800/60 rounded"></div>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 w-full bg-slate-850 rounded-xl"></div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
