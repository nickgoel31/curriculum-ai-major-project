'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Loader2, Upload, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EditProfileModalProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    avatar_url: string | null;
  };
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (name: string, avatarUrl: string | null) => void;
}

export function EditProfileModal({
  user,
  isOpen,
  onClose,
  onUpdate,
}: EditProfileModalProps) {
  const [name, setName] = useState(user.name || '');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar_url);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const supabase = createBrowserClient();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file size and type
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be under 2MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed');
        return;
      }

      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      // Upload to supabase storage bucket (avatars)
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '3600',
        });

      if (error) {
        console.error('Storage upload error details:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      toast.success('Avatar uploaded successfully!');
    } catch (err: any) {
      console.error('Error uploading avatar:', err);
      toast.error(err.message || 'Error uploading avatar. Please ensure "avatars" bucket is public.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      setSaving(true);

      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          avatar_url: avatarUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully!');
      onUpdate(name.trim(), avatarUrl);
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-white">Edit Profile</DialogTitle>
          <DialogDescription className="text-slate-400">
            Make changes to your profile details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-6 mt-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-indigo-600/30 group-hover:border-indigo-500 transition-colors duration-200">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={name || 'Avatar'} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-slate-800 text-slate-200 text-2xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200"
              >
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  <Upload className="h-6 w-6 text-white" />
                )}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={uploading || saving}
                className="hidden"
              />
            </div>
            <p className="text-xs text-slate-400">Click avatar to upload new image (max 2MB)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-200">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
              placeholder="Your name"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus-visible:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-400">
              Email Address (Cannot be changed)
            </Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-slate-800/40 border-slate-800/80 text-slate-400 cursor-not-allowed"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={saving}
              className="border-slate-800 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || uploading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
