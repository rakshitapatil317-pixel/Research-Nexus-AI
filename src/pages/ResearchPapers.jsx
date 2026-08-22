import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paperService } from '../services/api';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Search, FileText, Sparkles, BookOpen, AlertCircle, Calendar, ArrowRight } from 'lucide-react';

const ResearchPapers = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const data = await paperService.getAll();
        if (data.success && data.papers) {
          setPapers(data.papers);
        } else {
          setError('Failed to fetch research paper details');
        }
      } catch (err) {
        setError('Error establishing connection with server APIs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  // Check if a paper has a summary either in the database response or cached in local storage
  const isPaperSummarized = (paper) => {
    if (paper.summary && paper.summary.trim() !== '') {
      return true;
    }
    const cachedItem = localStorage.getItem(`nexus_cache_paper_${paper.id}`);
    if (cachedItem) {
      try {
        const parsed = JSON.parse(cachedItem);
        if (parsed.summary && parsed.summary.trim() !== '') {
          return true;
        }
      } catch (e) {}
    }
    return false;
  };

  // Filter papers based on search query (matches title, author, or keywords)
  const filteredPapers = papers.filter((paper) => {
    const term = searchTerm.toLowerCase();
    const cachedKeywords = (() => {
      const cachedItem = localStorage.getItem(`nexus_cache_paper_${paper.id}`);
      if (cachedItem) {
        try {
          const parsed = JSON.parse(cachedItem);
          return parsed.keywords || '';
        } catch (e) {}
      }
      return '';
    })();
    return (
      paper.title.toLowerCase().includes(term) ||
      paper.author.toLowerCase().includes(term) ||
      (paper.keywords && paper.keywords.toLowerCase().includes(term)) ||
      cachedKeywords.toLowerCase().includes(term)
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewSummary = (paper) => {
    navigate(`/summary?id=${paper.id}`, { state: { paper } });
  };

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner spinner-large" />
      </div>
    );
  }

  return (
    <div className="papers-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Research Library</h1>
          <p>Browse, explore, and analyze your uploaded files.</p>
        </div>
        <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Total Items: <strong style={{ color: 'var(--text-primary)' }}>{papers.length}</strong>
        </div>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#f87171' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Search Bar Widget */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search 
            size={20} 
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
          />
          <input
            type="text"
            className="input-field"
            placeholder="Search papers by title, author, or tag keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '48px', margin: 0 }}
          />
        </div>
      </div>

      {/* Papers Table Display */}
      {filteredPapers.length > 0 ? (
        <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Paper Info</th>
                  <th>Author</th>
                  <th>Upload Date</th>
                  <th>AI Insights</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPapers.map((paper) => {
                  const hasSummary = isPaperSummarized(paper);
                  return (
                    <tr key={paper.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', borderRadius: '8px' }}>
                            <FileText size={20} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '300px' }}>
                              {paper.title}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              PDF Document
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          {paper.author}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                          <span>{formatDate(paper.created_at)}</span>
                        </div>
                      </td>
                      <td>
                        {hasSummary ? (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', color: '#06b6d4', fontSize: '0.8rem' }}>
                            <Sparkles size={12} />
                            <span>Summarized</span>
                          </div>
                        ) : (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            <span>Pending Analysis</span>
                          </div>
                        )}
                      </td>
                      <td>
                        <Button 
                          variant="secondary" 
                          onClick={() => handleViewSummary(paper)}
                          style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}
                        >
                          <span>View Insights</span>
                          <ArrowRight size={14} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      ) : (
        /* Empty States */
        <GlassCard style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px' }}>
          <BookOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          {papers.length > 0 ? (
            <>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No Match Found</h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '360px', marginBottom: '20px' }}>
                We couldn't find any results matching "{searchTerm}". Check the spelling or try searching another title.
              </p>
              <Button variant="secondary" onClick={() => setSearchTerm('')}>
                Reset Search Filters
              </Button>
            </>
          ) : (
            <>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No Documents in Library</h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '360px', marginBottom: '20px' }}>
                You have not uploaded any research papers yet. Upload documents to construct your AI-assisted workspace.
              </p>
              <Button variant="primary" onClick={() => navigate('/upload')}>
                Upload Paper
              </Button>
            </>
          )}
        </GlassCard>
      )}
    </div>
  );
};

export default ResearchPapers;
