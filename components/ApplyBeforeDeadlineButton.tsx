'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ApplyBeforeDeadlineButtonProps {
  className?: string;
  studentDashboardUrl?: string;
  buttonText?: string;
}

export default function ApplyBeforeDeadlineButton({
  className = 'btn btn-primary',
  studentDashboardUrl = '/student/dashboard/applications',
  buttonText = 'Apply Before Deadline',
}: ApplyBeforeDeadlineButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyClick = async () => {
    // 1. Authentication Check: Show loading state
    setIsLoading(true);

    // Wait for session to load if still loading
    if (status === 'loading') {
      return;
    }

    // 2. Redirection Logic (If Not Logged In)
    if (!session) {
      // Encode the current URL as callbackUrl for redirect back after login
      const currentPath = window.location.pathname;
      const encodedCallbackUrl = encodeURIComponent(currentPath);
      
      // Redirect to login page with callbackUrl query parameter
      router.push(`/login?callbackUrl=${encodedCallbackUrl}`);
      return;
    }

    // 3. Role-Based Access Check
    const userRole = (session.user as any)?.role;

    // If user is Admin, show alert and prevent access
    if (userRole === 'admin' || userRole === 'Admin') {
      setIsLoading(false);
      alert('Please log in with a Student account to apply.');
      return;
    }

    // If user is Student, redirect to the Student Dashboard Application Form
    if (userRole === 'student' || userRole === 'Student') {
      router.push(studentDashboardUrl);
      return;
    }

    // Fallback: If role is unknown, treat as student but log warning
    console.warn('[ApplyButton] Unknown user role:', userRole);
    router.push(studentDashboardUrl);
  };

  // Show loading spinner while checking session
  if (status === 'loading' || isLoading) {
    return (
      <button className={className} disabled>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    );
  }

  return (
    <button 
      onClick={handleApplyClick}
      className={className}
      disabled={isLoading}
    >
      {buttonText}
    </button>
  );
}