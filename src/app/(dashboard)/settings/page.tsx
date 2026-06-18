import { redirect } from 'next/navigation';

export default function SettingsPage() {
  // Redirect to Profile page under the Notifications/Preferences tab
  redirect('/profile?tab=notifications');
}
