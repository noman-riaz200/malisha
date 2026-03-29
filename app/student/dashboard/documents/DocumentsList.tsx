'use client';
// =============================================================================
// app/dashboard/documents/DocumentsList.tsx
// =============================================================================
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Document {
  _id: string;
  docType: string;
  fileUrl: string;
  originalFilename?: string;
  mimeType?: string;
  fileSize?: number;
  status: string;
  createdAt: string;
}

const DOC_TYPES = [
  { value: 'passport', label: 'Passport', icon: '📘' },
  { value: 'academic_cert', label: 'Academic Certificate', icon: '🎓' },
  { value: 'transcript', label: 'Transcript', icon: '📜' },
  { value: 'photo', label: 'Photo', icon: '📷' },
  { value: 'english_cert', label: 'English Certificate', icon: '📝' },
  { value: 'other', label: 'Other', icon: '📄' },
];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-warning',
  verified: 'bg-success',
  rejected: 'bg-danger',
};

export function DocumentsList() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState('passport');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', selectedType);

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Document uploaded successfully!' });
        fetchDocuments();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to upload document' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const response = await fetch(`/api/documents/${docId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Document deleted successfully!' });
        fetchDocuments();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete document' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getDocTypeLabel = (type: string) => {
    return DOC_TYPES.find(d => d.value === type)?.label || type;
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
      {/* Upload Section */}
      <div className="col-lg-4">
        <div className="bg-white rounded-4 p-4" style={{ border: '1px solid #e2e8f0' }}>
          <h2 className="fw-semibold mb-4" style={{ color: '#1e293b' }}>Upload Document</h2>
          
          {message && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
              {message.text}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Document Type</label>
            <select
              className="form-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {DOC_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">File</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <small className="text-muted">Max size: 10MB. Supported: PDF, JPG, PNG, DOC</small>
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={uploading}
            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
          >
            {uploading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Uploading...
              </>
            ) : (
              <>
                <i className="bi bi-cloud-upload me-2"></i>
                Upload Document
              </>
            )}
          </button>
        </div>

        {/* Document Requirements */}
        <div className="bg-white rounded-4 p-4 mt-4" style={{ border: '1px solid #e2e8f0' }}>
          <h2 className="fw-semibold mb-4" style={{ color: '#1e293b' }}>Required Documents</h2>
          <ul className="list-unstyled mb-0">
            {DOC_TYPES.map(type => (
              <li key={type.value} className="d-flex align-items-center gap-2 mb-2">
                <span>{type.icon}</span>
                <span style={{ color: '#64748b' }}>{type.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Documents List */}
      <div className="col-lg-8">
        <div className="bg-white rounded-4" style={{ border: '1px solid #e2e8f0' }}>
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
            <h2 className="fw-semibold mb-0" style={{ color: '#1e293b' }}>My Documents</h2>
          </div>

          {documents.length === 0 ? (
            <div className="p-5 text-center">
              <div className="rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '5rem', height: '5rem', backgroundColor: '#f1f5f9' }}>
                <span style={{ fontSize: '1.5rem' }}>📁</span>
              </div>
              <h3 className="fw-semibold mb-2" style={{ color: '#1e293b' }}>No documents yet</h3>
              <p className="mb-0" style={{ color: '#64748b' }}>Upload your first document to get started.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th className="px-4 py-3" style={{ color: '#64748b', fontWeight: 600 }}>Type</th>
                    <th className="px-4 py-3" style={{ color: '#64748b', fontWeight: 600 }}>File</th>
                    <th className="px-4 py-3" style={{ color: '#64748b', fontWeight: 600 }}>Size</th>
                    <th className="px-4 py-3" style={{ color: '#64748b', fontWeight: 600 }}>Status</th>
                    <th className="px-4 py-3" style={{ color: '#64748b', fontWeight: 600 }}>Date</th>
                    <th className="px-4 py-3" style={{ color: '#64748b', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc._id}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-2">
                          <span>{DOC_TYPES.find(d => d.value === doc.docType)?.icon}</span>
                          <span>{getDocTypeLabel(doc.docType)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                          {doc.originalFilename || 'View File'}
                        </a>
                      </td>
                      <td className="px-4 py-3" style={{ color: '#64748b' }}>
                        {formatFileSize(doc.fileSize)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${STATUS_COLORS[doc.status] || 'bg-secondary'}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ color: '#64748b' }}>
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(doc._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
