'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, Copy, Check, LogIn } from 'lucide-react';
import { toast } from 'sonner';


type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

type Role = 'Admin' | 'Viewer';

const demoCredentials: Array<{ role: Role; email: string; password: string; description: string }> = [
  {
    role: 'Admin',
    email: 'marcus.aldridge@findash.io',
    password: 'Analyst#2026!',
    description: 'Full access — manage users, edit data, export reports',
  },
  {
    role: 'Viewer',
    email: 'priya.nair@findash.io',
    password: 'Viewer$Dash26',
    description: 'Read-only — view dashboards and run queries',
  },
];

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const autofill = (cred: typeof demoCredentials[0]) => {
    setValue('email', cred.email, { shouldValidate: true });
    setValue('password', cred.password, { shouldValidate: true });
  };

  // Backend integration point: replace with API call to POST /api/auth/login
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);

    const valid = demoCredentials.find(
      (c) => c.email === data.email && c.password === data.password
    );

    if (!valid) {
      setError('email', { message: 'Invalid credentials — use the demo accounts below to sign in' });
      return;
    }

    toast.success(`Signed in as ${valid.role}`, {
      description: `Welcome back, ${valid.email.split('@')[0].replace('.', ' ')}`,
    });
  };

  return (
    <div className="w-full max-w-[420px]">
      {/* Mobile logo */}
      <div className="flex items-center gap-2 mb-8 lg:hidden">
        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="2" y="12" width="4" height="6" rx="1" fill="var(--primary)" opacity="0.7" />
            <rect x="8" y="8" width="4" height="10" rx="1" fill="var(--primary)" opacity="0.85" />
            <rect x="14" y="4" width="4" height="14" rx="1" fill="var(--primary)" />
          </svg>
        </div>
        <span className="text-[16px] font-700 text-foreground">FinDash</span>
      </div>

      <h1 className="text-[24px] font-700 text-foreground tracking-tight mb-1">Sign in to FinDash</h1>
      <p className="text-[13px] text-muted-foreground mb-7">
        Enter your credentials to access the analytics platform.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[12px] font-500 text-foreground mb-1.5">
            Work Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="analyst@company.io"
            className={`w-full px-3 py-2.5 rounded-lg border text-[13px] bg-input text-foreground placeholder:text-muted-foreground outline-none transition-all duration-150 focus:ring-1 focus:ring-ring focus:border-primary ${
              errors.email ? 'border-negative focus:ring-negative' : 'border-border'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
            })}
          />
          {errors.email && (
            <p className="mt-1.5 text-[11px] text-negative">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-[12px] font-500 text-foreground">
              Password
            </label>
            <button type="button" className="text-[11px] text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••••"
              className={`w-full px-3 py-2.5 pr-10 rounded-lg border text-[13px] bg-input text-foreground placeholder:text-muted-foreground outline-none transition-all duration-150 focus:ring-1 focus:ring-ring focus:border-primary ${
                errors.password ? 'border-negative focus:ring-negative' : 'border-border'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-[11px] text-negative">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-border bg-input accent-primary"
            {...register('remember')}
          />
          <label htmlFor="remember" className="text-[12px] text-muted-foreground cursor-pointer">
            Keep me signed in for 30 days
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-[13px] font-600 hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ minHeight: '42px' }}
        >
          {isLoading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <>
              <LogIn size={14} />
              Sign in to FinDash
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] text-muted-foreground">Demo accounts</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Demo credentials */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="px-3 py-2 bg-muted/40 border-b border-border">
          <p className="text-[11px] text-muted-foreground">
            Click a role to autofill credentials, then sign in
          </p>
        </div>
        {demoCredentials.map((cred) => (
          <div
            key={`cred-${cred.role}`}
            className="px-3 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors duration-100"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-600 px-1.5 py-0.5 rounded ${
                    cred.role === 'Admin' ?'bg-primary/15 text-primary' :'bg-muted text-muted-foreground'
                  }`}>
                    {cred.role}
                  </span>
                  <p className="text-[10px] text-muted-foreground truncate">{cred.description}</p>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground w-14">Email</span>
                    <span className="text-[11px] font-mono text-foreground truncate">{cred.email}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(cred.email, `${cred.role}-email`)}
                      className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Copy email"
                    >
                      {copiedField === `${cred.role}-email` ? <Check size={11} className="text-positive" /> : <Copy size={11} />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground w-14">Password</span>
                    <span className="text-[11px] font-mono text-foreground">{cred.password}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(cred.password, `${cred.role}-pass`)}
                      className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Copy password"
                    >
                      {copiedField === `${cred.role}-pass` ? <Check size={11} className="text-positive" /> : <Copy size={11} />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => autofill(cred)}
                className="flex-shrink-0 px-2.5 py-1.5 rounded-md border border-primary/30 bg-primary/10 text-primary text-[11px] font-500 hover:bg-primary/20 transition-all duration-150"
              >
                Use
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-[11px] text-muted-foreground">
        Don&apos;t have an account?{' '}
        <span className="text-primary cursor-pointer hover:text-primary/80 transition-colors">
          Request access from your admin
        </span>
      </p>

      <p className="mt-4 text-center text-[10px] text-muted-foreground">
        By signing in, you agree to our{' '}
        <span className="underline cursor-pointer hover:text-foreground transition-colors">Terms of Service</span>
        {' '}and{' '}
        <span className="underline cursor-pointer hover:text-foreground transition-colors">Privacy Policy</span>
      </p>
    </div>
  );
}