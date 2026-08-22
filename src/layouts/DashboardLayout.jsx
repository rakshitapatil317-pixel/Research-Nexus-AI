import React, { useState } from 'react';
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { 
  Menu, 
  X, 
  Atom, 
  LogOut, 
  Sun, 
  Moon,
  LayoutDashboard,
  UploadCloud,
  BookOpen,
  Info,
  Sliders,
  Home as HomeIcon
} from 'lucide-react';

const DashboardLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', name: 'Home', icon: HomeIcon },
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload', name: 'Upload Paper', icon: UploadCloud },
    { path: '/papers', name: 'Research Papers', icon: BookOpen },
    { path: '/about', name: 'About', icon: Info },
  ];

  return (
    <div className="app-container animate-fade-in">
      {/* Horizontal Header Navbar */}
      <nav className="header-nav">
        {/* Brand/Logo */}
        <NavLink to="/" className="header-brand" onClick={() => setMobileMenuOpen(false)}>
          <Atom className="header-logo-icon" size={26} />
          <span className="header-brand-name">Nexus AI</span>
        </NavLink>

        {/* Navigation Menu (Hidden on mobile by default) */}
        <div className={`header-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Actions (Theme Switcher, Profile, SignOut) */}
        <div className="header-actions">
          {/* Theme Switcher Button */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Badge */}
          <div className="header-user-badge">
            <div className="user-avatar" style={{ width: '28px', height: '28px', borderRadius: '8px', fontSize: '0.85rem' }}>
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <span className="header-user-name">{user?.name || 'User'}</span>
          </div>

          {/* Logout Action */}
          <button 
            className="header-logout-btn" 
            onClick={handleLogout}
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut size={18} />
          </button>

          {/* Hamburger Mobile Toggle Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Main Workspace content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
