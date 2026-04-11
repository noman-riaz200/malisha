"use client";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface University {
  _id: string;
  name: string;
  slug: string;
  description: string;
  worldRank: string;
  website: string;
  logo: string;
  bannerImage: string;
  location: {
    city: string;
    province: string;
    country?: string;
  };
  studentsEnrolled: number;
  badges: {
    is211: boolean;
    is985: boolean;
    isDoubleFirstClass: boolean;
    cscaRequired: boolean;
  };
  intakes: Array<{
    season: "march" | "september";
    year: number;
    deadline: string;
  }>;
  isActive: boolean;
}

export function EditUniversityButton({ id, name }: { id: string; name: string }) {
  const [editMode, setEditMode] = useState(false);
  const [saving, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchUniversity = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/universities/${id}`);
      if (res.ok) {
        const data = await res.json();
        setUniversity(data);
      } else {
        setError("Failed to load university data");
      }
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
      setEditMode(true);
    }
  };

  const [form, setForm] = useState({
    name: "",
    description: "",
    worldRank: "",
    website: "",
    city: "",
    province: "",
    studentsEnrolled: "",
    is211: false,
    is985: false,
    isDoubleFirstClass: false,
    cscaRequired: false,
    marchDeadline: "",
    septemberDeadline: "",
    isActive: false,
  });

  const set = (k: keyof typeof form, v: any) => setForm((p) => ({ ...p, [k]: v }));

  // Init form from university data
  useEffect(() => {
    if (university) {
      setForm({
        name: university.name || "",
        description: university.description || "",
        worldRank: university.worldRank || "",
        website: university.website || "",
        city: university.location?.city || "",
        province: university.location?.province || "",
        studentsEnrolled: university.studentsEnrolled?.toString() || "",
        is211: university.badges?.is211 || false,
        is985: university.badges?.is985 || false,
        isDoubleFirstClass: university.badges?.isDoubleFirstClass || false,
        cscaRequired: university.badges?.cscaRequired || false,
        marchDeadline: university.intakes?.find((i: any) => i.season === "march")?.deadline || "",
        septemberDeadline: university.intakes?.find((i: any) => i.season === "september")?.deadline || "",
        isActive: university.isActive || false,
      });
    }
  }, [university]);

  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (university) {
      setLogoUrl(university.logo || "");
      setBannerUrl(university.bannerImage || "");
    }
  }, [university]);

  const uploadImage = async (file: File, setUrl: (u: string) => void) => {
    try {
      setUploadError("");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("docType", "photo");
      const res = await fetch("/api/documents/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Upload failed");
      }
      const json = await res.json();
      if (json.success) {
        setUrl(json.document.fileUrl);
      }
    } catch (err: any) {
      setUploadError(err.message);
    }
  };

  const handleSubmit = async () => {
    const intakes = [];
    if (form.marchDeadline) intakes.push({ season: "march" as const, year: 2026, deadline: form.marchDeadline });
    if (form.septemberDeadline) intakes.push({ season: "september" as const, year: 2026, deadline: form.septemberDeadline });

    const updateData: Record<string, any> = {
      name: form.name,
      description: form.description,
      worldRank: form.worldRank,
      website: form.website,
      location: { city: form.city, province: form.province, country: "China" },
      studentsEnrolled: parseInt(form.studentsEnrolled) || 0,
      badges: {
        is211: form.is211,
        is985: form.is985,
        isDoubleFirstClass: form.isDoubleFirstClass,
        cscaRequired: form.cscaRequired,
      },
      intakes,
      isActive: form.isActive,
    };

    if (logoUrl) updateData.logo = logoUrl;
    if (bannerUrl) updateData.bannerImage = bannerUrl;

    const res = await fetch(`/api/universities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (res.ok) {
      setEditMode(false);
      startTransition(() => router.refresh());
    } else {
      const json = await res.json();
      setError(json.error || "Failed to save");
    }
  };

  const inputClass = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  if (loading) {
    return <span className="text-xs text-blue-500">Loading...</span>;
  }

  return (
    <>
      <button
        onClick={fetchUniversity}
        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Edit
      </button>

      {editMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] w-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-slate-900">Edit {name}</h2>
                <button
                  onClick={() => setEditMode(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {(error || uploadError) && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                  {uploadError || error}
                </div>
              )}

              {/* Basic info */}
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg">Basic Information</h3>
                <div>
                  <label className={labelClass}>Name</label>
                  <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>World Rank</label>
                    <input value={form.worldRank} onChange={(e) => set("worldRank", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Website</label>
                    <input type="url" value={form.website} onChange={(e) => set("website", e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Location & Students */}
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg">Location & Enrollment</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>City</label>
                    <input value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Province</label>
                    <input value={form.province} onChange={(e) => set("province", e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Students Enrolled</label>
                  <input
                    type="number"
                    value={form.studentsEnrolled}
                    onChange={(e) => set("studentsEnrolled", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 text-lg mb-4">Badges</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "is211", label: "211 Project" },
                    { key: "is985", label: "985 Project" },
                    { key: "isDoubleFirstClass", label: "Double First Class" },
                    { key: "cscaRequired", label: "CSCA Required" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-white">
                      <input
                        type="checkbox"
                        checked={form[key as keyof typeof form] as boolean}
                        onChange={(e) => set(key as keyof typeof form, e.target.checked)}
                        className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="bg-slate-50 rounded-xl p-6">
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-white">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => set("isActive", e.target.checked)}
                    className="w-5 h-5 rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm font-semibold text-slate-700">Active Status</span>
                </label>
              </div>

              {/* Intakes */}
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg">Intake Deadlines (2026)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>March 2026</label>
                    <input type="date" value={form.marchDeadline} onChange={(e) => set("marchDeadline", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>September 2026</label>
                    <input type="date" value={form.septemberDeadline} onChange={(e) => set("septemberDeadline", e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Images - Simplified for edit, add replace upload */}
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg">Images</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Logo</label>
                    <div className="space-y-2">
                      {logoUrl && (
                        <div className="relative inline-block">
                          <Image src={logoUrl} alt="Logo" width={80} height={80} className="object-contain rounded-lg border" />
                          <p className="text-xs text-green-600">Current</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="logo-edit"
                        onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files![0], setLogoUrl)}
                      />
                      <label htmlFor="logo-edit" className="text-blue-600 text-sm font-medium cursor-pointer underline">
                        Replace Logo
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Banner</label>
                    <div className="space-y-2">
                      {bannerUrl && (
                        <div className="relative">
                          <Image src={bannerUrl} alt="Banner" width={240} height={80} className="object-cover rounded-lg border" />
                          <p className="text-xs text-green-600">Current</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="banner-edit"
                        onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files![0], setBannerUrl)}
                      />
                      <label htmlFor="banner-edit" className="text-blue-600 text-sm font-medium cursor-pointer underline">
                        Replace Banner
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

