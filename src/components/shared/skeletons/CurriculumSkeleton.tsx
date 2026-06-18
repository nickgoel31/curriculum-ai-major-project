import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function CurriculumSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Top Header Card Skeleton */}
      <Card className="bg-slate-900/40 border-slate-800">
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-7 w-64 bg-slate-800 rounded-lg"></div>
                <div className="h-5 w-16 bg-slate-800 rounded"></div>
              </div>
              <div className="h-4 w-40 bg-slate-800/60 rounded"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-32 bg-slate-800 rounded-xl"></div>
              <div className="h-10 w-28 bg-slate-800 rounded-xl"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3.5 w-24 bg-slate-850 rounded"></div>
              <div className="h-3.5 w-10 bg-slate-850 rounded"></div>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded"></div>
          </div>
        </CardContent>
      </Card>

      {/* Grid Stepper / Card layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left stepper skeleton */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-slate-900/40 border-slate-800">
            <CardHeader>
              <div className="h-5 w-28 bg-slate-800 rounded"></div>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <div className="h-8 w-8 rounded-full bg-slate-800 shrink-0"></div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-24 bg-slate-850 rounded"></div>
                    <div className="h-2.5 w-40 bg-slate-800/60 rounded"></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right card detail skeleton */}
        <div className="lg:col-span-8">
          <Card className="bg-slate-900/40 border-slate-800">
            <CardHeader className="space-y-2">
              <div className="h-4 w-20 bg-slate-805 bg-slate-800/50 rounded"></div>
              <div className="h-6 w-80 bg-slate-800 rounded-lg"></div>
              <div className="h-3.5 w-96 bg-slate-800/60 rounded"></div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Objectives */}
              <div className="space-y-3">
                <div className="h-4 w-20 bg-slate-850 rounded"></div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-2.5 items-center">
                    <div className="h-4 w-4 bg-slate-800 rounded"></div>
                    <div className="h-3.5 w-72 bg-slate-850 rounded"></div>
                  </div>
                ))}
              </div>
              {/* Resources */}
              <div className="space-y-3">
                <div className="h-4 w-20 bg-slate-850 rounded"></div>
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-14 w-full bg-slate-850 rounded-xl"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
