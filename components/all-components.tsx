'use client';
// ============================================================
// components/ui/FileUpload.tsx
// ============================================================
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface FileUploadProps {
  applicationId: string;
  docType: string;
  label: string;
  accept?: string;
  onUploadComplete: (fileUrl: string, key: string) => void;
}

export function FileUpload({ applicationId, docType, label, accept, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [error, setError]         = useState('');
  const [done, setDone]           = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setUploading(true); setError(''); setProgress(0); setDone(false);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name, fileType: file.type,
          fileSize: file.size, applicationId, docType,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');

      const { presignedUrl, fileUrl, key } = json.data;

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => setProgress(Math.round((e.loaded / e.total) * 100));
        xhr.open('PUT', presignedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.onload  = () => (xhr.status === 200 ? resolve() : reject(new Error('S3 upload failed')));
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(file);
      });

      setDone(true);
      onUploadComplete(fileUrl, key);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }, [applicationId, docType, onUploadComplete]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
          ${done ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50'}`}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef} type="file" accept={accept} className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        {uploading ? (
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Uploading... {progress}%</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : done ? (
          <p className="text-green-600 font-medium">✓ Uploaded successfully</p>
        ) : (
          <div>
            <p className="text-blue-600 font-medium">Click to upload {label}</p>
            <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG, DOC — max 10MB</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

// ============================================================
// components/forms/ApplicationForm/index.tsx
// ============================================================
// useState is already imported at the top, useRouter from next/navigation

const STEPS = ['Personal Info', 'Education & Language', 'Documents', 'Review & Submit'];

export interface ApplicationData {
  personal:  Record<string, any>;
  education: any[];
  language:  Record<string, any>;
  documents: Array<{ type: string; url: string; key: string }>;
}

interface Props { programId: string; universityId: string; universityName: string; programName: string; }

export function ApplicationForm({ programId, universityId, universityName, programName }: Props) {
  const router  = useRouter();
  const [step, setStep]   = useState(1);
  const [saving, setSaving] = useState(false);
  const [appId, setAppId]   = useState<string | null>(null);
  const [data, setData]     = useState<ApplicationData>({
    personal: {}, education: [], language: {}, documents: [],
  });

  const save = async (patch: Partial<ApplicationData>, submit = false) => {
    setSaving(true);
    const merged = { ...data, ...patch };
    setData(merged);
    const res  = await fetch(appId ? `/api/applications/${appId}` : '/api/applications', {
      method:  appId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ programId, universityId, data: merged, submit, currentStep: step }),
    });
    const json = await res.json();
    if (!appId && json.data?._id) setAppId(json.data._id);
    setSaving(false);
    return json;
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Apply to {universityName}</h1>
        <p className="text-slate-500 mt-1">{programName}</p>
      </div>

      {/* Step bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((s, i) => (
            <span key={i} className={`text-xs font-medium ${i + 1 === step ? 'text-red-600' : i + 1 < step ? 'text-green-600' : 'text-slate-400'}`}>
              {i + 1 < step ? '✓ ' : `${i + 1}. `}{s}
            </span>
          ))}
        </div>
        <div className="h-2 bg-slate-200 rounded-full">
          <div className="h-2 bg-red-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step content */}
      {step === 1 && <Step1Personal initialData={data.personal} onNext={async (d) => { await save({ personal: d }); setStep(2); }} />}
      {step === 2 && <Step2Education initialData={data} onNext={async (d) => { await save(d); setStep(3); }} onBack={() => setStep(1)} />}
      {step === 3 && (
        <Step3Documents
          applicationId={appId}
          onNext={async (docs: any) => { await save({ documents: docs }); setStep(4); }}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <Step4Review
          data={data} universityName={universityName} programName={programName}
          saving={saving}
          onSubmit={async () => { await save({}, true); router.push('/student/dashboard/applications?submitted=1'); }}
          onBack={() => setStep(3)}
        />
      )}
    </div>
  );
}

