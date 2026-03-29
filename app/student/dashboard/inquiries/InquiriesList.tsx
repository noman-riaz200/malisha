'use client';
// =============================================================================
// app/dashboard/inquiries/InquiriesList.tsx
// =============================================================================
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Inquiry {
  _id: string;
  source: string;
  name: string;
  email: string;
  phone?: string;
  reason?: string;
  interestedMajor?: string;
  interestedDegree?: string;
  status: string;
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-primary',
  contacted: 'bg-info',
  converted: 'bg-success',
  closed: 'bg-secondary',
};

export function InquiriesList() {
  const { data: session } = useSession();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    reason: '',
    interestedMajor: '',
    interestedDegree: '',
  });

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries || []);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'dashboard',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Inquiry submitted successfully! We will get back to you soon.' });
        setShowForm(false);
        setFormData({
          name: session?.user?.name || '',
          email: session?.user?.email || '',
          phone: '',
          reason: '',
          interestedMajor: '',
          interestedDegree: '',
        });
        fetchInquiries();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to submit inquiry' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {/* New Inquiry Form */}
      <div className="col-lg-4">
        <div className="bg-white rounded-4 p-4" style={{ border: '1px solid #e2e8f0' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-semibold mb-0" style={{ color: '#1e293b' }}>New Inquiry</h2>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ New'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit}>
              {message && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
                  {message.text}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Reason for Inquiry</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                  required
                  placeholder="Describe your question or concern..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Interested Major</label>
                <input
                  type="text"
                  name="interestedMajor"
                  value={formData.interestedMajor}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Interested Degree</label>
                <select
                  name="interestedDegree"
                  value={formData.interestedDegree}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select degree</option>
                  <option value="bachelor">Bachelor</option>
                  <option value="master">Master</option>
                  <option value="phd">PhD</option>
                  <option value="foundation">Foundation</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit Inquiry
              </button>
            </form>
          )}

          {!showForm && (
            <div className="text-center py-4">
              <p style={{ color: '#64748b' }}>Have a question? Submit a new inquiry.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                Ask a Question
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="col-lg-8">
        <div className="bg-white rounded-4" style={{ border: '1px solid #e2e8f0' }}>
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
            <h2 className="fw-semibold mb-0" style={{ color: '#1e293b' }}>My Inquiries</h2>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-5 text-center">
              <div className="rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '5rem', height: '5rem', backgroundColor: '#f1f5f9' }}>
                <span style={{ fontSize: '1.5rem' }}>💬</span>
              </div>
              <h3 className="fw-semibold mb-2" style={{ color: '#1e293b' }}>No inquiries yet</h3>
              <p className="mb-0" style={{ color: '#64748b' }}>Submit your first inquiry to get help.</p>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {inquiries.map((inquiry) => (
                <div key={inquiry._id} className="list-group-item p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span className={`badge ${STATUS_COLORS[inquiry.status]} mb-2`}>
                        {inquiry.status}
                      </span>
                      <h5 className="fw-semibold mb-1" style={{ color: '#1e293b' }}>
                        {inquiry.reason || 'General Inquiry'}
                      </h5>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="mb-2" style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    {inquiry.reason}
                  </p>

                  {inquiry.adminReply && (
                    <div className="mt-3 p-3 rounded" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                      <p className="mb-1 fw-semibold" style={{ color: '#166534', fontSize: '0.875rem' }}>
                        <i className="bi bi-reply me-1"></i>Admin Response:
                      </p>
                      <p className="mb-0" style={{ color: '#166534' }}>{inquiry.adminReply}</p>
                      {inquiry.repliedAt && (
                        <small style={{ color: '#64748b' }}>
                          Replied on {new Date(inquiry.repliedAt).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
