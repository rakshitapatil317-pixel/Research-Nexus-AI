import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { Atom, LogIn, UserPlus, ShieldAlert } from 'lucide-react';

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill out all required fields');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          setSuccess('Login Successful! Redirecting...');
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          setError(result.message || 'Invalid credentials');
        }
      } else {
        const result = await register(name, email, password);
        if (result.success) {
          setSuccess('Registration Successful! You can login now.');
          setIsLogin(true);
          setName('');
          setPassword('');
        } else {
          setError(result.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('Network communication error, please verify backend server is running');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="auth-card animate-slide-up">
      <div className="auth-header">
        <div className="auth-logo">
          <Atom className="sidebar-logo-icon" size={32} />
          <span className="gradient-text-accent">Research Nexus</span>
        </div>
        <p className="auth-subtitle">
          {isLogin ? 'Access your AI-powered research workspace' : 'Create your secure developer account'}
        </p>
      </div>

      {error && (
        <div className="auth-feedback auth-feedback-error animate-fade-in" style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem', marginBottom: '20px'
        }}>
          <ShieldAlert size={16} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="auth-feedback auth-feedback-success animate-fade-in" style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '8px', color: '#4ade80', fontSize: '0.85rem', marginBottom: '20px'
        }}>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="developer@nexus.ai"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          className="auth-btn"
          style={{ width: '100%', marginTop: '8px' }}
        >
          {isLogin ? (
            <>
              <LogIn size={18} />
              <span>Sign In</span>
            </>
          ) : (
            <>
              <UserPlus size={18} />
              <span>Create Account</span>
            </>
          )}
        </Button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <span>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </span>{' '}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setSuccess('');
          }}
          style={{
            background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600,
            textDecoration: 'underline', fontFamily: 'inherit'
          }}
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </GlassCard>
  );
};

export default Login;
