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
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
          {message.text}
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={user.email || ''}
            className="form-control"
            disabled
          />
          <small className="text-muted">Email cannot be changed</small>
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Passport Number</label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <hr className="my-4" />

      <h5 className="fw-semibold mb-3">Address</h5>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Street Address</label>
          <input
            type="text"
            name="address.street"
            value={formData['address.street']}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            name="address.city"
            value={formData['address.city']}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Country</label>
          <input
            type="text"
            name="address.country"
            value={formData['address.country']}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            name="address.postalCode"
            value={formData['address.postalCode']}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
}
