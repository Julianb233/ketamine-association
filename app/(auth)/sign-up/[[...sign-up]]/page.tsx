'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type UserRole = 'practitioner' | 'patient' | null;

export default function SignUpPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setError('Please select your role');
      return;
    }
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          role: selectedRole,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    if (!selectedRole) {
      setError('Please select your role first');
      return;
    }

    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?role=${selectedRole}`,
      },
    });
  };

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Check your email</h1>
        <p className="text-slate-600">
          We&apos;ve sent a confirmation link to <strong>{email}</strong>.
          Please click the link to verify your account.
        </p>
        <Link
          href="/sign-in"
          className="inline-block text-teal-600 hover:text-teal-700 font-semibold"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Join the Association</h1>
        <p className="mt-2 text-slate-600">
          Create your account to get started
        </p>
      </div>

      {/* Role Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">
          I am a...
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedRole('practitioner')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedRole === 'practitioner'
                ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-100'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedRole === 'practitioner' ? 'bg-teal-100' : 'bg-slate-100'
              }`}>
                <svg
                  className={`w-6 h-6 ${
                    selectedRole === 'practitioner' ? 'text-teal-600' : 'text-slate-500'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className={`font-semibold ${
                selectedRole === 'practitioner' ? 'text-teal-700' : 'text-slate-700'
              }`}>
                Practitioner
              </span>
              <span className="text-xs text-slate-500 text-center">
                Healthcare provider
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('patient')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedRole === 'patient'
                ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-100'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedRole === 'patient' ? 'bg-teal-100' : 'bg-slate-100'
              }`}>
                <svg
                  className={`w-6 h-6 ${
                    selectedRole === 'patient' ? 'text-teal-600' : 'text-slate-500'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className={`font-semibold ${
                selectedRole === 'patient' ? 'text-teal-700' : 'text-slate-700'
              }`}>
                Patient
              </span>
              <span className="text-xs text-slate-500 text-center">
                Seeking treatment
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Sign Up Form - Only show when role is selected */}
      {selectedRole && (
        <>
          {/* Social Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">or continue with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500 transition-colors"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-slate-500">Must be at least 8 characters</p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the{' '}
                <Link href="/terms" className="text-teal-600 hover:text-teal-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-teal-600 hover:text-teal-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !acceptTerms}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </>
      )}

      {/* Role selection prompt */}
      {!selectedRole && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <p className="text-sm text-slate-600">
            Please select your role above to continue with registration
          </p>
        </div>
      )}

      {/* Sign In Link */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-center text-slate-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-teal-600 hover:text-teal-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
