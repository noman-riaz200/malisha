'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Button clicked!', { email, password });
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    console.log('Form submitted', { email, password });
    setError('');
    setLoading(true);

    try {
      console.log('Calling signIn...');
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      console.log('signIn result:', result);

      if (result?.error) {
        console.log('Auth error:', result.error);
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper" style={{ position: 'relative', zIndex: 1 }}>
      {/* Left Panel */}
      <div className="auth-left-panel">
          <div className="auth-brand-content">
            <Logo variant="auth" />

            <div className="auth-hero-text">
              <h1>Welcome Back</h1>
              <p>Continue your journey to studying in China with our comprehensive education services.</p>
            </div>

            <div className="auth-stats">
              <div className="stat-item">
                <div className="stat-number">+27K</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">+250</div>
                <div className="stat-label">Universities</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">+13</div>
                <div className="stat-label">Years</div>
              </div>
          </div>
        </div>

      {/* Right Panel */}
      <div className="auth-right-panel" style={{ position: 'relative', zIndex: 10 }}>
        <div className="auth-form-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="auth-form-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-[#0d9488] hover:text-[#0a7a6f] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              style={{ position: 'relative', zIndex: 20 }}
              className="w-full bg-[#0d9488] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#0a7a6f] transition-colors focus:ring-2 focus:ring-[#0d9488] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="auth-switch-text">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold hover:underline">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}