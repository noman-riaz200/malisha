import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = { title: 'Program Selection — EduPro' };
export const dynamic = 'force-dynamic';

export default async function ProgramsPage() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Program Selection</h1>
          <p className="text-slate-500 text-sm mt-0.5">Browse and select from our partner universities</p>
        </div>
        <Link href="/universities" className="btn-primary text-sm py-2">
          Browse Universities
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎓</div>
        <h3 className="font-semibold text-slate-900 text-lg mb-2">Find Your Perfect Program</h3>
        <p className="text-slate-500 mb-6">Explore 250+ partner universities and find the right program for you.</p>
        <Link href="/universities" className="btn-primary">Start Searching →</Link>
      </div>
    </div>
  );
}
