import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function ProgressSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Top Section Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Circular Ring placeholder */}
        <Card className="bg-slate-900/40 border-slate-800 md:col-span-1 flex flex-col items-center justify-center py-8">
          <CardContent className="space-y-4 flex flex-col items-center">
            <div className="h-32 w-32 rounded-full border-8 border-slate-800 flex items-center justify-center">
              <div className="h-6 w-16 bg-slate-850 rounded"></div>
            </div>
            <div className="space-y-2 text-center">
              <div className="h-4 w-36 bg-slate-800 rounded mx-auto"></div>
              <div className="h-3 w-44 bg-slate-800/60 rounded mx-auto"></div>
            </div>
          </CardContent>
        </Card>

        {/* Right Details/Dates placeholder */}
        <Card className="bg-slate-900/40 border-slate-800 md:col-span-2">
          <CardHeader>
            <div className="h-5 w-40 bg-slate-800 rounded"></div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 bg-slate-850 rounded"></div>
                <div className="h-5 w-32 bg-slate-800 rounded"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recharts Chart Section placeholder */}
      <Card className="bg-slate-900/40 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1.5">
            <div className="h-5 w-48 bg-slate-800 rounded"></div>
            <div className="h-3 w-64 bg-slate-800/60 rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Simulated chart bars container */}
          <div className="h-[220px] w-full bg-slate-950/40 border border-slate-900 rounded-xl flex items-end justify-between p-4 gap-2">
            {Array.from({ length: 20 }).map((_, i) => {
              const heights = ['h-[20px]', 'h-[60px]', 'h-[10px]', 'h-[110px]', 'h-[40px]', 'h-[180px]', 'h-[15px]'];
              const randomHeight = heights[i % heights.length];
              return (
                <div
                  key={i}
                  className={`w-full bg-slate-850/60 rounded-t-sm ${randomHeight}`}
                ></div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
