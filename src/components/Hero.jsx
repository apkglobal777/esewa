import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const heroMockup = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU9tSq5Q9sIv3DK4CD18x1oNixFygvR8N2p54KwMWswcjyWQcNgnLsBZEQrJvQPFG5pERsx1A9U40ej2Px1FrHjpvjwhIeYScI3MiPItFhX082qqpnOBq6jQWoE57DuCRA7fRihLiCKyApUUxnoNf09KlAla6oTrOp2TAUB4vV_PHLKgbWWqzF7kk0_oYXdqXHGPPLWR4Ob5LPaKmmV9bWdNvYlIHiMAO0iGfrsOWlnfFxnlIJdTrwol6_TOFnBua768t0QlVai0M';

export default function Hero() {
  const heroRef = useRef(null);

  /* Parallax subtle scroll */
  useEffect(() => {
    const el = heroRef.current;
    const onScroll = () => {
      if (!el) return;
      const y = window.scrollY * 0.15;
      el.style.setProperty('--parallax-y', `${y}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-heading">
      {/* Decorative background blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />

      <div className="container hero__inner">
        {/* Left: Copy */}
        <div className="hero__copy">
          <div className="chip chip-gold hero__badge">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>auto_awesome</span>
            Enterprise Grade Intelligence
          </div>

          <h1 id="hero-heading" className="text-display-lg hero__headline">
            Enterprise-Grade Legal Services,{' '}
            <span className="hero__headline-accent">Powered by AI.</span>
          </h1>

          <p className="text-body-lg hero__sub">
            Streamline your legal workflows with automated document generation,
            instantaneous e-stamping, and AI-assisted counsel designed for
            high-growth enterprises.
          </p>

          <div className="hero__actions">
            <Link to="/login" className="btn btn-gold btn-lg" id="hero-cta-primary">
              Get Started Free
            </Link>
            <a href="#how-it-works" className="btn btn-outline btn-lg" id="hero-cta-demo">
              <span className="material-symbols-outlined">play_circle</span>
              View Platform Demo
            </a>
          </div>

          {/* Trust indicators */}
          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-stat">5,000+</span>
              <span className="hero__trust-label text-label-sm">Legal Firms</span>
            </div>
            <div className="hero__trust-divider" />
            <div className="hero__trust-item">
              <span className="hero__trust-stat">40+</span>
              <span className="hero__trust-label text-label-sm">Countries</span>
            </div>
            <div className="hero__trust-divider" />
            <div className="hero__trust-item">
              <span className="hero__trust-stat">99.9%</span>
              <span className="hero__trust-label text-label-sm">Uptime SLA</span>
            </div>
          </div>
        </div>

        {/* Right: Dashboard Mockup */}
        <div className="hero__visual">
          <div className="hero__mockup-wrap">
            {/* Glow */}
            <div className="hero__glow" aria-hidden="true" />
            {/* Frame */}
            <div className="hero__mockup-frame">
              {/* Browser chrome */}
              <div className="hero__mockup-chrome">
                <span /><span /><span />
                <div className="hero__mockup-url">esewa.in/dashboard</div>
              </div>
              <img
                src={heroMockup}
                alt="eSewa Legal Services dashboard showing case files, AI analysis panels, and digital document previews"
                className="hero__mockup-img"
                onError={(e) => {
                  e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU9tSq5Q9sIv3DK4CD18x1oNixFygvR8N2p54KwMWswcjyWQcNgnLsBZEQrJvQPFG5pERsx1A9U40ej2Px1FrHjpvjwhIeYScI3MiPItFhX082qqpnOBq6jQWoE57DuCRA7fRihLiCKyApUUxnoNf09KlAla6oTrOp2TAUB4vV_PHLKgbWWqzF7kk0_oYXdqXHGPPLWR4Ob5LPaKmmV9bWdNvYlIHiMAO0iGfrsOWlnfFxnlIJdTrwol6_TOFnBua768t0QlVai0M';
                }}
              />
            </div>

            {/* Floating badge card */}
            <div className="hero__float-card hero__float-card--left">
              <span className="material-symbols-outlined" style={{ color: 'var(--color-success)', fontSize: '18px' }}>verified</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Document Signed</div>
                <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>NDA — Acme Corp</div>
              </div>
            </div>
            <div className="hero__float-card hero__float-card--right">
              <span className="material-symbols-outlined" style={{ color: 'var(--color-gold)', fontSize: '18px' }}>psychology</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)' }}>AI Analysis Complete</div>
                <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>12 clauses reviewed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
