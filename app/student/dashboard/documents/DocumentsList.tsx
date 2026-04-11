'use client';
// =============================================================================
// app/dashboard/documents/DocumentsList.tsx
// =============================================================================
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { DOC_TYPES } from './docTypes';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage(null);
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('docType', selectedType);

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Document uploaded successfully!' });
        setSelectedFile(null);
        fetchDocuments();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to upload document' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setUploading(false);
      resetFileInput();
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
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-slate-900">My Documents</h2>
      </div>

      {message && (
        <div className={`p-3 rounded-xl mb-6 text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-slate-50">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <select
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none bg-white"
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
          <div className="flex-1 min-w-[200px]">
            <button
              type="button"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none bg-white text-left text-slate-600 hover:bg-slate-50"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {selectedFile ? selectedFile.name : 'Choose File'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
          <button
            type="button"
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-rose-700 transition-all disabled:opacity-50"
            disabled={uploading || !selectedFile}
            onClick={handleUploadClick}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">📁</div>
          <h3 className="font-semibold text-slate-900 mb-2">No documents yet</h3>
          <p className="text-slate-500">Upload your first document to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div key={doc._id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                  {DOC_TYPES.find(d => d.value === doc.docType)?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-slate-900 truncate">{getDocTypeLabel(doc.docType)}</h3>
                    <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      doc.status === 'verified' ? 'bg-green-100 text-green-700' :
                      doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 truncate mb-2">
                    {doc.originalFilename || 'Document'}
                    <span className="text-slate-400 ml-2">• {formatFileSize(doc.fileSize)}</span>
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                      View
                    </a>
                    <button
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(doc._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
