'use client';
// =============================================================================
// app/dashboard/profile/ProfileForm.tsx
// =============================================================================
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  nationality?: string;
  dateOfBirth?: Date;
  passportNumber?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };
}

interface Props {
  user: UserData;
}

export function ProfileForm({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
    nationality: user.nationality || '',
    dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
    passportNumber: user.passportNumber || '',
    'address.street': user.address?.street || '',
    'address.city': user.address?.city || '',
    'address.country': user.address?.country || '',
    'address.postalCode': user.address?.postalCode || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          nationality: formData.nationality,
          dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
          passportNumber: formData.passportNumber,
          address: {
            street: formData['address.street'],
            city: formData['address.city'],
            country: formData['address.country'],
            postalCode: formData['address.postalCode'],
          },
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        router.refresh();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div className={`p-4 rounded-xl mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            value={user.email || ''}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
            disabled
          />
          <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Passport Number</label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="border-t border-slate-100 my-6"></div>

      <h5 className="font-semibold text-slate-900 mb-4">Address</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
          <input
            type="text"
            name="address.street"
            value={formData['address.street']}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
          <input
            type="text"
            name="address.city"
            value={formData['address.city']}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
          <input
            type="text"
            name="address.country"
            value={formData['address.country']}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Postal Code</label>
          <input
            type="text"
            name="address.postalCode"
            value={formData['address.postalCode']}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-rose-700 transition-all disabled:opacity-50" disabled={loading}>
          {loading ? (
            <span>Saving...</span>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
}
