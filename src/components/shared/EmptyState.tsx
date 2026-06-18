'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  return (
    <Card className="bg-slate-900/40 border-slate-800 backdrop-blur text-center p-8 w-full max-w-lg mx-auto my-6">
      <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
        {Icon && (
          <div className="h-14 w-14 rounded-2xl bg-indigo-650/10 bg-indigo-600/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-white text-lg font-bold tracking-tight">{title}</h3>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">{description}</p>
        </div>
        {ctaLabel && ctaHref && (
          <Link href={ctaHref} passHref className="pt-2">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 rounded-xl">
              {ctaLabel}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
