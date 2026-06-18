'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, LogOut, Settings, User as UserIcon, BookOpen } from 'lucide-react';

export function UserMenu() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
      </Button>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" className="text-slate-300 hover:text-white">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
            Sign up
          </Button>
        </Link>
      </div>
    );
  }

  const initials = user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-slate-800">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || 'User avatar'} />
            <AvatarFallback className="bg-slate-800 text-slate-300">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800 text-slate-200" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs leading-none text-slate-400">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-800" />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
            <Link href="/profile" className="w-full flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
            <Link href="/dashboard" className="w-full flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>My Curricula</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
            <Link href="/settings" className="w-full flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-slate-800" />
        <DropdownMenuItem 
          onClick={signOut}
          className="text-red-400 hover:text-red-300 hover:bg-slate-800 focus:text-red-300 focus:bg-slate-800 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
