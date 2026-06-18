'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupInput = z.infer<typeof signupSchema>;

function PasswordStrength({ password }: { password?: string }) {
  if (!password) return null;
  const strength = Math.min(
    ((password.length > 7 ? 1 : 0) +
      (/[A-Z]/.test(password) ? 1 : 0) +
      (/[0-9]/.test(password) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 1 : 0)),
    4
  );
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
  const bars = Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className={`h-1 w-full rounded-full transition-colors ${
        i < strength ? colors[strength - 1] : 'bg-slate-800'
      }`}
    />
  ));

  return <div className="flex gap-1 mt-2">{bars}</div>;
}

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const supabase = createBrowserClient();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { terms: undefined } as any,
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (error) throw error;
      
      if (authData.user) {
        toast.success('Account created successfully!');
        router.push('/onboarding');
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up with Google');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
        <p className="text-sm text-slate-400">Enter your details to get started</p>
      </div>

      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:text-white"
          onClick={signUpWithGoogle}
          disabled={isGoogleLoading || isLoading}
        >
          {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign up with Google
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-slate-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="John Doe" 
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
              {...register('fullName')}
              disabled={isLoading || isGoogleLoading}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && <p className="text-sm text-red-400">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
              {...register('email')}
              disabled={isLoading || isGoogleLoading}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <Input 
              id="password" 
              type="password" 
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
              {...register('password')}
              disabled={isLoading || isGoogleLoading}
              aria-invalid={!!errors.password}
            />
            <PasswordStrength password={passwordValue} />
            {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
              {...register('confirmPassword')}
              disabled={isLoading || isGoogleLoading}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              onCheckedChange={(checked) => setValue('terms', checked === true ? true : false, { shouldValidate: true })}
              disabled={isLoading || isGoogleLoading}
            />
            <Label htmlFor="terms" className="text-sm font-medium leading-none text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to the <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">terms and conditions</Link>
            </Label>
          </div>
          {errors.terms && <p className="text-sm text-red-400">{errors.terms.message}</p>}

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white mt-4" disabled={isLoading || isGoogleLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
