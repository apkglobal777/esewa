import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoSrc from '../assets/logo.jpg';

const NAV_LINKS = [
  { label: 'Documents',     href: '#services' },
  { label: 'Stamping',      href: '#services' },
  { label: 'Consultations', href: '#services' },
  { label: 'Billing',       href: '#' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">
        {/* Logo */}
        <a className="navbar__logo" href="#" aria-label="eSewa Legal Services home">
          <img
            src={logoSrc}
            alt="eSewa Legal Services"
            className="navbar__logo-img"
          />
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="navbar__link nav-link text-body-md">{label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="navbar__actions">
          <Link to="/login" className="btn btn-outline btn-sm" id="nav-signin-btn">Sign In</Link>
          <Link to="/login" className="btn btn-gold btn-sm"    id="nav-cta-btn">Get Started</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar__hamburger"
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
          id="mobile-menu-btn"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <ul role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="navbar__mobile-link text-body-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-actions">
            <Link to="/login" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Sign In</Link>
            <Link to="/login" className="btn btn-gold"    style={{ width: '100%', justifyContent: 'center' }}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
