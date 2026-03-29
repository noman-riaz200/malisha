'use client';
// =============================================================================
// app/(auth)/login/page.tsx & app/(auth)/register/page.tsx - Beautiful Bootstrap Design
// =============================================================================
import Link from 'next/link';
import { useState, FormEvent, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get('callbackUrl') || '/dashboard';
  const errorParam = sp.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle error from URL params (e.g., from NextAuth redirect)
  useEffect(() => {
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        CredentialsSignin: 'Invalid email or password. Please try again.',
        Default: 'An error occurred. Please try again.',
      };
      setError(errorMessages[errorParam] || errorMessages.Default);
    }
  }, [errorParam]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Left Side - Branding & Illustration */}
      <div className="auth-left-panel">
        <div className="auth-brand-content">
          <Link href="/" className="auth-logo">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M11.7 2.805a.75.75 0 01.6 0A14.615 14.615 0 0122 13.75a14.615 14.615 0 01-9.7 10.945.75.75 0 01-.6 0A14.615 14.615 0 012 13.75 14.615 14.615 0 0011.7 2.805z" />
                <path fillRule="evenodd" d="M12.315 2.31a.75.75 0 10-.6 0A17.74 17.74 0 012 10.5c0 4.038 1.526 7.814 4.347 10.68a.75.75 0 00.606 0A17.74 17.74 0 0022 10.5c0-4.038-1.526-7.814-4.347-10.68a.75.75 0 00-.6 0zM12.315 2.31a.75.75 0 10-.6 0A17.74 17.74 0 012 10.5c0 4.038 1.526 7.814 4.347 10.68a.75.75 0 00.606 0A17.74 17.74 0 0022 10.5c0-4.038-1.526-7.814-4.347-10.68a.75.75 0 00-.6 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="logo-text">Malisha Edu</span>
          </Link>

          <div className="auth-hero-text">
            <h1>Welcome Back</h1>
            <p>Access your dashboard and continue your journey to international education.</p>
          </div>

          <div className="auth-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Students Placed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Universities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="auth-decoration auth-decoration-1"></div>
        <div className="auth-decoration auth-decoration-2"></div>
        <div className="auth-decoration auth-decoration-3"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 me-2" width="20" height="20">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-4">
              <label htmlFor="loginEmail" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg bg-slate-100 border border-r-0 border-slate-200 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  id="loginEmail"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="loginPassword" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg bg-slate-100 border border-r-0 border-slate-200 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-lg border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  id="loginPassword"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="inline-flex items-center px-3 rounded-r-lg bg-slate-100 border border-l-0 border-slate-200 text-slate-500 hover:bg-slate-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input className="w-4 h-4 text-teal-600 bg-slate-100 border-slate-200 rounded focus:ring-teal-500" type="checkbox" id="rememberMe" />
                <label className="ml-2 text-sm text-slate-600" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center mt-4 text-slate-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-teal-600 hover:text-teal-700">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// app/(auth)/register/page.tsx
