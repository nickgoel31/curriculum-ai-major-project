'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-3xl mx-auto z-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-8 mb-12">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-6 w-6 text-white" />
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
              CurriculumAI
            </span>
          </Link>
          <Link href="/signup">
            <Button variant="ghost" className="text-slate-400 hover:text-white flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Sign Up
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-indigo-400 shrink-0" />
              Terms and Conditions
            </h1>
            <p className="text-slate-400 text-sm">Last updated: June 16, 2026</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              Welcome to CurriculumAI. By accessing or using our service, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use the application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Personalized Curriculum Generation</h2>
            <p className="leading-relaxed">
              CurriculumAI utilizes advanced artificial intelligence model integrations (Claude AI) to generate personalized study plans based on the user-provided onboarding profile (including target role, experience levels, and skills).
            </p>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex gap-3 text-sm">
              <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-slate-400 leading-normal">
                <strong>Important:</strong> Generated paths, task recommendations, and resource links are recommendations curated for educational purposes. We do not guarantee jobs or certification values based solely on completing these paths.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Platform Resource Links</h2>
            <p className="leading-relaxed">
              Our generated learning paths contain direct links to external websites, tutorials, videos, courses, and documentation (e.g. YouTube, freeCodeCamp, MDN Web Docs). CurriculumAI does not own or take responsibility for external contents, availability, or third-party license changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Fair Usage & Rate Limits</h2>
            <p className="leading-relaxed">
              To guarantee performance and maintain cost controls, user accounts are limited to generating a maximum of 3 curriculum structures per day. Automated scraping, bulk generating, or attempting to bypass rate limit checks via script injection is strictly prohibited.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Account Registration and Privacy</h2>
            <p className="leading-relaxed">
              Accounts created via Email or Google OAuth are governed by our privacy guidelines. You are responsible for keeping your login credentials secure. We store only essential profiles and progression metrics necessary for the curriculum tracking.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-800 pt-8">
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions or feedback regarding these terms, contact us at <span className="text-indigo-400">support@curriculumai.edu</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
