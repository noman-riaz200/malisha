import { redirect } from 'next/navigation';

export default function StudentDashboardRoot() {
  redirect('/student/dashboard/applications');
}