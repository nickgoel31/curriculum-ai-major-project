'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertOctagon } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl backdrop-blur space-y-4 max-w-md mx-auto my-8">
          <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertOctagon className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Something went wrong</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              An unexpected error occurred while loading this section.
            </p>
          </div>
          <Button
            onClick={this.handleReset}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-xl"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
