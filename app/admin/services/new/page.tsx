'use client';
// =============================================================================
// app/admin/services/new/page.tsx — Add Service Form
// =============================================================================
export const dynamic = 'force-dynamic';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PRESET_COLORS = [
  '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0d9488',
  '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#db2777',
  '#64748b', '#475569', '#0f172a',
];

const ICONS = [
  { class: 'bi-mortarboard-fill', label: 'Graduation' },
  { class: 'bi-airplane-fill', label: 'Travel' },
  { class: 'bi-house-fill', label: 'Accommodation' },
  { class: 'bi-briefcase-fill', label: 'Business' },
  { class: 'bi-globe', label: 'Global' },
  { class: 'bi-book-fill', label: 'Education' },
  { class: 'bi-people-fill', label: 'Community' },
  { class: 'bi-calendar-event-fill', label: 'Event' },
  { class: 'bi-clipboard-data-fill', label: 'Application' },
  { class: 'bi-bank', label: 'University' },
  { class: 'bi-shield-check', label: 'Visa' },
  { class: 'bi-geo-alt-fill', label: 'Location' },
];

export default function NewServicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    shortDesc: '',
    image: '',
    color: '#2563eb',
    icon: '',
    location: '',
    address: '',
    href: '',
    tags: '',
    order: '0',
    isActive: true,
  });

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setUploadError('');
      setUploading(true);
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
        set('image', json.document.fileUrl);
      }
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(msg);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title) { setError('Please enter a title'); return; }
    setSaving(true);
    setError('');

    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        shortDesc: form.shortDesc,
        image: form.image,
        color: form.color,
        icon: form.icon,
        location: form.location,
        address: form.address,
        href: form.href,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        order: parseInt(form.order) || 0,
        isActive: form.isActive,
      }),
    });

    const json = await res.json();
    if (!res.ok) { setError(json.error || 'Failed to create'); setSaving(false); return; }
    router.push('/admin/services');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-700 transition-colors">←</button>
        <h1 className="font-display text-2xl font-bold text-slate-900">Add Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {(error || uploadError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {uploadError || error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-slate-900">Basic Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="e.g. International Admission Services"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description</label>
                  <input
                    value={form.shortDesc}
                    onChange={e => set('shortDesc', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="Brief summary for cards"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    rows={4}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Detailed description of the service..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-slate-900">Location & Links</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                    <input
                      value={form.location}
                      onChange={e => set('location', e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="e.g. China"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Order</label>
                    <input
                      type="number"
                      value={form.order}
                      onChange={e => set('order', e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                  <input
                    value={form.address}
                    onChange={e => set('address', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="e.g. No.1158, Ave.2, Qiantang Dist."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Link (URL)</label>
                  <input
                    value={form.href}
                    onChange={e => set('href', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="/services/admission-service"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags</label>
                  <input
                    value={form.tags}
                    onChange={e => set('tags', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="Admission, Support, China"
                  />
                  <p className="text-xs text-slate-400 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-slate-900">Media & Branding</h2>
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Image</label>
                <div className={`relative border-2 border-dashed rounded-xl transition-colors overflow-hidden ${form.image ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-blue-400'}`}>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="service-image"
                    onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files![0])}
                  />
                  <label htmlFor="service-image" className="cursor-pointer block">
                    {form.image ? (
                      <div className="relative aspect-video w-full">
                        <Image src={form.image} alt="Preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium">Click to change</span>
                        </div>
                      </div>
                    ) : uploading ? (
                      <div className="py-12 text-center">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-slate-500 text-sm">Uploading...</p>
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-slate-600 text-sm font-medium">Click to upload image</p>
                        <p className="text-slate-400 text-xs mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </label>
                </div>
                {form.image && (
                  <button
                    type="button"
                    onClick={() => set('image', '')}
                    className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove image
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Color</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={form.color}
                        onChange={e => set('color', e.target.value)}
                        className="w-12 h-12 rounded-xl border border-slate-200 cursor-pointer"
                      />
                      <input
                        value={form.color}
                        onChange={e => set('color', e.target.value)}
                        className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="#2563eb"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_COLORS.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => set('color', color)}
                          className={`w-6 h-6 rounded-md transition-transform hover:scale-110 ${form.color === color ? 'ring-2 ring-offset-2 ring-slate-400' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon</label>
                  <div className="space-y-2">
                    <input
                      value={form.icon}
                      onChange={e => set('icon', e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="bi-mortarboard-fill"
                    />
                    <div className="grid grid-cols-6 gap-1">
                      {ICONS.map(icon => (
                        <button
                          key={icon.class}
                          type="button"
                          onClick={() => set('icon', icon.class)}
                          className={`p-2 rounded-lg border transition-colors ${form.icon === icon.class ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-slate-200 hover:border-slate-300'}`}
                          title={icon.label}
                        >
                          <i className={`${icon.class} block text-sm`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="font-semibold text-slate-900">Display Settings</h2>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">Active Status</p>
                  <p className="text-sm text-slate-500">Show this service on the website</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={e => set('isActive', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/25"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Service'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}