'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { EditProfileModal } from './EditProfileModal';
import { UpdateLearningPrefs } from './UpdateLearningPrefs';
import { CurriculaList } from './CurriculaList';
import { toast } from 'sonner';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import {
  User as UserIcon,
  Settings,
  Bell,
  Trash2,
  AlertTriangle,
  Moon,
  Sun,
  ShieldAlert,
  Loader2,
  Calendar,
  Clock,
  Globe,
  Award,
} from 'lucide-react';
import { format } from 'date-fns';

interface ProfileClientProps {
  initialData: {
    id: string;
    email: string;
    name: string | null;
    avatar_url: string | null;
    created_at: string | Date;
    studentProfile: {
      targetRole: string;
      experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
      availableHoursPerWeek: number;
      preferredLanguage: 'ENGLISH' | 'HINDI' | 'HINGLISH';
      weeklyProgressEmails: boolean;
      dailyStudyReminders: boolean;
    } | null;
    curricula: any[];
  };
}

export function ProfileClient({ initialData }: ProfileClientProps) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';
  
  const [userData, setUserData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isUpdatePrefsOpen, setIsUpdatePrefsOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  // States
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  
  // Notifications state
  const [weeklyEmails, setWeeklyEmails] = useState(
    userData.studentProfile?.weeklyProgressEmails ?? true
  );
  const [dailyReminders, setDailyReminders] = useState(
    userData.studentProfile?.dailyStudyReminders ?? false
  );
  const [savingNotifications, setSavingNotifications] = useState(false);

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleProfileUpdate = (newName: string, newAvatar: string | null) => {
    setUserData((prev) => ({
      ...prev,
      name: newName,
      avatar_url: newAvatar,
    }));
  };

  const handlePrefsUpdate = (newPrefs: {
    experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    availableHoursPerWeek: number;
    preferredLanguage: 'ENGLISH' | 'HINDI' | 'HINGLISH';
  }) => {
    setUserData((prev) => ({
      ...prev,
      studentProfile: prev.studentProfile
        ? { ...prev.studentProfile, ...newPrefs }
        : {
            targetRole: 'Full Stack Developer',
            weeklyProgressEmails: true,
            dailyStudyReminders: false,
            ...newPrefs,
          },
    }));
  };

  const handleSaveNotifications = async () => {
    try {
      setSavingNotifications(true);
      const res = await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weeklyProgressEmails: weeklyEmails,
          dailyStudyReminders: dailyReminders,
        }),
      });

      if (!res.ok) throw new Error('Failed to update notification settings');

      toast.success('Notification preferences updated!');
      setUserData((prev) => ({
        ...prev,
        studentProfile: prev.studentProfile
          ? {
              ...prev.studentProfile,
              weeklyProgressEmails: weeklyEmails,
              dailyStudyReminders: dailyReminders,
            }
          : null,
      }));
    } catch (err: any) {
      toast.error(err.message || 'Error saving notification preferences');
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleResetProgress = async () => {
    try {
      setIsResetting(true);
      const res = await fetch('/api/user', {
        method: 'POST', // The reset endpoint we defined
      });

      if (!res.ok) throw new Error('Failed to reset progress');

      toast.success('All progress has been reset successfully!');
      setIsResetConfirmOpen(false);
      router.push('/onboarding');
    } catch (err: any) {
      toast.error(err.message || 'Error resetting progress');
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type "DELETE" to confirm');
      return;
    }

    try {
      setIsDeletingAccount(true);
      const res = await fetch('/api/user', {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete account');

      await supabase.auth.signOut();
      toast.success('Account deleted successfully');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Error deleting account');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const nameInitials = userData.name
    ? userData.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : userData.email.slice(0, 2).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Info */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <Avatar className="h-24 w-24 border-2 border-indigo-600/30">
            {userData.avatar_url ? (
              <AvatarImage src={userData.avatar_url} alt={userData.name || 'User'} className="object-cover" />
            ) : null}
            <AvatarFallback className="bg-slate-800 text-slate-200 text-3xl font-semibold">
              {nameInitials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">{userData.name || 'Student'}</h1>
            <p className="text-slate-400 text-sm">{userData.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-y-1 gap-x-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Member since {format(new Date(userData.created_at), 'MMMM yyyy')}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsEditProfileOpen(true)}
          className="border-slate-800 hover:bg-slate-800 bg-transparent text-slate-300 hover:text-white"
        >
          Edit Profile
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="bg-slate-900/80 border border-slate-850 p-1 rounded-xl w-full grid grid-cols-4 md:max-w-xl">
          <TabsTrigger value="profile" className="rounded-lg text-slate-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-lg text-slate-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg text-slate-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="account" className="rounded-lg text-slate-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Account
          </TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile" className="space-y-6 animate-in fade-in duration-200">
          <div className="grid gap-6">
            <Card className="bg-slate-900/40 border-slate-800 backdrop-blur">
              <CardHeader className="pb-3 border-b border-slate-800/50">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <UserIcon className="h-4.5 w-4.5 text-indigo-400" />
                  My Curricula Paths
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage all the AI-personalized learning pathways you have generated.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <CurriculaList initialCurricula={userData.curricula} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PREFERENCES TAB */}
        <TabsContent value="preferences" className="space-y-6 animate-in fade-in duration-200">
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur">
            <CardHeader className="pb-3 border-b border-slate-800/50">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Settings className="h-4.5 w-4.5 text-indigo-400" />
                Learning Profile
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your target goals and schedule metrics used to configure curricula.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/40 border border-slate-900">
                  <Award className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Target Job Role</p>
                    <p className="text-sm font-semibold text-white">
                      {userData.studentProfile?.targetRole || 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/40 border border-slate-900">
                  <Clock className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Weekly Hour Commitment</p>
                    <p className="text-sm font-semibold text-white">
                      {userData.studentProfile?.availableHoursPerWeek ?? '0'} hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/40 border border-slate-900">
                  <UserIcon className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Experience Level</p>
                    <p className="text-sm font-semibold text-white">
                      {userData.studentProfile?.experienceLevel
                        ? userData.studentProfile.experienceLevel.charAt(0) +
                          userData.studentProfile.experienceLevel.slice(1).toLowerCase()
                        : 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/40 border border-slate-900">
                  <Globe className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Language Preference</p>
                    <p className="text-sm font-semibold text-white">
                      {userData.studentProfile?.preferredLanguage
                        ? userData.studentProfile.preferredLanguage.charAt(0) +
                          userData.studentProfile.preferredLanguage.slice(1).toLowerCase()
                        : 'Not set'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  onClick={() => setIsUpdatePrefsOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Update Learning Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="space-y-6 animate-in fade-in duration-200">
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur">
            <CardHeader className="pb-3 border-b border-slate-800/50">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Bell className="h-4.5 w-4.5 text-indigo-400" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-slate-400">
                Choose how and when you want to receive curriculum reminders.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-900">
                  <div className="space-y-1 pr-4">
                    <Label className="text-sm font-semibold text-white">Weekly Progress Reminder Emails</Label>
                    <p className="text-xs text-slate-400">
                      Receive weekly summaries on your completed objectives, streak data, and target metrics.
                    </p>
                  </div>
                  <Switch checked={weeklyEmails} onCheckedChange={setWeeklyEmails} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-900">
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-1.5">
                      <Label className="text-sm font-semibold text-white">Daily Study Reminder</Label>
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-indigo-400 font-medium">
                        Soon
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Get a gentle nudge each day to spend some time on your active weekly path. (UI Placeholder)
                    </p>
                  </div>
                  <Switch checked={dailyReminders} onCheckedChange={setDailyReminders} />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  onClick={handleSaveNotifications}
                  disabled={savingNotifications}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  {savingNotifications && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ACCOUNT TAB */}
        <TabsContent value="account" className="space-y-6 animate-in fade-in duration-200">
          {/* General Account Settings */}
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur">
            <CardHeader className="pb-3 border-b border-slate-800/50">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Settings className="h-4.5 w-4.5 text-indigo-400" />
                App Preferences
              </CardTitle>
              <CardDescription className="text-slate-400">
                General app options such as visual styling and themes.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-900">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-white">App Color Theme</Label>
                  <p className="text-xs text-slate-400">
                    Switch between dark, light, or system themes.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setTheme('dark')}
                    className={theme === 'dark' ? 'bg-indigo-600 text-white' : 'border-slate-800'}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setTheme('light')}
                    className={theme === 'light' ? 'bg-indigo-600 text-white hover:text-white' : 'border-slate-800'}
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-red-950/10 border-red-900/30 backdrop-blur">
            <CardHeader className="pb-3 border-b border-red-950/30">
              <CardTitle className="text-lg text-red-400 flex items-center gap-2">
                <ShieldAlert className="h-4.5 w-4.5 text-red-500" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-slate-400">
                Actions here will impact your learning progress and credentials permanently.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-red-950/20 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-white">Reset All Progress</Label>
                  <p className="text-xs text-slate-400">
                    Wipes all generated curricula, completions, streaks, and returns you to onboarding.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="border-red-900/50 hover:bg-red-950/20 text-red-400 hover:text-red-300 w-full sm:w-auto"
                >
                  Reset Progress
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-red-950/20 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-white">Delete Account</Label>
                  <p className="text-xs text-slate-400">
                    Permanently delete your CurriculumAI account and all personal details.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDeleteConfirmText('');
                    setIsDeleteConfirmOpen(true);
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white w-full sm:w-auto"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Profile Modal */}
      <EditProfileModal
        user={userData}
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onUpdate={handleProfileUpdate}
      />

      {/* Update Preferences Modal */}
      {userData.studentProfile && (
        <UpdateLearningPrefs
          profile={userData.studentProfile}
          isOpen={isUpdatePrefsOpen}
          onClose={() => setIsUpdatePrefsOpen(false)}
          onUpdate={handlePrefsUpdate}
        />
      )}

      {/* Reset Progress Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetProgress}
        title="Reset All Progress?"
        description="Are you absolutely sure? This will wipe your active curriculum paths, completions, streak history, and cannot be undone."
        confirmText="Yes, reset all progress"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isResetting}
      />

      {/* Delete Account 2-Step Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Permanently Delete Account?"
        description="This action is irreversible. All of your curriculum pathways, scores, settings, and profile details will be permanently wiped. To proceed, type 'DELETE' in the input box below."
        confirmText="Delete Account"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isDeletingAccount}
      >
        {/* Children passed to Dialog to offer 2-step verification */}
        <div className="mt-4 space-y-2">
          <Label htmlFor="delete-confirm" className="text-xs font-semibold text-slate-400">
            Type <span className="text-red-400 font-bold">DELETE</span> to confirm
          </Label>
          <Input
            id="delete-confirm"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder="Type DELETE"
            className="bg-slate-950 border-red-950/40 text-white placeholder-slate-600 focus-visible:ring-red-500"
          />
        </div>
      </ConfirmDialog>
    </div>
  );
}
