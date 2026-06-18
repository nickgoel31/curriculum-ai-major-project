import React from 'react';
import Link from 'next/link';
import { ScrollAnimate } from '@/components/shared/ScrollAnimate';
import { WeekMockupCard } from '@/components/marketing/WeekMockupCard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Calendar,
  Layers,
  Map,
  Compass,
  Smile,
  Zap,
  TrendingUp,
  Cpu,
  GraduationCap,
} from 'lucide-react';

export const metadata = {
  title: 'CurriculumAI — Personalized AI Learning Paths for Indian Students',
  description:
    'Generate week-by-week personalized learning paths to land your dream tech job. Tailored specifically for Indian college students, using free resources.',
};

const FEATURES = [
  {
    icon: Compass,
    title: 'Role-Specific Paths',
    description: 'Paths calibrated specifically to the roles currently in high demand in the Indian tech ecosystem.',
  },
  {
    icon: GraduationCap,
    title: 'Free Resources First',
    description: 'We prioritize high-quality tutorials, free video playlists, and documentation accessible to everyone.',
  },
  {
    icon: Calendar,
    title: 'Week-by-Week Structure',
    description: 'Clear, digestible timeline goals so you never feel overwhelmed by what to learn next.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Mark tasks complete, track learning streaks, and visually watch your progress grow day by day.',
  },
  {
    icon: Smile,
    title: 'Made for Indian Students',
    description: 'Curated by factoring in Tier 2/3 college curriculum gaps, highlighting platforms popular in India.',
  },
  {
    icon: Zap,
    title: 'AI-Generated in Seconds',
    description: 'Our system analyzes your background and shapes a bespoke path instantly using Claude AI.',
  },
];

