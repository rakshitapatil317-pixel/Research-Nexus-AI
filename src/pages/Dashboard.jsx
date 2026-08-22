import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { paperService } from '../services/api';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { 
  FileText, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  Upload,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
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

    fetchDashboardData();
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

  const totalPapers = papers.length;
  const summarizedPapersCount = papers.filter(isPaperSummarized).length;
  const recentPapers = papers.slice(0, 4);

  // SVG Chart mock dataset based on total papers uploaded
  const chartPoints = [
    { label: 'Jan', val: 0 },
    { label: 'Feb', val: 2 },
    { label: 'Mar', val: 1 },
    { label: 'Apr', val: Math.min(8, Math.max(1, totalPapers - 3)) },
    { label: 'May', val: Math.min(12, Math.max(2, totalPapers - 1)) },
    { label: 'Jun', val: Math.max(totalPapers, 3) }
  ];

  // Compute SVG line points
  const maxVal = Math.max(...chartPoints.map(p => p.val), 5);
  const height = 140;
  const width = 500;
  const padding = 20;
  
  const pointsString = chartPoints.map((pt, idx) => {
    const x = padding + (idx * (width - padding * 2) / (chartPoints.length - 1));
    const y = height - padding - (pt.val * (height - padding * 2) / maxVal);
    return `${x},${y}`;
  }).join(' ');

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner spinner-large" />
      </div>
    );
  }

  return (
    <div className="dashboard-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Research Dashboard</h1>
          <p>Analyze, extract, and summarize academic articles with AI power.</p>
        </div>
        <Button variant="accent" onClick={() => navigate('/upload')}>
          <Upload size={18} />
          <span>Upload Paper</span>
        </Button>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', color: '#f87171' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* Metric 1 */}
        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
            <FileText size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Papers</span>
            <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{totalPapers}</span>
          </div>
        </GlassCard>

        {/* Metric 2 */}
        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
            <Sparkles size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Summarized Papers</span>
            <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{summarizedPapersCount}</span>
          </div>
        </GlassCard>

        {/* Metric 3 */}
        <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
            <Clock size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent Activity</span>
            <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{recentPapers.length}</span>
          </div>
        </GlassCard>
      </div>

      {/* Main dashboard content sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px', alignItems: 'start' }}>
        {/* Analytics line graph */}
        {totalPapers > 0 ? (
          <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={20} style={{ color: '#06b6d4' }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Activity & Upload Trends</h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Monthly Frequency <ArrowUpRight size={14} />
              </span>
            </div>
            {/* Custom SVG Line Chart */}
            <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
              <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Guide Lines */}
                <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* Filled Glow Area */}
                <path
                  d={`M ${padding},${height - padding} L ${pointsString} L ${width - padding},${height - padding} Z`}
                  fill="url(#chartGlow)"
                />

                {/* Main Spark Line */}
                <polyline
                  fill="none"
                  stroke="url(#accent-gradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsString}
                  style={{ filter: 'drop-shadow(0px 4px 10px rgba(6, 182, 212, 0.4))' }}
                />

                {/* Interactive Points */}
                {chartPoints.map((pt, idx) => {
                  const x = padding + (idx * (width - padding * 2) / (chartPoints.length - 1));
                  const y = height - padding - (pt.val * (height - padding * 2) / maxVal);
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={x} y={height - 2} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-body)">
                        {pt.label}
                      </text>
                      <text x={x} y={y - 8} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontFamily="var(--font-heading)" fontWeight="600">
                        {pt.val}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </GlassCard>
        ) : (
          <GlassCard style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px' }}>
            <Sparkles size={40} style={{ color: 'var(--accent)', marginBottom: '16px', animation: 'spin 10s linear infinite' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Your AI Library is Empty</h3>
            <p style={{ fontSize: '0.9rem', maxWidth: '300px', marginBottom: '20px' }}>Upload your first research PDF to generate smart AI summaries and keyword extractions.</p>
            <Button variant="primary" onClick={() => navigate('/upload')}>
              <Upload size={16} />
              <span>Get Started</span>
            </Button>
          </GlassCard>
        )}

        {/* Recent Activity Card */}
        <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} style={{ color: '#8b5cf6' }} />
            <span>Recent Activity</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentPapers.length > 0 ? (
              recentPapers.map((paper) => (
                <div key={paper.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ minWidth: 0, paddingRight: '8px' }}>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{paper.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>By {paper.author}</span>
                  </div>
                  <Link 
                    to={`/summary?id=${paper.id}`} 
                    state={{ paper }}
                    className="btn btn-secondary" 
                    style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px', whiteSpace: 'nowrap', textDecoration: 'none' }}
                  >
                    View
                  </Link>
                </div>
              ))
            ) : (
              <div style={{ textSelf: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
                No recent files uploaded.
              </div>
            )}
          </div>
          {totalPapers > 4 && (
            <Link to="/papers" style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              View All Research Papers →
            </Link>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
