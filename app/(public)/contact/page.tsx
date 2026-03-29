'use client';
// =============================================================================
// app/(public)/contact/page.tsx
// =============================================================================
import { useState, FormEvent } from 'react';
import Link from 'next/link';

const OFFICES = [
  { city: 'Beijing',   country: 'China 🇨🇳',       phone: '+86 186 1311 4366', email: 'info@edupro.com',        type: 'Head Office' },
  { city: 'Dhaka',     country: 'Bangladesh 🇧🇩',   phone: '+880 1xxx xxxxxx',  email: 'dhaka@edupro.com',       type: 'Regional Office' },
  { city: 'Bangkok',   country: 'Thailand 🇹🇭',     phone: '+66 xx xxx xxxx',   email: 'thailand@edupro.com',    type: 'Regional Office' },
  { city: 'Nairobi',   country: 'Kenya 🇰🇪',        phone: '+254 xxx xxx xxx',  email: 'kenya@edupro.com',       type: 'Regional Office' },
  { city: 'Colombo',   country: 'Sri Lanka 🇱🇰',    phone: '+94 xx xxx xxxx',   email: 'srilanka@edupro.com',    type: 'Regional Office' },
  { city: 'Mogadishu', country: 'Somalia 🇸🇴',      phone: '+252 xxx xxx xxx',  email: 'somalia@edupro.com',     type: 'Regional Office' },
];

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', role: 'student',
    organization: '', reason: '',
    preferredDate: '',
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
        body:   JSON.stringify({ ...form, source: 'contact' }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to send');
      setSuccess(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '6rem' }}>
      {/* Header */}
      <div className="bg-white py-5" style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div className="container-vz text-center">
          <p className="text-uppercase fw-semibold mb-2" style={{ color: 'var(--vz-primary)', fontSize: '0.875rem', letterSpacing: '0.05em' }}>Get in Touch</p>
          <h1 className="display-font fw-bold mb-3" style={{ fontSize: '2.5rem', color: '#1e293b' }}>Contact EduPro</h1>
          <p className="mx-auto" style={{ color: '#64748b', maxWidth: '32rem' }}>
            Our advisors are ready to help you find the right university. Reach us by form, email, phone, or visit our offices.
          </p>
        </div>
      </div>

      <div className="container-vz py-5">
        <div className="row g-5">

          {/* Form */}
          <div className="col-lg-8">
            <div className="bg-white rounded-4 p-4 p-md-5" style={{ border: '1px solid #e2e8f0' }}>
              <h2 className="fw-semibold mb-4" style={{ fontSize: '1.25rem', color: '#1e293b' }}>Send us a message</h2>

              {success ? (
                <div className="text-center py-5">
                  <div className="rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '5rem', height: '5rem', backgroundColor: 'rgba(22, 163, 74, 0.1)' }}>
                    <span style={{ fontSize: '2rem' }}>✉️</span>
                  </div>
                  <h3 className="fw-semibold mb-2" style={{ fontSize: '1.25rem', color: '#1e293b' }}>Message sent!</h3>
                  <p className="mb-4" style={{ color: '#64748b', fontSize: '0.875rem' }}>We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSuccess(false); setForm({ name:'',email:'',phone:'',role:'student',organization:'',reason:'',preferredDate:'' }); }} className="btn-vz-primary">
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-vz">Full Name *</label>
                      <input required value={form.name} onChange={e => set('name', e.target.value)} className="form-control-vz" placeholder="John Smith" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-vz">Email *</label>
                      <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="form-control-vz" placeholder="you@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="col-md-6">
                      <label className="form-label-vz">Phone</label>
                      <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="form-control-vz" placeholder="+1 xxx xxx xxxx" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-vz">I am a</label>
                      <select value={form.role} onChange={e => set('role', e.target.value)} className="form-control-vz">
                        <option value="student">Student</option>
                        <option value="instructor">Educator / Partner</option>
                        <option value="company">Organization</option>
                      </select>
                    </div>
                  </div>

                  {form.role === 'company' && (
                    <div className="mt-3">
                      <label className="form-label-vz">Organization Name</label>
                      <input value={form.organization} onChange={e => set('organization', e.target.value)} className="form-control-vz" />
                    </div>
                  )}

                  <div className="mt-3">
                    <label className="form-label-vz">Preferred Call Date & Time</label>
                    <input type="datetime-local" value={form.preferredDate} onChange={e => set('preferredDate', e.target.value)} className="form-control-vz" />
                  </div>

                  <div className="mt-3">
                    <label className="form-label-vz">Reason for Contact *</label>
                    <textarea required value={form.reason} onChange={e => set('reason', e.target.value)} rows={4} className="form-control-vz" style={{ resize: 'none' }} placeholder="Tell us how we can help..." />
                  </div>

                  <button type="submit" disabled={sending} className="btn-vz-primary w-100 mt-4">
                    {sending ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              <div className="bg-white rounded-4 p-4" style={{ border: '1px solid #e2e8f0' }}>
                <h3 className="fw-semibold mb-3" style={{ color: '#1e293b' }}>Direct Contact</h3>
                {[
                  { icon: 'bi-telephone', label: 'Hotline',  value: '+86 186 1311 4366',  href: 'tel:+8618613114366' },
                  { icon: 'bi-envelope', label: 'Email',    value: 'info@edupro.com',     href: 'mailto:info@edupro.com' },
                  { icon: 'bi-chat-dots', label: 'WhatsApp', value: 'Message us',          href: 'https://wa.me/8618613114366' },
                ].map(c => (
                  <a key={c.label} href={c.href} className="d-flex align-items-center gap-3 p-3 rounded-3 text-decoration-none">
                    <i className={`bi ${c.icon}`} style={{ fontSize: '1.25rem', color: 'var(--vz-primary)' }}></i>
                    <div>
                      <p className="mb-0" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{c.label}</p>
                      <p className="mb-0 fw-medium" style={{ color: '#1e293b', fontSize: '0.875rem' }}>{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="rounded-4 p-4 text-white text-center" style={{ background: 'linear-gradient(135deg, var(--vz-primary) 0%, var(--vz-primary-dark) 100%)' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</p>
                <h3 className="fw-semibold mb-2">Free Consultation</h3>
                <p className="mb-4" style={{ fontSize: '0.875rem', opacity: 0.9 }}>Quick form — we'll match you with the right university.</p>
                <Link href="/get-free-consultation" className="btn fw-semibold rounded-3 d-block" style={{ backgroundColor: 'white', color: 'var(--vz-primary)' }}>
                  Get Free Advice →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
