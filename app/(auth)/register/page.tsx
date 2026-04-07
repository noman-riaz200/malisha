"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const validateForm = (): string | null => {
    if (!form.firstName.trim()) return 'First name is required';
    if (!form.lastName.trim()) return 'Last name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email is required';
    if (form.password.length < 8) return 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          role: 'student',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login?registered=true');
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-right-panel">
        <div className="auth-form-container text-center animate-fade-up">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Created!</h2>
            <p className="text-gray-600 mb-8">Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      {/* Left Panel - Same as Login */}
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
            <h1 className="animate-fade-up">Join Our Community</h1>
            <p className="animate-fade-up-delay-1">
              Create your free account and start your journey to study 
              at top Chinese universities today.
            </p>
          </div>

          <div className="auth-stats">
            <div className="stat-item animate-fade-up-delay-2">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Students</div>
            </div>
            <div className="stat-item animate-fade-up-delay-3">
              <div className="stat-number">500+</div>
              <div className="stat-label">Universities</div>
            </div>
            <div className="stat-item animate-fade-up-delay-4">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>

          <div className="auth-features-list mt-8">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <span>Free Application Support</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌍</div>
              <span>Global University Access</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💬</div>
              <span>24/7 Expert Guidance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="auth-right-panel" suppressHydrationWarning>
        <div className="auth-form-container" suppressHydrationWarning>
          <div className="auth-form-header animate-fade-up">
            <h2>Create your account</h2>
            <p>It takes less than a minute. Free forever.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm animate-fade-up">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 text-base placeholder-gray-400"
                  placeholder="John"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 text-base placeholder-gray-400"
                  placeholder="Doe"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 text-base placeholder-gray-400"
                placeholder="john@example.com"
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
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 text-base placeholder-gray-400"
                placeholder="At least 8 characters"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 text-base placeholder-gray-400"
                placeholder="Re-enter your password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-semibold text-base hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" pathLength="1" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-gray-100" suppressHydrationWarning>
            <p className="auth-switch-text" suppressHydrationWarning>
              Already have an account?{' '}
              <Link href="/login" className="font-semibold hover:text-[#0d9488] transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