// ── Step 1: Personal Info ──────────────────────────────────────────────────────
function Step1Personal({ initialData, onNext }: { initialData: any; onNext: (d: any) => void }) {
  const [form, setForm] = useState(initialData);
  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  const field = (label: string, key: string, type = 'text', required = false) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <input
        type={type} value={form[key] || ''} onChange={e => set(key, e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {field('First Name', 'firstName', 'text', true)}
        {field('Last Name', 'lastName', 'text', true)}
      </div>
      {field('Chinese Name (Optional)', 'chineseName')}
      {field('Email Address', 'email', 'email', true)}
      {field('Phone (with country code)', 'phone', 'tel', true)}
      {field('WhatsApp / WeChat / Telegram ID', 'contactId')}
      <div className="grid grid-cols-2 gap-4">
        {field('Date of Birth', 'dateOfBirth', 'date', true)}
        {field('Place of Birth', 'placeOfBirth')}
      </div>
      {field('Nationality', 'nationality', 'text', true)}
      {field('Passport Number', 'passportNumber')}
      {field('Passport Expiry Date', 'passportExpiry', 'date')}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
        <select value={form.gender || ''} onChange={e => set('gender', e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
          <option value="">Select gender</option>
          <option value="male">Male</option><option value="female">Female</option>
        </select>
      </div>
      {field('Hobbies & Interests', 'hobbies')}
      <div className="flex justify-end pt-4">
        <button onClick={() => onNext(form)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Save & Continue →
        </button>
      </div>
    </div>
  );
}

// ── Step 2: Education & Language ───────────────────────────────────────────────
function Step2Education({ initialData, onNext, onBack }: { initialData: any; onNext: (d: any) => void; onBack: () => void }) {
  const [education, setEducation] = useState<any[]>(initialData.education || [{}]);
  const [language, setLanguage]   = useState(initialData.language || {});
  const setLang = (k: string, v: any) => setLanguage((p: any) => ({ ...p, [k]: v }));

  const addEdu = () => setEducation(e => [...e, {}]);
  const setEdu = (i: number, k: string, v: any) => setEducation(e => e.map((row, j) => j === i ? { ...row, [k]: v } : row));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-800 mb-3">Education History</h3>
        {education.map((edu, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-4 mb-3 space-y-3">
            <p className="text-xs font-medium text-slate-500 uppercase">Institution {i + 1}</p>
            <input placeholder="School / College / University name" value={edu.schoolName || ''}
              onChange={e => setEdu(i, 'schoolName', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            <div className="grid grid-cols-3 gap-3">
              <select value={edu.major || ''} onChange={e => setEdu(i, 'major', e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option value="">Major</option>
                <option>Science</option><option>Business Studies</option><option>Arts</option>
              </select>
              <input type="month" placeholder="Start" value={edu.startDate || ''}
                onChange={e => setEdu(i, 'startDate', e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              <input type="month" placeholder="End" value={edu.endDate || ''}
                onChange={e => setEdu(i, 'endDate', e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="GPA" value={edu.gpa || ''} onChange={e => setEdu(i, 'gpa', e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Country" value={edu.country || ''} onChange={e => setEdu(i, 'country', e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        ))}
        <button onClick={addEdu} className="text-blue-600 text-sm font-medium">+ Add Another Institution</button>
      </div>

      <div>
        <h3 className="font-semibold text-slate-800 mb-3">Language Proficiency</h3>
        <div className="space-y-3">
          {[
            { label: 'English Level', key: 'englishLevel', opts: ['Poor','Fair','Good','Excellent'] },
            { label: 'English Certificate', key: 'englishCert', opts: ['IELTS','TOEFL','Duolingo','Other'] },
            { label: 'Chinese Level', key: 'chineseLevel', opts: ['None','Poor','Fair','Good','Excellent'] },
            { label: 'HSK Level', key: 'hskLevel', opts: ['None','HSK 1','HSK 2','HSK 3','HSK 4','HSK 5','HSK 6'] },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
              <select value={language[key] || ''} onChange={e => setLang(key, e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option value="">Select {label}</option>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">English Score</label>
            <input value={language.englishScore || ''} onChange={e => setLang('englishScore', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="e.g. 6.5" />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="border border-slate-200 px-6 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50">← Back</button>
        <button onClick={() => onNext({ education, language })}
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save & Continue →</button>
      </div>
    </div>
  );
}

// ── Step 3: Documents ─────────────────────────────────────────────────────────
function Step3Documents({ applicationId, onNext, onBack }: any) {
  const [docs, setDocs] = useState<Array<{ type: string; url: string; key: string }>>([]);
  const addDoc = (type: string, url: string, key: string) =>
    setDocs(d => [...d.filter(x => x.type !== type), { type, url, key }]);

  const REQUIRED_DOCS = [
    { type: 'passport',      label: 'Passport / National ID' },
    { type: 'academic_cert', label: 'Highest Academic Certificate' },
    { type: 'transcript',    label: 'Academic Transcript' },
    { type: 'photo',         label: 'Personal Photograph' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">Upload your documents. Accepted: PDF, JPG, PNG, DOC — Max 10MB each.</p>
      {REQUIRED_DOCS.map(({ type, label }) => (
        <FileUpload key={type} applicationId={applicationId || 'temp'} docType={type} label={label}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onUploadComplete={(url, key) => addDoc(type, url, key)} />
      ))}
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="border border-slate-200 px-6 py-2 rounded-lg text-sm text-slate-700">← Back</button>
        <button onClick={() => onNext(docs)}
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Review Application →
        </button>
      </div>
    </div>
  );
}

// ── Step 4: Review & Submit ───────────────────────────────────────────────────
function Step4Review({ data, universityName, programName, saving, onSubmit, onBack }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900">{universityName}</h3>
        <p className="text-blue-700 text-sm">{programName}</p>
      </div>

      <div className="border border-slate-200 rounded-xl divide-y divide-slate-100">
        {[
          { label: 'Name', value: `${data.personal.firstName || ''} ${data.personal.lastName || ''}` },
          { label: 'Email', value: data.personal.email },
          { label: 'Nationality', value: data.personal.nationality },
          { label: 'English Level', value: data.language.englishLevel },
          { label: 'Documents', value: `${data.documents?.length || 0} uploaded` },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between px-4 py-3 text-sm">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-900">{value || '—'}</span>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-amber-800 text-sm">By submitting, you confirm all information is accurate. You cannot edit after submission.</p>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="border border-slate-200 px-6 py-2 rounded-lg text-sm text-slate-700">← Back</button>
        <button onClick={onSubmit} disabled={saving}
          className="bg-green-600 text-white px-8 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
          {saving ? 'Submitting...' : '✓ Submit Application'}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// components/dashboard/ApplicationStatusBadge.tsx
// ============================================================
const STATUS_STYLES: Record<string, string> = {
  draft:        'bg-slate-100 text-slate-600',
  submitted:    'bg-blue-100 text-blue-700',
  under_review: 'bg-amber-100 text-amber-700',
  approved:     'bg-green-100 text-green-700',
  rejected:     'bg-red-100 text-red-700',
};
const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft', submitted: 'Submitted',
  under_review: 'Under Review', approved: 'Approved', rejected: 'Rejected',
};

export function ApplicationStatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

// ============================================================
// components/dashboard/StatsCard.tsx
// ============================================================
interface StatsCardProps { label: string; value: string | number; icon: string; color: string; }
export function StatsCard({ label, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
