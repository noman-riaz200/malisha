'use client';
// =============================================================================
// app/(public)/get-free-consultation/page.tsx
// =============================================================================
import { useState, FormEvent } from 'react';
import Link from 'next/link';

const MAJORS   = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Law', 'Finance', 'Architecture', 'Chinese Language', 'Education', 'Other'];
const DEGREES  = ['Bachelor', 'Master', 'PhD', 'Foundation', 'Language Course'];
const INTAKES  = ['March 2026', 'September 2026', 'March 2027', 'Not decided yet'];

export const dynamic = 'force-dynamic';

export default function FreeConsultationPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    interestedMajor: '', interestedDegree: '', lastAcademicResult: '', intake: '',
  });
  const [sending,  setSending]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true); setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'consultation' }),
      });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error); }
      setSuccess(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        paddingTop: '6rem'
      }}
    >
      <div className="w-100" style={{ maxWidth: '36rem' }}>
        {/* Header */}
        <div className="text-center mb-5">
          <Link href="/" className="d-inline-flex align-items-center gap-2 mb-4 text-decoration-none">
            <div 
              className="d-flex align-items-center justify-content-center rounded-3 text-white fw-bold"
              style={{ width: '2.25rem', height: '2.25rem', backgroundColor: 'var(--vz-primary)' }}
            >
              V
            </div>
            <span className="display-font fw-bold fs-4" style={{ color: 'white' }}>Vizox</span>
          </Link>
          <h1 className="display-font fw-bold mb-2" style={{ fontSize: '2rem', color: 'white' }}>Free Consultation</h1>
          <p style={{ color: '#93c5fd', fontSize: '0.875rem' }}>Tell us about yourself and we'll find the perfect university match for you.</p>
        </div>

        <div className="bg-white rounded-4 p-4 p-md-5" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
          {success ? (
            <div className="text-center py-4">
              <div 
                className="rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{ width: '5rem', height: '5rem', backgroundColor: 'rgba(22, 163, 74, 0.1)' }}
              >
                <span style={{ fontSize: '2rem' }}>🎉</span>
              </div>
              <h2 className="fw-semibold mb-2" style={{ fontSize: '1.5rem', color: '#1e293b' }}>We'll be in touch!</h2>
              <p className="mb-2" style={{ color: '#64748b', fontSize: '0.875rem' }}>
                One of our advisors will contact you within <strong>24 hours</strong> via the contact details you provided.
              </p>
              <p className="mb-4" style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Check your WhatsApp / Telegram / WeChat for our message.</p>
              <Link href="/universities" className="btn-vz-primary">Browse Universities →</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}

              <div>
                <label className="form-label-vz">Full Name *</label>
                <input required value={form.name} onChange={e => set('name', e.target.value)} className="form-control-vz" placeholder="Your full name" />
              </div>

              <div className="mt-3">
                <label className="form-label-vz">Phone (WhatsApp / WeChat / Telegram) *</label>
                <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="form-control-vz" placeholder="+1 xxx xxx xxxx" />
              </div>

              <div className="mt-3">
                <label className="form-label-vz">Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="form-control-vz" placeholder="Optional" />
              </div>

              <div className="row g-3 mt-3">
                <div className="col-6">
                  <label className="form-label-vz">Interested Major</label>
                  <select value={form.interestedMajor} onChange={e => set('interestedMajor', e.target.value)} className="form-control-vz">
                    <option value="">Select major</option>
                    {MAJORS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label-vz">Degree Level</label>
                  <select value={form.interestedDegree} onChange={e => set('interestedDegree', e.target.value)} className="form-control-vz">
                    <option value="">Select degree</option>
                    {DEGREES.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-6">
                  <label className="form-label-vz">Last Academic Result</label>
                  <input value={form.lastAcademicResult} onChange={e => set('lastAcademicResult', e.target.value)} className="form-control-vz" placeholder="e.g. GPA 3.5, A-levels" />
                </div>
                <div className="col-6">
                  <label className="form-label-vz">Target Intake</label>
                  <select value={form.intake} onChange={e => set('intake', e.target.value)} className="form-control-vz">
                    <option value="">Select intake</option>
                    {INTAKES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" disabled={sending} className="btn-vz-primary w-100 mt-4" style={{ padding: '0.875rem' }}>
                {sending ? 'Submitting...' : '✓ Get My Free Consultation'}
              </button>

              <p className="text-center mt-3 mb-0" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                By submitting, you agree to our{' '}
                <Link href="/privacy" style={{ color: 'var(--vz-primary)' }}>Privacy Policy</Link>.
                No spam, ever.
              </p>
            </form>
          )}
        </div>

        {/* Trust signals */}
        <div className="d-flex justify-content-center gap-4 gap-md-5 mt-4 flex-wrap" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
          {['27,000+ Students Placed', '13+ Years Experience', '250+ Partner Universities'].map(t => (
            <span key={t} className="d-flex align-items-center gap-1">
              <span style={{ color: '#60a5fa' }}>✓</span>{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
