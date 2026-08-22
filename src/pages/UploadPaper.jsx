import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { paperService } from '../services/api';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';

const UploadPaper = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setError('Only PDF documents are supported for upload');
      setFile(null);
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) { // 25MB limit
      setError('Document file size must be smaller than 25MB');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    // Auto fill title from filename if title is empty
    if (!title) {
      const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
      // Clean up underscores and dashes for nicer appearance
      setTitle(nameWithoutExt.replace(/[_-]/g, ' '));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !author.trim() || !file) {
      setError('Please fill in all details and select a PDF file');
      return;
    }

    setLoading(true);

    try {
      const userId = user?.id || 1; // fallback to 1 if user ID is not available
      const data = await paperService.upload(userId, title, author, file);
      
      if (data.success) {
        setSuccess('Research paper uploaded successfully!');
        setTitle('');
        setAuthor('');
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        setTimeout(() => {
          navigate('/papers');
        }, 1500);
      } else {
        setError(data.message || data.error || 'Failed to upload paper');
      }
    } catch (err) {
      setError('Network communication failed, please check connection or file size limit');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Add Research Paper</h1>
        <p>Introduce a new PDF document into your secure storage to generate smart metrics.</p>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#f87171' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '12px', color: '#4ade80' }}>
          <CheckCircle2 size={20} />
          <span>{success}</span>
        </div>
      )}

      <GlassCard>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Input
              label="Paper Title"
              id="title"
              placeholder="e.g. Attention Is All You Need"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              label="Author Name"
              id="author"
              placeholder="e.g. Ashish Vaswani"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          {/* Drag and Drop Zone */}
          <div className="input-group">
            <label className="input-label">PDF File Document</label>
            <div
              className={`dropzone ${isDragOver ? 'dragover' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current.click()}
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                cursor: file ? 'default' : 'pointer',
                background: isDragOver ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                transition: 'all 0.25s ease',
                position: 'relative'
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                style={{ display: 'none' }}
              />

              {!file ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <UploadCloud size={40} style={{ color: 'var(--accent)', marginBottom: '4px' }} />
                  <div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Choose a file</span> or drag & drop it here
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supported format: PDF (up to 25MB)</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', minWidth: 0 }}>
                    <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', borderRadius: '6px' }}>
                      <FileText size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '0.95rem' }}>{file.name}</p>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                    aria-label="Remove File"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Button variant="secondary" onClick={() => navigate('/dashboard')} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              Upload Document
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default UploadPaper;
