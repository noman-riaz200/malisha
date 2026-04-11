// =============================================================================
// app/student/dashboard/applications/new/page.tsx — New Application Page
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db/mongoose';
import { University } from '@/lib/db/models/University';
import { Program } from '@/lib/db/models/Program';
import { ApplicationForm } from '@/components/all-components';

interface Props {
  searchParams: { program?: string; university?: string };
}

export default async function NewApplicationPage({ searchParams }: Props) {
  const session = await auth();
  if (!session) redirect('/login?callbackUrl=/student/dashboard/applications/new');

  await connectDB();

  const programId = searchParams.program;
  const universityId = searchParams.university;

  let universityName = '';
  let programName = '';

  if (universityId) {
    const uni = await University.findById(universityId).lean();
    if (uni) universityName = uni.name as string;
  }

  if (programId) {
    const prog = await Program.findById(programId).lean();
    if (prog) programName = prog.name as string;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">New Application</h1>
        <p className="text-slate-500 mt-1">Apply to your desired university program</p>
      </div>
      <ApplicationForm
        programId={programId || ''}
        universityId={universityId || ''}
        universityName={universityName}
        programName={programName}
      />
    </div>
  );
}