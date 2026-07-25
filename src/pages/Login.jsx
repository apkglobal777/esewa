import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import signinBg from '../assets/signin.png';

const ROLES = {
  lawyer: {
    label:       'Lawyer',
    icon:        'gavel',
    placeholder: 'name@firm.com',
    tagline:     'Access your case dashboard, client files & AI drafting suite.',
    badge:       'Bar Verified',
    badgeIcon:   'verified_user',
  },
  client: {
    label:       'Client',
    icon:        'person',
    placeholder: 'name@email.com',
    tagline:     'Track your cases, review documents & connect with your legal team.',
    badge:       'Secure Portal',
    badgeIcon:   'lock',
  },
};

const STATS = [
  { value: '99.9%',  label: 'Uptime SLA'  },
  { value: '256-bit', label: 'Encryption' },
  { value: '40+',    label: 'Countries'   },
];

export default function Login() {
  const [role,     setRole]     = useState('lawyer');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const cfg = ROLES[role];

  const validate = () => {
    const e = {};
    if (!email)                           e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = 'Enter a valid email.';
    if (!password)                        e.password = 'Password is required.';
    else if (password.length < 6)         e.password = 'Minimum 6 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div className="lp">

      {/* ════ LEFT — full-cover background image ════ */}
      <div
        className="lp__left"
        style={{ backgroundImage: `url(${signinBg})` }}
        aria-hidden="true"
      >
        {/* Dark gradient overlay so text stays readable */}
        <div className="lp__left-overlay" />

        <div className="lp__left-body">
          {/* Tagline block */}
          <div className="lp__tagline-block">
            <h1 className="lp__headline">
              Securing your legal future
              <span className="lp__headline-gold"> with precision.</span>
            </h1>
            <p className="lp__sub">
              The world's most advanced AI-powered legal platform.
              Designed for excellence, built for trust.
            </p>
          </div>

          {/* Stats row */}
          <div className="lp__stats">
            {STATS.reduce((acc, { value, label }, i) => {
              acc.push(
                <div key={label} className="lp__stat">
                  <span className="lp__stat-val">{value}</span>
                  <span className="lp__stat-lbl">{label}</span>
                </div>
              );
              if (i < STATS.length - 1) acc.push(<div key={`sep-${i}`} className="lp__stat-sep" />);
              return acc;
            }, [])}
          </div>

          {/* Compliance row */}
          <div className="lp__compliance">
            {['SOC 2', 'ISO 27001', 'GDPR', 'eIDAS'].map(b => (
              <span key={b} className="lp__badge">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ════ RIGHT — login form ════ */}
      <div className="lp__right">
        {/* Back link */}
        <Link to="/" className="lp__back">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to home
        </Link>

        <div className="lp__form-wrap">

          {/* Header */}
          <div className="lp__head">
            <h2 className="lp__title">Lawyer &amp; Client Login</h2>
            <p className="lp__subtitle">
              Access your professional dashboard to manage cases &amp; legal documents.
            </p>
          </div>

          {/* Role toggle */}
          <div className="lp__toggle" role="tablist">
            {Object.entries(ROLES).map(([key, r]) => (
              <button
                key={key}
                role="tab"
                aria-selected={role === key}
                className={`lp__tab${role === key ? ' lp__tab--on' : ''}`}
                onClick={() => { setRole(key); setErrors({}); }}
                id={`tab-${key}`}
              >
                <span className="material-symbols-outlined lp__tab-icon">{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>

          {/* Context strip */}
          <p className="lp__ctx">
            <span className="material-symbols-outlined" style={{ fontSize: '13px', color: 'var(--color-gold-dark)', verticalAlign: 'middle' }}>
              {cfg.badgeIcon}
            </span>
            {' '}<strong style={{ color: 'var(--color-primary)' }}>{cfg.badge}:</strong>
            {' '}{cfg.tagline}
          </p>

          {/* Form */}
          <form className="lp__form" onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className={`lp__field${errors.email ? ' lp__field--err' : ''}`}>
              <div className="lp__field-row">
                <label className="lp__label" htmlFor="lp-email">Email Address</label>
              </div>
              <div className="lp__input-wrap">
                <span className="material-symbols-outlined lp__input-icon">mail</span>
                <input
                  id="lp-email"
                  type="email"
                  className="lp__input"
                  placeholder={cfg.placeholder}
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="lp__err-msg">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={`lp__field${errors.password ? ' lp__field--err' : ''}`}>
              <div className="lp__field-row">
                <label className="lp__label" htmlFor="lp-password">Password</label>
                <a href="#" className="lp__forgot">Forgot password?</a>
              </div>
              <div className="lp__input-wrap">
                <span className="material-symbols-outlined lp__input-icon">lock</span>
                <input
                  id="lp-password"
                  type={showPass ? 'text' : 'password'}
                  className="lp__input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lp__eye"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined">
                    {showPass ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && <p className="lp__err-msg">{errors.password}</p>}
            </div>

            {/* Remember + Submit */}
            <label className="lp__remember">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} id="lp-remember" />
              <span className="lp__chk">
                {remember && <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>check</span>}
              </span>
              Keep me logged in for 30 days
            </label>

            <button
              type="submit"
              className={`lp__submit${loading ? ' lp__submit--loading' : ''}`}
              id="lp-submit"
              disabled={loading}
            >
              {loading
                ? <><span className="lp__spinner" /> Signing in…</>
                : <><span className="material-symbols-outlined">login</span> Sign In to {cfg.label} Portal</>
              }
            </button>

            {/* SSO divider */}
            <div className="lp__divider">
              <span className="lp__div-line" />
              <span className="lp__div-txt">Or continue with</span>
              <span className="lp__div-line" />
            </div>

            {/* SSO */}
            <div className="lp__sso">
              <button type="button" className="lp__sso-btn" id="sso-google">
                <svg width="16" height="16" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.3 30.2 0 24 0 14.7 0 6.7 5.5 2.8 13.5l7.8 6.1C12.4 13.5 17.8 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"/>
                  <path fill="#FBBC05" d="M10.6 28.4A14.8 14.8 0 0 1 9.5 24c0-1.5.3-3 .7-4.4L2.4 13.5A23.8 23.8 0 0 0 0 24c0 3.8.9 7.4 2.5 10.5l8.1-6.1z"/>
                  <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.1-13.4-9.7l-8 6.2C6.6 42.5 14.7 48 24 48z"/>
                </svg>
                Google
              </button>
              <button type="button" className="lp__sso-btn" id="sso-microsoft">
                <svg width="16" height="16" viewBox="0 0 21 21">
                  <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
                  <rect x="11" y="1"  width="9" height="9" fill="#7FBA00"/>
                  <rect x="1"  y="11" width="9" height="9" fill="#00A4EF"/>
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>
                Microsoft
              </button>
            </div>
          </form>

          {/* Register */}
          <p className="lp__register">
            Don't have an account?{' '}
            <Link
              to={role === 'lawyer' ? '/lawyer/onboarding' : '/client/register'}
              className="lp__reg-link"
              id="lp-register-link"
            >
              {role === 'lawyer' ? 'Register as Lawyer' : 'Create an Account'}
            </Link>
          </p>

          {/* Footer links */}
          <div className="lp__footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Support</a>
          </div>

        </div>
      </div>
    </div>
  );
}
