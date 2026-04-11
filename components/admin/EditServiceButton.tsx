"use client";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string;
  image: string;
  color: string;
  icon: string;
  location: string;
  address: string;
  href: string;
  tags: string[];
  isActive: boolean;
  order: number;
}

export function EditServiceButton({ id, name }: { id: string; name: string }) {
  const [editMode, setEditMode] = useState(false);
  const [saving, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchService = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/services/${id}`);
      if (res.ok) {
        const json = await res.json();
        setService(json.data);
      } else {
        setError("Failed to load service data");
      }
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
      setEditMode(true);
    }
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    shortDesc: "",
    image: "",
    color: "",
    icon: "",
    location: "",
    address: "",
    href: "",
    tags: "",
    isActive: false,
    order: 0,
  });

  const set = (k: keyof typeof form, v: any) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (service) {
      setForm({
        title: service.title || "",
        description: service.description || "",
        shortDesc: service.shortDesc || "",
        image: service.image || "",
        color: service.color || "",
        icon: service.icon || "",
        location: service.location || "",
        address: service.address || "",
        href: service.href || "",
        tags: service.tags?.join(", ") || "",
        isActive: service.isActive || false,
        order: service.order || 0,
      });
    }
  }, [service]);

  const handleSubmit = async () => {
    const updateData = {
      title: form.title,
      description: form.description,
      shortDesc: form.shortDesc,
      image: form.image,
      color: form.color,
      icon: form.icon,
      location: form.location,
      address: form.address,
      href: form.href,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      isActive: form.isActive,
      order: parseInt(form.order as any) || 0,
    };

    const res = await fetch(`/api/services/${id}`, {
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
        onClick={fetchService}
        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Edit
      </button>

      {editMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl max-h-[90vh] w-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-slate-900">Edit Service</h2>
                <button
                  onClick={() => setEditMode(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Basic info */}
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg">Basic Information</h3>
                <div>
                  <label className={labelClass}>Title *</label>
                  <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Short Description</label>
                  <input value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} className={inputClass} placeholder="Brief summary for cards" />
                </div>
                <div>
                  <label className={labelClass}>Full Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg">Image</h3>
                <div>
                  <label className={labelClass}>Image URL</label>
                  <input value={form.image} onChange={(e) => set("image", e.target.value)} className={inputClass} placeholder="https://..." />
                  {form.image && (
                    <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden">
                      <Image src={form.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Color (hex)</label>
                    <input value={form.color} onChange={(e) => set("color", e.target.value)} className={inputClass} placeholder="#dc2626" />
                  </div>
                  <div>
                    <label className={labelClass}>Icon (Bootstrap class)</label>
                    <input value={form.icon} onChange={(e) => set("icon", e.target.value)} className={inputClass} placeholder="bi-mortarboard-fill" />
                  </div>
                </div>
              </div>

              {/* Additional info */}
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg">Additional Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Location</label>
                    <input value={form.location} onChange={(e) => set("location", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Address</label>
                    <input value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Link (href)</label>
                  <input value={form.href} onChange={(e) => set("href", e.target.value)} className={inputClass} placeholder="/services/admission-service" />
                </div>
                <div>
                  <label className={labelClass}>Tags (comma separated)</label>
                  <input value={form.tags} onChange={(e) => set("tags", e.target.value)} className={inputClass} placeholder="Admission, Support" />
                </div>
              </div>

              {/* Order and Status */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 text-lg mb-4">Display Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Display Order</label>
                    <input 
                      type="number" 
                      value={form.order} 
                      onChange={(e) => set("order", parseInt(e.target.value) || 0)} 
                      className={inputClass} 
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) => set("isActive", e.target.checked)}
                        className="w-5 h-5 rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm font-semibold text-slate-700">Active</span>
                    </label>
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