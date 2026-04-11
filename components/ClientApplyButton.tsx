'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ClientApplyButtonProps {
  programId?: string;
  universityId?: string;
  buttonText?: string;
  className?: string;
}

export default function ClientApplyButton({
  programId,
  universityId,
  buttonText = 'Apply Now',
  className = 'inline-flex btn-primary text-xs py-2 px-4 mt-3',
}: ClientApplyButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyClick = async () => {
    setIsLoading(true);

    if (status === 'loading') return;

    if (!session) {
      const currentPath = window.location.pathname;
      const search = window.location.search;
      const fullPath = `${currentPath}${search}`;
      const encodedCallbackUrl = encodeURIComponent(fullPath);
      router.push(`/login?callbackUrl=${encodedCallbackUrl}`);
      return;
    }

    const userRole = (session.user as any)?.role;

    if (userRole === 'admin' || userRole === 'Admin') {
      setIsLoading(false);
      alert('Please log in with a Student account to apply.');
      return;
    }

    const queryParams = new URLSearchParams();
    if (programId) queryParams.set('program', programId);
    if (universityId) queryParams.set('university', universityId);
    
    const targetUrl = `/student/dashboard/applications/new?${queryParams.toString()}`;
    router.push(targetUrl);
  };

  if (status === 'loading' || isLoading) {
    return (
      <button className={className} disabled>
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