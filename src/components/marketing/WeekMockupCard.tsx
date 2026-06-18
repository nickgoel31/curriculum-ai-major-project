'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Play, ExternalLink, Award, FileText } from 'lucide-react';

export function WeekMockupCard() {
  return (
    <Card className="bg-slate-900/80 border-slate-800 shadow-2xl shadow-indigo-500/10 backdrop-blur rounded-2xl overflow-hidden max-w-md w-full border border-slate-800/80 transform hover:-translate-y-1 transition-all duration-300">
      <CardHeader className="pb-4 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/20 border-b border-slate-800/60">
        <div className="flex justify-between items-start">
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/25 mb-2">
            Week 3: Backend Development
          </Badge>
          <div className="flex gap-1.5 text-xs text-slate-500 font-medium">
            <span>67% Complete</span>
          </div>
        </div>
        <CardTitle className="text-white text-lg font-bold tracking-tight mt-1">
          REST APIs & Express Server Basics
        </CardTitle>
        <CardDescription className="text-slate-400 text-xs">
          Learn how to set up server routes, parse requests, and return structured JSON data.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Progress Bar */}
        <div className="space-y-1">
          <Progress value={67} className="h-1.5 bg-slate-800 [&>div]:bg-indigo-600" />
        </div>

        {/* Tasks Checklist */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Objectives</p>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
              <span className="text-slate-300 line-through decoration-slate-600">
                Understand HTTP Request/Response lifecycle & status codes
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
              <span className="text-slate-300 line-through decoration-slate-600">
                Build a simple Express.js server on port 5000
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-sm">
              <Circle className="h-4.5 w-4.5 text-slate-600 shrink-0 mt-0.5" />
              <span className="text-slate-200">
                Implement POST, PUT, and DELETE methods for a Task API
              </span>
            </div>
          </div>
        </div>

        {/* Curated Resources */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Curated Resources</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-slate-850 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Play className="h-4 w-4 text-red-500 fill-red-500/20" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-white truncate max-w-[180px]">
                    Express.js Tutorial for Beginners
                  </p>
                  <p className="text-[10px] text-slate-500">Video • CodeWithHarry • 45m</p>
                </div>
              </div>
              <Badge className="bg-slate-800 text-slate-400 border-none text-[10px] uppercase font-normal">
                Free
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-slate-850 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-400" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-white truncate max-w-[180px]">
                    REST API Design Best Practices
                  </p>
                  <p className="text-[10px] text-slate-500">Article • MDN Web Docs • 15m</p>
                </div>
              </div>
              <Badge className="bg-slate-800 text-slate-400 border-none text-[10px] uppercase font-normal">
                Free
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