// =============================================================================
export function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      }),
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error || 'Registration failed');
      setLoading(false);
    } else {
      setSuccess('Account created! Please check your email to verify.');
      setTimeout(() => router.push('/login'), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-wrapper">
      {/* Left Side - Branding & Illustration */}
      <div className="auth-left-panel">
        <div className="auth-brand-content">
          <Link href="/" className="auth-logo">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M11.7 2.805a.75.75 0 01.6 0A14.615 14.615 0 0122 13.75a14.615 14.615 0 01-9.7 10.945.75.75 0 01-.6 0A14.615 14.615 0 012 13.75 14.615 14.615 0 0011.7 2.805z" />
                <path fillRule="evenodd" d="M12.315 2.31a.75.75 0 10-.6 0A17.74 17.74 0 012 10.5c0 4.038 1.526 7.814 4.347 10.68a.75.75 0 00.606 0A17.74 17.74 0 0022 10.5c0-4.038-1.526-7.814-4.347-10.68a.75.75 0 00-.6 0zM12.315 2.31a.75.75 0 10-.6 0A17.74 17.74 0 012 10.5c0 4.038 1.526 7.814 4.347 10.68a.75.75 0 00.606 0A17.74 17.74 0 0022 10.5c0-4.038-1.526-7.814-4.347-10.68a.75.75 0 00-.6 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="logo-text">Malisha Edu</span>
          </Link>

          <div className="auth-hero-text">
            <h1>Start Your Journey</h1>
            <p>Join thousands of students who have successfully applied to top universities worldwide.</p>
          </div>

          <div className="auth-features-list">
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Free profile evaluation</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Expert admission guidance</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
                </svg>
              </div>
              <span>200+ partner universities</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="auth-decoration auth-decoration-1"></div>
        <div className="auth-decoration auth-decoration-2"></div>
        <div className="auth-decoration auth-decoration-3"></div>
      </div>

      {/* Right Side - Register Form */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 me-2" width="20" height="20">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success d-flex align-items-center" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 me-2" width="20" height="20">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="row g-3 mb-3">
              <div className="col-6">
                <label htmlFor="registerFirstName" className="form-label fw-medium">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerFirstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={(e) => set('firstName', e.target.value)}
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="registerLastName" className="form-label fw-medium">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="registerLastName"
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={(e) => set('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="registerEmail" className="form-label fw-medium">Email Address</label>
              <div className="input-group">
                <span className="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="registerEmail"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="registerPassword" className="form-label fw-medium">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="registerPassword"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-group-text password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="form-text">Minimum 8 characters with at least one uppercase and number</div>
            </div>

            <div className="mb-3">
              <label htmlFor="registerConfirmPassword" className="form-label fw-medium">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="registerConfirmPassword"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={(e) => set('confirm', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" id="agreeTerms" required />
              <label className="form-check-label small" htmlFor="agreeTerms">
                I agree to the{' '}
                <Link href="/terms" className="text-decoration-none">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-decoration-none">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-auth w-100 py-3"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating account...
                </>
              ) : (
                'Create Account — Free'
              )}
            </button>
          </form>

          <p className="auth-switch-text text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" className="fw-semibold text-decoration-none">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// app/(auth)/forgot-password/page.tsx
// =============================================================================
export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-right-panel" style={{ flex: 1 }}>
        <div className="auth-form-container">
          <div className="auth-form-header text-center">
            <Link href="/" className="auth-logo d-inline-flex justify-content-center mb-4">
              <div className="logo-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path d="M11.7 2.805a.75.75 0 01.6 0A14.615 14.615 0 0122 13.75a14.615 14.615 0 01-9.7 10.945.75.75 0 01-.6 0A14.615 14.615 0 012 13.75 14.615 14.615 0 0011.7 2.805z" />
                </svg>
              </div>
              <span className="logo-text">Malisha Edu</span>
            </Link>
          </div>

          {sent ? (
            <div className="text-center py-4">
              <div className="success-icon-container mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="fw-bold text-dark mb-2">Check your email</h2>
              <p className="text-muted mb-4">
                If <strong>{email}</strong> is registered, you'll receive a password reset link.
              </p>
              <Link href="/login" className="btn btn-primary btn-auth">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="me-2" width="18" height="18">
                  <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 01.44 1.06l-4.25 8.25a.75.75 0 01-1.12 0l-4.25-8.25a.75.75 0 011.12-.94l2.47 1.94V5.25a.75.75 0 01.75-.75h3.75z" clipRule="evenodd" />
                </svg>
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="fw-bold text-dark mb-1">Reset Password</h2>
              <p className="text-muted mb-4">Enter your email and we'll send a reset link.</p>
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-4">
                  <label htmlFor="forgotEmail" className="form-label fw-medium">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="forgotEmail"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary btn-auth w-100 py-3">
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
              <p className="text-center mt-4">
                <Link href="/login" className="text-decoration-none text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="me-1" width="16" height="16">
                    <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 01.44 1.06l-4.25 8.25a.75.75 0 01-1.12 0l-4.25-8.25a.75.75 0 011.12-.94l2.47 1.94V5.25a.75.75 0 01.75-.75h3.75z" clipRule="evenodd" />
                  </svg>
                  Back to Login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
