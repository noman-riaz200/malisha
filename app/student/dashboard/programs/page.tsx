import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = { title: 'Program Selection — EduPro' };
export const dynamic = 'force-dynamic';

export default async function ProgramsPage() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Program Selection</h1>
          <p className="text-slate-500 mt-1">Browse and select from our partner universities</p>
        </div>
        <Link href="/universities" className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium rounded-xl hover:from-red-600 hover:to-rose-700 transition-all">
          Browse Universities
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎓</div>
        <h3 className="font-semibold text-slate-900 text-lg mb-2">Find Your Perfect Program</h3>
        <p className="text-slate-500 mb-6">Explore 250+ partner universities and find the right program for you.</p>
        <Link href="/universities" className="inline-flex px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium rounded-xl hover:from-red-600 hover:to-rose-700 transition-all">Start Searching →</Link>
      </div>
    </div>
  );
}
