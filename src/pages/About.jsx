import React from 'react';
import GlassCard from '../components/GlassCard';
import { 
  Atom, 
  HelpCircle, 
  Target, 
  Cpu, 
  Layers, 
  Upload, 
  Database, 
  Sparkles, 
  TrendingUp, 
  FileSearch,
  BookOpen
} from 'lucide-react';

const About = () => {
  const objectives = [
    { title: 'Semantic Storage', desc: 'Securely archive academic papers and metadata in a structured, accessible database.', icon: Database },
    { title: 'Abstractive Summarization', desc: 'Instantly condense extensive research PDF documents into rich 8-12 line summaries.', icon: Sparkles },
    { title: 'AI Insights Generation', desc: 'Evaluate complexity, impact, contributions, domain scope, and future research targets.', icon: Cpu },
    { title: 'Responsive Experience', desc: 'Browse, explore, and search publications dynamically across desktop and mobile layout frames.', icon: Layers }
  ];

  const steps = [
    { step: 'Step 1', title: 'Upload Research Paper', desc: 'Drag and drop your academic PDF report. File extensions are verified and titles auto-scaffolded.', icon: Upload, color: '#6366f1' },
    { step: 'Step 2', title: 'Store Metadata & Files', desc: 'The application securely writes the PDF to the uploads repository and records document metadata in the MySQL index.', icon: Database, color: '#06b6d4' },
    { step: 'Step 3', title: 'Generate AI Summary', desc: 'Our abstractive engine constructs an structured summary outlining methodology, results, and future scopes.', icon: Sparkles, color: '#8b5cf6' },
    { step: 'Step 4', title: 'Extract Core Contributions', desc: 'Evaluate domain classifications, complexity thresholds, and identify suggested applications.', icon: FileSearch, color: '#a855f7' },
    { step: 'Step 5', title: 'Present Visual Dashboard', desc: 'Display progress graphs, impact scores, recommended research, and keywords in glass widgets.', icon: TrendingUp, color: '#10b981' }
  ];

  const techStack = [
    { name: 'React & Vite', role: 'Frontend Framework', desc: 'Enables high-performance client state and rapid development builds.', icon: Atom },
    { name: 'Axios Client', role: 'Data Transfer layer', desc: 'Performs asynchronous HTTP transactions and form-data uploads.', icon: Layers },
    { name: 'PHP Backend', role: 'Web Server Services', desc: 'Read-only API scripts providing user authorization, database indexing, and summary services.', icon: Cpu },
    { name: 'MySQL DB', role: 'Relational Database', desc: 'Organizes user profiles and research metadata indexes.', icon: Database }
  ];

  return (
    <div className="about-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Intro section */}
      <div>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>About Research Nexus AI</h1>
        <p>An enterprise-grade, investor-demo quality workspace to index, read, and analyze academic publications using AI.</p>
      </div>

      {/* Grid: Overview & Problem statement */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={20} style={{ color: 'var(--accent)' }} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Project Overview</h3>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Research Nexus AI represents a modern approach to managing academic literature. Built for developers, researchers, and students alike, it automates the synthesis of dense scientific publications into clear, actionable summaries and metrics.
          </p>
        </GlassCard>

        <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={20} style={{ color: '#ef4444' }} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Problem Statement</h3>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            The exponential growth of scientific literature makes it extremely difficult to track developments. Researchers waste countless hours reading lengthy, low-relevance papers to extract methodologies or scores. Nexus AI bridges this gap with instant, structured summarization and impact evaluation.
          </p>
        </GlassCard>
      </div>

      {/* Objectives */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Target size={22} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Core Project Objectives</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <GlassCard key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} />
                </div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>{obj.title}</h4>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{obj.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Timeline: How It Works */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Cpu size={22} style={{ color: 'var(--accent-purple)' }} />
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>How It Works</h3>
        </div>
        
        {/* Horizontal Timeline Row */}
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
                    background: `rgba(${st.color === '#6366f1' ? '99,102,241' : st.color === '#06b6d4' ? '6,182,212' : '139,92,246'}, 0.1)`, 
                    color: st.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Icon size={18} />
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.98rem' }}>{st.title}</h4>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{st.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={22} style={{ color: '#10b981' }} />
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>System Architecture & Stack</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <GlassCard key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} style={{ color: 'var(--accent)' }} />
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>{tech.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>{tech.role}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{tech.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
