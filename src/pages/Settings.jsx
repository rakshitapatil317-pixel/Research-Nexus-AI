import React from 'react';
import { useTheme } from '../hooks/useTheme';
import GlassCard from '../components/GlassCard';
import { Sun, Moon, Sparkles, Sliders } from 'lucide-react';

const Settings = () => {
  const { theme, setThemeExplicitly } = useTheme();

  return (
    <div className="settings-page animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Workspace Settings</h1>
        <p>Manage and customize your AI-powered research workspace theme preferences.</p>
      </div>

      <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <Sliders size={20} style={{ color: 'var(--accent)' }} />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Appearance Preferences</h3>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px', fontSize: '1.05rem' }}>Visual Theme</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Toggle between a futuristic dark theme and a clean light theme.</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', background: 'rgba(0,0,0,0.15)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setThemeExplicitly('light')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px',
                border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                background: theme === 'light' ? 'var(--primary-gradient)' : 'transparent',
                color: theme === 'light' ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.25s ease'
              }}
            >
              <Sun size={18} />
              <span>Light</span>
            </button>
            <button
              onClick={() => setThemeExplicitly('dark')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px',
                border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                background: theme === 'dark' ? 'var(--primary-gradient)' : 'transparent',
                color: theme === 'dark' ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.25s ease'
              }}
            >
              <Moon size={18} />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--glow-gradient)' }}>
        <Sparkles size={28} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <div>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px', fontSize: '1rem' }}>Smart Sync Active</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Theme preferences are cached locally on this machine and automatically synchronized across browser sessions.</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Settings;
