'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenu } from './UserMenu';
import { Sparkles, Menu, X, LayoutDashboard, BookOpen, BarChart3, Compass } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/curricula', label: 'My Curricula', icon: BookOpen },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden text-slate-300" onClick={() => setIsOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link href="/dashboard" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                CurriculumAI
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex ml-10 space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === link.href ? "text-white" : "text-slate-400"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <UserMenu />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm bg-slate-900 border-r border-slate-800 p-6 shadow-2xl animate-in slide-in-from-left-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Sparkles className="h-6 w-6 text-indigo-500" />
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  CurriculumAI
                </span>
              </Link>
              <Button variant="ghost" size="icon" className="text-slate-400" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href ? "bg-indigo-600/10 text-indigo-400" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
