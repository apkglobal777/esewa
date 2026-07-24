import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import signinBg from '../assets/signin.png';

export default function ClientRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const set = (k) => (e) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters.';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1800);
  };

  return (
    <div className="lp">
      <div
        className="lp__left"
        style={{ backgroundImage: `url(${signinBg})` }}
        aria-hidden="true"
      >
        <div className="lp__left-overlay" />
        <div className="lp__left-body">
          <div className="lp__tagline-block">
            <h1 className="lp__headline">
              Secure your legal future
              <span className="lp__headline-gold"> with confidence.</span>
            </h1>
            <p className="lp__sub">
              Create your account to access legal documents, consultations, and government services.
            </p>
          </div>
          <div className="lp__stats">
            <div className="lp__stat">
              <span className="lp__stat-val">10,000+</span>
              <span className="lp__stat-lbl">Users</span>
            </div>
            <div className="lp__stat-sep" />
            <div className="lp__stat">
              <span className="lp__stat-val">50,000+</span>
              <span className="lp__stat-lbl">Documents</span>
            </div>
            <div className="lp__stat-sep" />
            <div className="lp__stat">
              <span className="lp__stat-val">500+</span>
              <span className="lp__stat-lbl">Lawyers</span>
            </div>
          </div>
          <div className="lp__compliance">
            {['SOC 2', 'ISO 27001', 'GDPR'].map(b => (
              <span key={b} className="lp__badge">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="lp__right">
        <Link to="/login" className="lp__back">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to login
        </Link>

        <div className="lp__form-wrap">
          <div className="lp__head">
            <h2 className="lp__title">Create Client Account</h2>
            <p className="lp__subtitle">
              Register to access legal documents, consultations, and government services.
            </p>
          </div>

          <form className="lp__form" onSubmit={handleSubmit} noValidate>
            <div className={`lp__field${errors.name ? ' lp__field--err' : ''}`}>
              <div className="lp__field-row">
                <label className="lp__label" htmlFor="cr-name">Full Name</label>
              </div>
              <div className="lp__input-wrap">
                <span className="material-symbols-outlined lp__input-icon">person</span>
                <input
                  id="cr-name"
                  type="text"
                  className="lp__input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="lp__err-msg">{errors.name}</p>}
            </div>

            <div className={`lp__field${errors.email ? ' lp__field--err' : ''}`}>
              <div className="lp__field-row">
                <label className="lp__label" htmlFor="cr-email">Email Address</label>
              </div>
              <div className="lp__input-wrap">
                <span className="material-symbols-outlined lp__input-icon">mail</span>
                <input
                  id="cr-email"
                  type="email"
                  className="lp__input"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="lp__err-msg">{errors.email}</p>}
            </div>

            <div className={`lp__field${errors.phone ? ' lp__field--err' : ''}`}>
              <div className="lp__field-row">
                <label className="lp__label" htmlFor="cr-phone">Phone Number</label>
              </div>
              <div className="lp__input-wrap">
                <span className="material-symbols-outlined lp__input-icon">call</span>
                <input
                  id="cr-phone"
                  type="tel"
                  className="lp__input"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                />
              </div>
              {errors.phone && <p className="lp__err-msg">{errors.phone}</p>}
            </div>

            <div className={`lp__field${errors.password ? ' lp__field--err' : ''}`}>
              <div className="lp__field-row">
                <label className="lp__label" htmlFor="cr-password">Password</label>
              </div>
              <div className="lp__input-wrap">
                <span className="material-symbols-outlined lp__input-icon">lock</span>
                <input
                  id="cr-password"
                  type={showPass ? 'text' : 'password'}
                  className="lp__input"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="new-password"
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

            <div className={`lp__field${errors.confirmPassword ? ' lp__field--err' : ''}`}>
              <div className="lp__field-row">
                <label className="lp__label" htmlFor="cr-confirm">Confirm Password</label>
              </div>
              <div className="lp__input-wrap">
                <span className="material-symbols-outlined lp__input-icon">lock</span>
                <input
                  id="cr-confirm"
                  type={showConfirmPass ? 'text' : 'password'}
                  className="lp__input"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={set('confirmPassword')}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="lp__eye"
                  onClick={() => setShowConfirmPass(v => !v)}
                  aria-label={showConfirmPass ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined">
                    {showConfirmPass ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.confirmPassword && <p className="lp__err-msg">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className={`lp__submit${loading ? ' lp__submit--loading' : ''}`}
              id="cr-submit"
              disabled={loading}
            >
              {loading
                ? <><span className="lp__spinner" /> Creating Account…</>
                : <><span className="material-symbols-outlined">person_add</span> Create Account</>
              }
            </button>

            <div className="lp__divider">
              <span className="lp__div-line" />
              <span className="lp__div-txt">Or continue with</span>
              <span className="lp__div-line" />
            </div>

            <div className="lp__sso">
              <button type="button" className="lp__sso-btn" id="cr-google">
                <svg width="16" height="16" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.3 30.2 0 24 0 14.7 0 6.7 5.5 2.8 13.5l7.8 6.1C12.4 13.5 17.8 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"/>
                  <path fill="#FBBC05" d="M10.6 28.4A14.8 14.8 0 0 1 9.5 24c0-1.5.3-3 .7-4.4L2.4 13.5A23.8 23.8 0 0 0 0 24c0 3.8.9 7.4 2.5 10.5l8.1-6.1z"/>
                  <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.1-13.4-9.7l-8 6.2C6.6 42.5 14.7 48 24 48z"/>
                </svg>
                Google
              </button>
            </div>
          </form>

          <p className="lp__register">
            Already have an account?{' '}
            <Link to="/login" className="lp__reg-link" id="cr-login-link">
              Sign In
            </Link>
          </p>

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
