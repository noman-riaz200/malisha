"use client";

import { signIn, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Handle NextAuth callback/error
  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam === 'CredentialsSignin' ? 'Invalid email or password' : 'Login failed');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
      redirect: false,
    });

    setLoading(false);
    
    if (result?.error) {
      setError('Invalid email or password');
    } else if (result?.ok) {
      router.push(result.url || '/');
    }
  };

  return (
    <div suppressHydrationWarning>
      {/* Left Panel - Hero */}
      <div className="auth-left-panel" suppressHydrationWarning>
        <div className="auth-brand-content" suppressHydrationWarning>
          <Link href="/" className="auth-logo" suppressHydrationWarning>
            <div className="logo-icon" suppressHydrationWarning>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <div className="logo-text">Malisha Edu</div>
              <div className="text-xs opacity-75 mt-1 tracking-wider">Study Abroad Experts</div>
            </div>
          </Link>

          <div className="auth-hero-text">
            <h1 className="animate-fade-up">Welcome Back</h1>
            <p className="animate-fade-up-delay-1">
              Access your dashboard to manage applications, track progress, 
              and connect with universities worldwide.
            </p>
          </div>

          <div className="auth-stats">
            <div className="stat-item animate-fade-up-delay-2">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item animate-fade-up-delay-3">
              <div className="stat-number">500+</div>
              <div className="stat-label">Universities</div>
            </div>
            <div className="stat-item animate-fade-up-delay-4">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success</div>
            </div>
          </div>

          <div className="auth-features-list mt-8">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <span>Access 500+ Partner Universities</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <span>Track Applications in Real-time</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <span>Scholarships & Fee Waivers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="auth-right-panel" suppressHydrationWarning>
        <div className="auth-form-container" suppressHydrationWarning>
          <div className="auth-form-header animate-fade-up">
            <h2>Sign in to your account</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm animate-fade-up">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 text-base placeholder-gray-400"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 text-base placeholder-gray-400"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-[#0d9488] text-white py-3 px-6 rounded-xl font-semibold text-base hover:bg-[#0f766e] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" pathLength="1" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-100" suppressHydrationWarning>
            <p className="auth-switch-text" suppressHydrationWarning>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold hover:text-[#0d9488] transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