const ROLES = [
  { emoji: '🧑‍💻', title: 'Full Stack Developer', weeks: 12, difficulty: 'Beginner-Friendly', skills: ['React', 'Node.js', 'MongoDB', 'SQL'] },
  { emoji: '🎨', title: 'UI/UX Designer', weeks: 8, difficulty: 'Creative Focus', skills: ['Figma', 'Wireframing', 'Prototyping', 'UI Kits'] },
  { emoji: '🤖', title: 'Machine Learning Engineer', weeks: 16, difficulty: 'Intermediate+', skills: ['Python', 'PyTorch', 'Pandas', 'Scikit-Learn'] },
  { emoji: '⚙️', title: 'DevOps Engineer', weeks: 12, difficulty: 'Advanced', skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'] },
  { emoji: '📊', title: 'Data Analyst', weeks: 10, difficulty: 'Beginner-Friendly', skills: ['Excel', 'SQL', 'Tableau', 'PowerBI'] },
  { emoji: '💻', title: 'Frontend Developer', weeks: 10, difficulty: 'Beginner-Friendly', skills: ['HTML/CSS', 'JS', 'React', 'Tailwind'] },
];

const TESTIMONIALS = [
  {
    quote: "As a student from a Tier 3 college, I had no roadmap. CurriculumAI generated a custom Node.js path for me, and I completed it in 12 weeks. I just secured my first remote frontend internship!",
    name: "Rahul Sharma",
    subtitle: "B.Tech CSE, NIET Greater Noida",
    avatar: "RS",
  },
  {
    quote: "The ability to set my own weekly hours is amazing. I only had 10 hours a week due to semester exams, but the AI adjusted my schedule perfectly. The free YouTube resources saved me thousands.",
    name: "Priya Patel",
    subtitle: "BCA, Christ University Bangalore",
    avatar: "PP",
  },
  {
    quote: "Usually roadmap sites only list topics. This app gives specific tutorials, project files, and tasks for each week. I built three projects for my resume just following the week checklists.",
    name: "Amit Verma",
    subtitle: "B.Tech IT, SRM IST Chennai",
    avatar: "AV",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-950/20 via-violet-950/10 to-transparent blur-3xl pointer-events-none -z-10"></div>
      
      {/* 1. PUBLIC NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
              CurriculumAI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#roles" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Roles
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-350 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-505/10 bg-indigo-600/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 animate-pulse">
              <Cpu className="h-3.5 w-3.5" />
              <span>Powered by Claude AI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Your Personalized Path to Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300">
                Dream Job
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              CurriculumAI analyzes your skills and generates a week-by-week learning plan curated for Indian students
              — free resources, real results.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold h-14 px-8 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                Create My Learning Path
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold h-14 px-8 rounded-xl transition-all"
              >
                See how it works ↓
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2.5">
                {['RS', 'PP', 'AV', 'NK'].map((initials, idx) => (
                  <div
                    key={idx}
                    className="h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Join <span className="text-white font-bold">2,400+ students</span> already on their path
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-4 duration-1000">
            <WeekMockupCard />
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-950/40 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">How It Works</h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Get your custom developer roadmap in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Dashed Connector Line for Desktop */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-850 -z-10"></div>

            {[
              {
                step: '01',
                icon: Layers,
                title: 'Tell us your goal',
                desc: 'Select your target job role, specify your current level, and state how many hours you can commit each week.',
              },
              {
                step: '02',
                icon: Cpu,
                title: 'AI builds your path',
                desc: 'Claude AI processes your input to generate a step-by-step week-by-week learning plan, finding the best resources.',
              },
              {
                step: '03',
                icon: BookOpen,
                title: 'Learn, track, grow',
                desc: 'Follow along with checklists, watch curated video playlists, tick off objectives, and track your streak scores.',
              },
            ].map((step, idx) => (
              <ScrollAnimate key={idx} delay={`delay-${idx * 200}`}>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="relative mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-indigo-650 bg-indigo-600/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                      <step.icon className="h-7 w-7" />
                    </div>
                    <span className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-350 flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-sm">{step.desc}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Built for Student Success</h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Everything you need to successfully upskill and prep for placements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <ScrollAnimate key={idx} delay={`delay-${(idx % 3) * 150}`}>
              <Card className="bg-slate-900/30 border-slate-900 hover:border-slate-800 backdrop-blur p-6 hover:bg-slate-900/50 transition-all duration-300 h-full">
                <div className="h-10 w-10 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/15">
                  <feat.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base text-white font-bold mb-1.5">{feat.title}</CardTitle>
                <CardDescription className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </CardDescription>
              </Card>
            </ScrollAnimate>
          ))}
        </div>
      </section>

      {/* 5. POPULAR ROLES */}
      <section id="roles" className="py-20 bg-slate-950/40 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Explore Learning Paths For...</h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Choose your career target and initialize your tailored roadmap.
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent snap-x">
            {ROLES.map((role, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80 snap-start bg-slate-900/40 border border-slate-850 hover:border-slate-750 p-5 rounded-2xl space-y-4 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="text-3xl">{role.emoji}</div>
                  <Badge className="bg-slate-800 text-slate-400 border-none font-normal text-[10px]">
                    {role.weeks} Weeks
                  </Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{role.title}</h3>
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                    {role.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {role.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] bg-slate-950 text-indigo-400 border border-indigo-500/10 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link href="/onboarding" passHref className="block pt-2">
                  <button className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-all">
                    Start This Path
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STATS SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-indigo-500/15 rounded-3xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { val: '14+ Roles', desc: 'Pre-calibrated career paths' },
                { val: '100% Free', desc: 'Sourced from public portals & platforms' },
                { val: '< 30 Secs', desc: 'Instant bespoke path compilation' },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-300">
                    {stat.val}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">What Our Students Say</h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Verified feedback from students learning across Indian engineering colleges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <ScrollAnimate key={idx} delay={`delay-${idx * 200}`}>
              <Card className="bg-slate-900/30 border-slate-900 p-6 flex flex-col justify-between h-full hover:bg-slate-900/40 transition-colors">
                <CardContent className="p-0 space-y-4">
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </CardContent>
                <CardFooter className="p-0 pt-6 flex items-center gap-3 border-t border-slate-900/60 mt-6">
                  <div className="h-9 w-9 rounded-full bg-indigo-650 bg-indigo-600/10 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">
                    {test.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{test.name}</p>
                    <p className="text-[10px] text-slate-500">{test.subtitle}</p>
                  </div>
                </CardFooter>
              </Card>
            </ScrollAnimate>
          ))}
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-indigo-950/20 border-t border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <ScrollAnimate>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Ready to start your journey?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-2">
              Generate your personalized free learning path in less than 30 seconds.
            </p>
            <div className="pt-6">
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold h-14 px-10 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs text-slate-500 mt-3 font-medium">No Credit Card Required • Completely Free Roadmap</p>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">CurriculumAI</span>
            </Link>
            <p className="text-xs text-slate-500">
              Personalized roadmap compiler for tier 2/3 engineering colleges.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-semibold text-slate-500">
            <span className="hover:text-slate-400 cursor-pointer">About</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Contact</span>
          </div>

          <div className="text-xs text-slate-500">
            Built with ❤️ for Indian Students
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-650 text-slate-600 mt-6 max-w-7xl mx-auto px-4 border-t border-slate-900/40 pt-4">
          © {new Date().getFullYear()} CurriculumAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
