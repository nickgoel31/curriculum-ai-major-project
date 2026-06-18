import { ReactNode } from 'react';
import { Navbar } from '@/components/shared/Navbar';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, Compass, BarChart3, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/progress', label: 'Progress', icon: BarChart3 },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 bg-indigo-650 bg-indigo-600 px-4 py-2 rounded-xl text-white font-semibold shadow-lg"
      >
        Skip to main content
      </a>
      
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/50 p-4 pt-8" aria-label="Sidebar Navigation">
          <div className="space-y-2 flex-1">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu</p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
 
        {/* Main Content Area */}
        <main id="main-content" className="flex-1 overflow-y-auto pb-20 md:pb-0" tabIndex={-1}>
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
 
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full border-t border-slate-800 bg-slate-950/90 backdrop-blur-md pb-safe z-40" aria-label="Mobile Navigation">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-indigo-400 transition-colors focus:outline-none focus:text-indigo-400"
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5 mb-1" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
