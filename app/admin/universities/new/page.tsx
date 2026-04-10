'use client';
// =============================================================================
// app/admin/universities/new/page.tsx — Add University Form
// =============================================================================
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function NewUniversityPage() {
  const router = useRouter();
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

  const [form, setForm] = useState({
    name: '', description: '', worldRank: '', website: '',
    city: '', province: '', studentsEnrolled: '',
    is211: false, is985: false, isDoubleFirstClass: false, cscaRequired: false,
    marchDeadline: '', septemberDeadline: '',
  });

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const [uploadError, setUploadError] = useState('');

  const uploadImage = async (file: File, setUrl: (u: string) => void) => {
    try {
      setUploadError('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', 'photo');
      const res = await fetch('/api/documents/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Upload failed');
      }
      const json = await res.json();
      if (json.success) {
        setUrl(json.document.fileUrl);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(msg);
      console.error('Upload error:', err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!logoUrl || !bannerUrl) { setError('Please upload both logo and banner image.'); return; }
    setSaving(true); setError('');

    const intakes = [];
    if (form.marchDeadline)     intakes.push({ season: 'march',     year: 2026, deadline: form.marchDeadline });
    if (form.septemberDeadline) intakes.push({ season: 'september', year: 2026, deadline: form.septemberDeadline });

    const res = await fetch('/api/universities', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name, description: form.description,
        worldRank: form.worldRank, website: form.website,
        logo: logoUrl, bannerImage: bannerUrl,
        location: { city: form.city, province: form.province, country: 'China' },
        studentsEnrolled: parseInt(form.studentsEnrolled) || 0,
        badges: { is211: form.is211, is985: form.is985, isDoubleFirstClass: form.isDoubleFirstClass, cscaRequired: form.cscaRequired },
        intakes,
      }),
    });

    const json = await res.json();
    if (!res.ok) { setError(json.error || 'Failed to create'); setSaving(false); return; }
    router.push('/admin/universities');
  };

  const inputClass = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-700 transition-colors">←</button>
        <h1 className="font-display text-2xl font-bold text-slate-900">Add University</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {(error || uploadError) && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{uploadError || error}</div>}

        {/* Basic info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">Basic Information</h2>
          <div><label className={labelClass}>University Name *</label>
            <input required value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} placeholder="e.g. Beijing Normal University" /></div>
          <div><label className={labelClass}>Description *</label>
            <textarea required value={form.description} onChange={e => set('description', e.target.value)}
              rows={4} className={`${inputClass} resize-none`} placeholder="Overview of the university..." /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>World Rank</label>
              <input value={form.worldRank} onChange={e => set('worldRank', e.target.value)} className={inputClass} placeholder="e.g. 101-150" /></div>
            <div><label className={labelClass}>Website URL</label>
              <input type="url" value={form.website} onChange={e => set('website', e.target.value)} className={inputClass} placeholder="https://" /></div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>City *</label>
              <input required value={form.city} onChange={e => set('city', e.target.value)} className={inputClass} placeholder="Beijing" /></div>
            <div><label className={labelClass}>Province *</label>
              <input required value={form.province} onChange={e => set('province', e.target.value)} className={inputClass} placeholder="Beijing Municipality" /></div>
          </div>
          <div><label className={labelClass}>Students Enrolled</label>
            <input type="number" min="0" value={form.studentsEnrolled} onChange={e => set('studentsEnrolled', e.target.value)} className={inputClass} placeholder="e.g. 2500" /></div>
        </div>

        {/* Rankings / Badges */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Rankings & Badges</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'is211',              label: '211 Project' },
              { key: 'is985',              label: '985 Project' },
              { key: 'isDoubleFirstClass', label: 'Double First Class' },
              { key: 'cscaRequired',       label: 'CSCA Required' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={(form as any)[key]} onChange={e => set(key, e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600" />
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Intake deadlines */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">Intake Deadlines (2026)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>🌸 March 2026 Deadline</label>
              <input type="date" value={form.marchDeadline} onChange={e => set('marchDeadline', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>🍂 September 2026 Deadline</label>
              <input type="date" value={form.septemberDeadline} onChange={e => set('septemberDeadline', e.target.value)} className={inputClass} /></div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Logo */}
            <div>
              <label className={labelClass}>University Logo *</label>
              <div className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${logoUrl ? 'border-green-300 bg-green-50' : 'border-slate-300 hover:border-blue-400'}`}>
                <input type="file" accept="image/*" className="hidden" id="logo"
                  onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], setLogoUrl)} />
                <label htmlFor="logo" className="cursor-pointer">
                  {logoUrl
                    ? <div className="relative inline-block">
                      <img src={logoUrl} alt="" className="w-12 h-12 object-contain mx-auto" />
                      <button type="button" onClick={(e) => { e.preventDefault(); setLogoUrl(''); }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">×</button>
                      <p className="text-green-600 text-xs mt-1 font-medium">✓ Uploaded</p>
                    </div>
                    : <><p className="text-blue-600 text-sm font-medium">Upload Logo</p><p className="text-xs text-slate-400 mt-1">PNG, SVG recommended</p></>
                  }
                </label>
              </div>
            </div>
            {/* Banner */}
            <div>
              <label className={labelClass}>Banner Image *</label>
              <div className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${bannerUrl ? 'border-green-300 bg-green-50' : 'border-slate-300 hover:border-blue-400'}`}>
                <input type="file" accept="image/*" className="hidden" id="banner"
                  onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], setBannerUrl)} />
                <label htmlFor="banner" className="cursor-pointer">
                  {bannerUrl
                    ? <div className="relative inline-block">
                      <img src={bannerUrl} alt="" className="w-20 h-10 object-cover rounded" />
                      <button type="button" onClick={(e) => { e.preventDefault(); setBannerUrl(''); }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">×</button>
                      <p className="text-green-600 text-xs mt-1 font-medium">✓ Uploaded</p>
                    </div>
                    : <><p className="text-blue-600 text-sm font-medium">Upload Banner</p><p className="text-xs text-slate-400 mt-1">1200×400px recommended</p></>
                  }
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Saving...' : '+ Add University'}
          </button>
        </div>
      </form>
    </div>
  );
}
