import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { 
  Atom, 
  ArrowRight, 
  UploadCloud, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  Compass, 
  Cpu, 
  Database, 
  Brain, 
  Server, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  LayoutDashboard,
  Target
} from 'lucide-react';

const Home = () => {
  const features = [
    { title: 'Research Paper Upload', desc: 'Upload and organize academic papers securely.', icon: UploadCloud, color: 'var(--accent)' },
    { title: 'AI Summarization', desc: 'Generate concise and meaningful summaries from lengthy research papers.', icon: Sparkles, color: 'var(--accent-purple)' },
    { title: 'Research Insights', desc: 'Extract important concepts, methodologies, findings, and conclusions.', icon: TrendingUp, color: '#10b981' },
    { title: 'Paper Management', desc: 'Maintain a structured repository of research documents.', icon: Layers, color: '#f59e0b' },
    { title: 'Quick Navigation', desc: 'Access uploaded papers and summaries instantly.', icon: Compass, color: '#06b6d4' },
    { title: 'Modern User Experience', desc: 'Clean, responsive, and professional interface.', icon: Cpu, color: '#ec4899' },
  ];

  const steps = [
    { step: 'Step 1', title: 'Upload Research Paper', desc: 'Securely upload your academic PDF document into the system repository.', icon: UploadCloud, color: '#6366f1' },
    { step: 'Step 2', title: 'System Processes Paper', desc: 'The application indexes file metadata and prepares document context.', icon: Cpu, color: '#06b6d4' },
    { step: 'Step 3', title: 'AI Generates Summary', desc: 'Advanced AI abstractive synthesis models analyze the paper contents.', icon: Sparkles, color: '#8b5cf6' },
    { step: 'Step 4', title: 'View Insights and Analysis', desc: 'Instantly view visual metrics, applications, limitations, and future scopes.', icon: TrendingUp, color: '#a855f7' },
    { step: 'Step 5', title: 'Manage Research Collection', desc: 'Track, sort, search, and navigate your complete research publications library.', icon: BookOpen, color: '#10b981' },
  ];

  const techStack = [
    { name: 'React + Vite', role: 'Frontend', icon: Atom, color: '#61dafb' },
    { name: 'PHP', role: 'Backend', icon: Server, color: '#777bb4' },
    { name: 'MySQL', role: 'Database', icon: Database, color: '#00758f' },
    { name: 'Google Gemini API', role: 'AI Services', icon: Brain, color: 'var(--accent)' },
    { name: 'Modern Responsive UI', role: 'Styling', icon: LayoutDashboard, color: 'var(--accent-purple)' },
  ];

  return (
    <div className="home-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
      
      {/* SECTION 1 — HERO */}
      <GlassCard style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '80px 40px',
        gap: '28px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow backdrop design */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          background: 'var(--glow-gradient)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          borderRadius: '50%',
          opacity: 0.65
        }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Atom size={56} style={{ color: 'var(--accent)', animation: 'spin 12s linear infinite' }} />
            <h1 className="gradient-text-accent" style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>Research Nexus AI</h1>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 500, color: 'var(--text-primary)', maxWidth: '750px', lineHeight: 1.4 }}>
            Intelligent Research Paper Management and Summarization Platform
          </h2>
        </div>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '780px', color: 'var(--text-secondary)', zIndex: 1 }}>
          Research Nexus AI helps students, researchers, and professionals efficiently manage, organize, analyze, and summarize academic research papers using advanced AI-powered insights.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}>
          <Link to="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none', padding: '12px 28px', fontSize: '1rem' }}>
            <span>Get Started</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/upload" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '12px 28px', fontSize: '1rem' }}>
            <UploadCloud size={18} />
            <span>Upload Paper</span>
          </Link>
        </div>
      </GlassCard>

      {/* SECTION 2 — PROBLEM STATEMENT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={24} style={{ color: '#ef4444' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 600 }}>The Problem</h3>
          </div>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Researchers and students often spend significant time reading lengthy research papers to understand key concepts, methodologies, findings, and conclusions. Managing multiple papers, extracting important insights, and comparing research work can become time-consuming and overwhelming.
          </p>
        </GlassCard>

        <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border-hover)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={24} style={{ color: 'var(--accent)' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 600 }}>The Solution</h3>
          </div>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Research Nexus AI simplifies this process by providing intelligent paper management, AI-powered summarization, and research insights that help users quickly understand academic content without reading entire documents manually.
          </p>
        </GlassCard>
      </div>

      {/* SECTION 3 — KEY FEATURES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Target size={24} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Key Features</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <GlassCard key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', color: feat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                  <Icon size={20} />
                </div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.08rem', fontWeight: 600 }}>{feat.title}</h4>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* SECTION 4 — HOW IT WORKS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Cpu size={24} style={{ color: 'var(--accent-purple)' }} />
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>How It Works</h3>
        </div>
        <div style={{ 
          display: 'flex', 
          overflowX: 'auto', 
          padding: '16px 4px', 
          gap: '24px', 
          scrollbarWidth: 'thin'
        }}>
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <GlassCard 
                key={i} 
                style={{ 
                  minWidth: '240px', 
                  flex: '1 0 240px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  position: 'absolute', 
                  top: '-12px', 
                  left: '20px', 
                  background: st.color, 
                  color: 'white', 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  padding: '4px 10px', 
                  borderRadius: '20px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)' 
                }}>
                  {st.step}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    background: 'rgba(255,255,255,0.03)',
                    color: st.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid var(--border-color)'
                  }}>
                    <Icon size={18} />
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.98rem', fontWeight: 600 }}>{st.title}</h4>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{st.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* SECTION 5 — TECHNOLOGY STACK */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={24} style={{ color: 'var(--accent)' }} />
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Technology Stack</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <GlassCard key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', color: tech.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600 }}>{tech.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tech.role}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* SECTION 6 — CALL TO ACTION */}
      <GlassCard style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '50px 30px',
        gap: '24px',
        border: '1px solid var(--border-hover)',
        background: 'var(--glow-gradient)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 700 }}>
          Start Exploring Research Smarter
        </h3>
        <Link to="/upload" className="btn btn-primary" style={{ textDecoration: 'none', padding: '12px 28px', fontSize: '1rem', zIndex: 1 }}>
          <UploadCloud size={18} />
          <span>Upload Your First Paper</span>
        </Link>
      </GlassCard>

      {/* FOOTER */}
      <GlassCard style={{
        padding: '40px 32px 32px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        fontSize: '0.9rem',
        borderTop: '1px solid var(--border-color)'
      }}>
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Atom size={28} style={{ color: 'var(--accent)', animation: 'spin 20s linear infinite' }} />
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Research Nexus AI</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            Platform developed by the <strong>Research Nexus Team</strong>.
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            © 2026 Research Nexus AI. All Rights Reserved.
          </span>
        </div>

        {/* Quick Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.08em' }}>Quick Links</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}>Home</Link>
            <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}>Dashboard</Link>
            <Link to="/upload" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}>Upload Paper</Link>
            <Link to="/papers" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}>Research Papers</Link>
            <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}>About</Link>
          </div>
        </div>

        {/* Contact Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.08em' }}>Contact</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <a href="mailto:researchnexus@example.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>researchnexus@example.com</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <span>+91 XXXXX XXXXX</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <span>Bangalore, India</span>
            </div>
          </div>
        </div>
      </GlassCard>

    </div>
  );
};

export default Home;
